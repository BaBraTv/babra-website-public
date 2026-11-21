"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { galleryDisplayDate, galleryDivisions, type GalleryEntry, type GalleryCommentEntry } from "../../lib/gallery";
import styles from "./gallery.module.css";

function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<GalleryCommentEntry[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/gallery/${postId}/comments`, { signal: controller.signal }).then(r => r.json()).then(d => { if (!d.ok) throw Error(); setComments(d.comments); }).catch(e => { if (e.name !== "AbortError") setLoadError(true); });
    return () => controller.abort();
  }, [postId]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const form = event.currentTarget, values = new FormData(form);
    try {
      const response = await fetch(`/api/gallery/${postId}/comments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ author: values.get("author"), body: values.get("body"), consent: values.get("consent") === "on", website: values.get("website") }) });
      const data = await response.json(); if (!response.ok) throw Error(data.error);
      form.reset(); setMessage(data.message);
    } catch (e) { setMessage(e instanceof Error ? e.message : "Ntibyakunze. Ongera ugerageze."); } finally { setBusy(false); }
  }
  return <div className={styles.comments}>
    <h3>Ibitekerezo byanyu</h3>
    {loadError ? <p role="alert">Ibitekerezo ntibiraboneka. Ongera ufungure uru rupapuro.</p> : !comments.length ? <p>Nta bitekerezo byemejwe birashyirwaho. Ba uwa mbere!</p> : comments.map(c => <div className={styles.comment} key={c.id}><strong>{c.author}</strong><time dateTime={c.createdAt}>{galleryDisplayDate(c.createdAt)}</time><p>{c.body}</p></div>)}
    <form onSubmit={submit} className={styles.form}>
      <label>Izina rigaragara ku gitekerezo<input name="author" required minLength={2} maxLength={60} autoComplete="nickname" /></label>
      <label>Igitekerezo cyawe<textarea name="body" required minLength={3} maxLength={1200} rows={3} /></label>
      <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className={styles.check}><input type="checkbox" name="consent" required />Nemeye ko izina n’igitekerezo byanjye bigaragara kuri website.</label>
      <p className={styles.note}>Ibitekerezo bibanza gusuzumwa na BaBra mbere yo kugaragara.</p>
      <button className={styles.primary} disabled={busy}>{busy ? "Birimo koherezwa…" : "Ohereza igitekerezo ↗"}</button>
      <p role="status">{message}</p>
    </form>
  </div>;
}

function ActivityCard({ post }: { post: GalleryEntry }) {
  const [index, setIndex] = useState(0), [showComments, setShowComments] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = post.images[index];
  const src = photo && (photo.src || `/api/gallery/media/${photo.id}`);
  return <article className={styles.card} id={`activity-${post.id}`}>
    <div className={styles.photo}>
      {photo && <button type="button" className={styles.photoButton} onClick={() => dialog.current?.showModal()} aria-label={`Fungura ifoto: ${photo.alt}`}><img src={src} alt={photo.alt} loading="lazy" /></button>}
      <span className={styles.dateBadge}><time dateTime={post.activityDate}>{galleryDisplayDate(post.activityDate)}</time></span>
      {post.images.length > 1 && <div className={styles.photoControls}><button type="button" onClick={() => setIndex((index + post.images.length - 1) % post.images.length)} aria-label="Ifoto ibanza">←</button><span>{index + 1} / {post.images.length}</span><button type="button" onClick={() => setIndex((index + 1) % post.images.length)} aria-label="Ifoto ikurikira">→</button></div>}
    </div>
    <div className={styles.cardBody}><p className={styles.eyebrow}>{post.division}</p><h2>{post.title}</h2><p className={styles.description}>{post.description}</p>
      <button className={styles.commentToggle} type="button" onClick={() => setShowComments(!showComments)} aria-expanded={showComments}>{showComments ? "Funga ibitekerezo ↑" : `Ibitekerezo (${post._count.comments}) · Tanga igitekerezo ↗`}</button>
      {showComments && <Comments postId={post.id} />}
    </div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={post.title}><button className={styles.close} onClick={() => dialog.current?.close()} autoFocus aria-label="Funga ifoto">Funga ×</button>{photo && <img src={src} alt={photo.alt} />}<p>{post.title} · {galleryDisplayDate(post.activityDate)}</p></dialog>
  </article>;
}


async function prepareGuestPhoto(file: File) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 15000000) throw Error("Choose a JPG, PNG or WebP photo below 15 MB.");
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  try {
    const ratio = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
    canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw Error("Could not process the photo.");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    let encoded = canvas.toDataURL("image/jpeg", .78);
    if (encoded.length > 790000) encoded = canvas.toDataURL("image/jpeg", .5);
    if (encoded.length > 790000) throw Error("Photo is too large; choose another.");
    return { data: encoded.split(",")[1], type: "image/jpeg" as const, alt: "Customer-submitted BaBra moment" };
  } finally { bitmap.close(); }
}

function GuestPhotoSubmission() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true); setError(""); setMessage("");
    try {
      const file = data.get("photo");
      if (!(file instanceof File) || !file.size) throw Error("Please choose a photo.");
      const photo = await prepareGuestPhoto(file);
      const response = await fetch("/api/gallery/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.get("title"), description: data.get("description"), photo, consent: data.get("consent") === "on", website: data.get("website") })
      });
      const body = await response.json();
      if (!response.ok || !body.ok) throw Error(body.error || "Submission failed. Try again.");
      form.reset();
      setMessage(body.message);
    } catch (e) { setError(e instanceof Error ? e.message : "Submission failed. Try again."); }
    finally { setBusy(false); }
  }
  return <section className={styles.panel} aria-label="Share your BaBra moment">
    <p className={styles.eyebrow}>Community Gallery</p>
    <h2>Share your BaBra moment.</h2>
    <p>Have a BaBra photo to share? Send it here. Our team reviews every photo before it appears publicly.</p>
    <form className={styles.form} onSubmit={submit}>
      <label>Photo title<input name="title" minLength={3} maxLength={140} required placeholder="My BaBra moment" /></label>
      <label>Your story<textarea name="description" minLength={5} maxLength={1500} rows={3} required placeholder="Tell us about the photo" /></label>
      <label>Choose your photo (JPG, PNG or WebP)<input type="file" name="photo" accept="image/jpeg,image/png,image/webp" required /></label>
      <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className={styles.check}><input type="checkbox" name="consent" required />I own this photo or have permission to share it, and agree to BaBra reviewing it for publication.</label>
      <p className={styles.note}>Photos are not published automatically. Do not submit private information or images of children without their parent or guardian's consent.</p>
      <button className={styles.primary} disabled={busy}>{busy ? "Submitting…" : "Send Photo for Review ↗"}</button>
      {message && <p role="status" className={styles.success}>{message}</p>}
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </form>
  </section>;
}

export function GalleryClient() {
  const [posts, setPosts] = useState<GalleryEntry[]>([]), [division, setDivision] = useState(""), [date, setDate] = useState("");
  const [page, setPage] = useState(0), [hasMore, setHasMore] = useState(false), [busy, setBusy] = useState(true), [error, setError] = useState(false), [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setBusy(true); setError(false);
    if (page === 0) setPosts([]);
    const query = new URLSearchParams({ page: String(page), division, date });
    fetch(`/api/gallery?${query}`, { signal: controller.signal }).then(r => r.json()).then(data => {
      if (!data.ok) throw Error();
      setPosts(previous => page === 0 ? data.posts : [...previous, ...data.posts]); setHasMore(data.hasMore);
    }).catch(e => { if (e.name !== "AbortError") setError(true); }).finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [page, division, date, retry]);
  return <main className={styles.page}>
    <nav className={styles.nav} aria-label="Gallery navigation"><a href="/" className={styles.brand}>BaBra<span>Luxury in Every Touch.</span></a><div><a href="/cosmetics">Cosmetics</a><a href="/store">Store</a><a href="/community">Community</a><a href="/contact">Contact</a></div></nav>
    <header className={styles.hero}><div><p className={styles.eyebrow}>EI BaBra Holding · Ibikorwa byacu</p><h1>BaBra,<br /><em>umunsi ku wundi.</em></h1><p>Amashusho, ibikorwa n’ibihe dusangira. Reba ibyo dukora, igihe byabereye, utubwire n’igitekerezo cyawe.</p></div><span className={styles.heroMark} aria-hidden="true">B.</span></header>
    <section className={styles.content} aria-label="Ibikorwa bya BaBra">
      <div className={styles.filters}><div><p className={styles.eyebrow}>Gallery</p><h2>Ibihe bya BaBra.</h2></div><label>Igice cya BaBra<select value={division} onChange={e => { setDivision(e.target.value); setPage(0); }}><option value="">Ibikorwa byose</option>{galleryDivisions.map(d => <option key={d}>{d}</option>)}</select></label><label>Itariki<input type="date" value={date} onChange={e => { setDate(e.target.value); setPage(0); }} /></label>{(division || date) && <button className={styles.reset} onClick={() => { setDivision(""); setDate(""); setPage(0); }}>Siba amahitamo ×</button>}</div>
      {error && <div className={styles.empty} role="alert"><p>Amashusho ntarafunguka. Ongera ugerageze.</p><button className={styles.primary} onClick={() => setRetry(retry + 1)}>Ongera ugerageze</button></div>}
      <div className={styles.grid}>{posts.map(post => <ActivityCard key={post.id} post={post} />)}</div>
      {busy && <p className={styles.loading} role="status">Turimo gufungura ibikorwa…</p>}
      {!busy && !error && !posts.length && <div className={styles.empty}><h2>Nta bikorwa birashyirwaho kuri aya mahitamo.</h2><p>Garuka urebe amashusho n’amakuru mashya ya BaBra.</p></div>}
      {hasMore && !busy && !error && <div className={styles.more}><button className={styles.primary} onClick={() => setPage(page + 1)}>Reba ibindi bikorwa ↓</button></div>}
      <GuestPhotoSubmission />
    </section><footer className={styles.footer}><a href="/">← BaBra Home</a><span>EI BaBra Holding Ltd · Kigali, Rwanda</span><a href="/contact">Twandikire ↗</a></footer>
  </main>;
}
