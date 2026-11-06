"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { galleryDisplayDate, galleryDivisions, type GalleryEntry, type GalleryCommentEntry } from "../../../lib/gallery";
import styles from "../../gallery/gallery.module.css";

type Photo = { data: string; type: "image/jpeg"; alt: string };
type Review = GalleryCommentEntry & { post: { title: string } };
async function preparePhoto(file: File): Promise<Photo> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 15000000) throw Error("Hitamo ifoto ya JPG, PNG cyangwa WebP iri munsi ya 15 MB.");
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  try {
    const ratio = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas"); canvas.width = Math.round(bitmap.width * ratio); canvas.height = Math.round(bitmap.height * ratio);
    const context = canvas.getContext("2d"); if (!context) throw Error("Ifoto ntiyafungutse.");
    context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    let encoded = canvas.toDataURL("image/jpeg", .82);
    if (encoded.length > 790000) encoded = canvas.toDataURL("image/jpeg", .6);
    if (encoded.length > 790000) throw Error("Iyi foto iraremereye. Hitamo indi nto.");
    return { data: encoded.split(",")[1], type: "image/jpeg", alt: file.name.replace(/\.[^.]+$/, "").slice(0, 160) };
  } finally { bitmap.close(); }
}
const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Kigali", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
export function GalleryAdmin() {
  const [posts, setPosts] = useState<GalleryEntry[]>([]), [comments, setComments] = useState<Review[]>([]);
  const [editing, setEditing] = useState<GalleryEntry | null>(null), [photos, setPhotos] = useState<Photo[]>([]);
  const [busy, setBusy] = useState(false), [preparing, setPreparing] = useState(false), [loading, setLoading] = useState(true), [message, setMessage] = useState(""), [error, setError] = useState(""), [formKey, setFormKey] = useState(0);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/gallery", { cache: "no-store" }); const d = await r.json();
      if (!r.ok || !d.ok) throw Error(d.error || "Gallery ntiyafungutse.");
      setPosts(d.posts); setComments(d.comments);
    } catch (e) { setError(e instanceof Error ? e.message : "Gallery ntiyafungutse."); } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  function startEdit(post: GalleryEntry | null) { setEditing(post); setPhotos([]); setFormKey(v => v + 1); setError(""); }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    const form = event.currentTarget, data = new FormData(form);
    try {
      if (!editing && !photos.length) throw Error("Banza uhitemo nibura ifoto imwe.");
      const payload = { ...(editing ? { id: editing.id } : { photos: photos.map(p => ({ ...p, alt: String(data.get("title")) })) }), title: data.get("title"), description: data.get("description"), division: data.get("division"), activityDate: data.get("activityDate"), status: data.get("status") };
      const r = await fetch("/api/admin/gallery", { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const d = await r.json(); if (!r.ok) throw Error(d.error || "Ntibyabitswe.");
      setMessage(data.get("status") === "PUBLISHED" ? "Igikorwa cyabitswe kandi kiragaragara kuri Gallery." : "Igikorwa cyabitswe gihishe.");
      startEdit(null); await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Ntibyabitswe."); } finally { setBusy(false); }
  }
  async function moderate(commentId: string, status: "APPROVED" | "REJECTED") {
    setBusy(true); setError("");
    try {
      const r = await fetch("/api/admin/gallery", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ commentId, status }) });
      const d = await r.json(); if (!r.ok) throw Error(d.error); await load();
      setMessage(status === "APPROVED" ? "Igitekerezo cyemejwe." : "Igitekerezo nticyemejwe.");
    } catch (e) { setError(e instanceof Error ? e.message : "Ntibyakunze."); } finally { setBusy(false); }
  }
  return <main className={styles.page}><nav className={styles.nav}><a href="/admin" className={styles.brand}>BaBra<span>Admin · Gallery</span></a><div><a href="/gallery">Reba Gallery ↗</a><a href="/admin">Dashboard</a></div></nav>
    <div className={styles.admin}><p className={styles.eyebrow}>Umunsi ku wundi</p><h1>Ibikorwa bya BaBra.</h1><p>Shyiraho amafoto, itariki n’amakuru y’igikorwa. Emeza ibitekerezo by’abashyitsi.</p>
      {message && <p className={styles.success} role="status">{message}</p>}{error && <p className={styles.error} role="alert">{error} <button onClick={() => { setError(""); void load(); }}>Ongera ugerageze</button></p>}
      <div className={styles.adminGrid}>
        <section className={styles.panel} aria-label="Igikorwa gishya"><h2>{editing ? "Hindura igikorwa" : "Shyiraho igikorwa gishya"}</h2>
          <form className={styles.form} onSubmit={save} key={formKey}>
            <label>Umutwe<input name="title" defaultValue={editing?.title || ""} required minLength={3} maxLength={140} /></label>
            <label>Itariki igikorwa cyabereye<input type="date" name="activityDate" defaultValue={editing?.activityDate.slice(0, 10) || today()} required /></label>
            <label>Igice cya BaBra<select name="division" defaultValue={editing?.division || galleryDivisions[0]}>{galleryDivisions.map(d => <option key={d}>{d}</option>)}</select></label>
            <label>Ibisobanuro<textarea name="description" defaultValue={editing?.description || ""} required minLength={5} maxLength={4000} rows={5} /></label>
            {!editing && <><label>Amafoto (1–4)<input type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={preparing || busy} onChange={async e => {
              const files = Array.from(e.target.files || []); setPhotos([]); setError("");
              if (files.length > 4) { setError("Hitamo amafoto atarenze ane."); e.target.value = ""; return; }
              setPreparing(true);
              try { const prepared: Photo[] = []; for (const f of files) prepared.push(await preparePhoto(f)); setPhotos(prepared); }
              catch (err) { setError(err instanceof Error ? err.message : "Ifoto ntiyafungutse."); }
              finally { setPreparing(false); }
            }} /></label><div className={styles.thumbs}>{photos.map((p, i) => <img key={i} src={`data:${p.type};base64,${p.data}`} alt={`Ifoto ${i + 1}`} />)}</div><p className={styles.note}>Amafoto aratunganywa ku bunini bukwiye telefone. Hitamo amafoto mufitiye uburenganzira bwo gutangaza.</p></>}
            <label>Uko bigaragara<select name="status" defaultValue={editing?.status || "PUBLISHED"}><option value="PUBLISHED">Bigaragare kuri Gallery</option><option value="HIDDEN">Bika bihishe</option></select></label>
            <button className={styles.primary} disabled={busy || preparing}>{preparing ? "Amafoto arimo gutunganywa…" : busy ? "Birimo kubikwa…" : editing ? "Bika impinduka" : "Bika igikorwa ↗"}</button>
            {editing && <button type="button" onClick={() => startEdit(null)}>Reka guhindura · kora igikorwa gishya</button>}
          </form>
        </section>
        <section className={styles.panel}><h2>Ibitekerezo bitegereje ({comments.length})</h2>{!comments.length && <p className={styles.muted}>{loading ? "Birimo gufungurwa…" : "Nta bitekerezo bitegereje kwemezwa."}</p>}{comments.map(c => <div className={styles.comment} key={c.id}><strong>{c.author}</strong><p className={styles.muted}>{c.post.title} · {galleryDisplayDate(c.createdAt)}</p><p>{c.body}</p><div className={styles.adminActions}><button disabled={busy} onClick={() => moderate(c.id, "APPROVED")}>Emeza ✓</button><button disabled={busy} onClick={() => moderate(c.id, "REJECTED")}>Ntucyemeze ×</button></div></div>)}</section>
      </div>
      <section aria-label="Ibikorwa byabitswe"><h2 className={styles.eyebrow}>Ibikorwa byabitswe ({posts.length})</h2>{posts.map(p => <article className={styles.panel} key={p.id}><div className={styles.thumbs}>{p.images.map(photo => <img key={photo.id} src={photo.src || `/api/gallery/media/${photo.id}`} alt={photo.alt} />)}</div><h3>{p.title}</h3><p className={styles.muted}>{galleryDisplayDate(p.activityDate)} · {p.division} · {p.status === "PUBLISHED" ? "Biragaragara" : "Birahishe"}</p><p>{p.description}</p><div className={styles.adminActions}><button onClick={() => { startEdit(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Hindura / Hisha</button><a href={`/gallery#activity-${p.id}`}>Reba kuri Gallery ↗</a></div></article>)}</section>
    </div></main>;
}
