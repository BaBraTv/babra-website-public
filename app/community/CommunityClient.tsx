"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import styles from "./community.module.css";

type Member = { id: string; displayName: string };
type Comment = { id: string; author: Member; body: string };
type Post = { id: string; author: Member; body: string; alt: string | null; comments: Comment[] };
type Thread = { id: string; person: Member; status: "PENDING" | "ACCEPTED"; incoming: boolean; unread: boolean };
type Message = { id: string; senderId: string; body: string; createdAt: string };

async function community<T>(query = "", data?: object): Promise<T> {
  const response = await fetch(`/api/community${query}`, data ? {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
  } : { cache: "no-store" });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Ongera ugerageze.");
  return result;
}

function preparePhoto(file: File, alt: string) {
  return new Promise<{ data: string; type: string; alt: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ data: String(reader.result).split(",", 2)[1], type: file.type, alt });
    reader.onerror = () => reject(new Error("Ifoto ntiyasomwe."));
    reader.readAsDataURL(file);
  });
}

function DateText({ value }: { value: string }) {
  return <time dateTime={value}>{new Intl.DateTimeFormat("en-RW", {
    timeZone: "Africa/Kigali", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(new Date(value))}</time>;
}

export function CommunityClient({ initialMember, canModerate }: { initialMember: Member | null; canModerate: boolean }) {
  const [member, setMember] = useState(initialMember);
  const [tab, setTab] = useState<"feed" | "people" | "inbox">("feed");
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [people, setPeople] = useState<Member[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [older, setOlder] = useState<Message[]>([]);
  const [hasOlder, setHasOlder] = useState(false);
  const [historyEnd, setHistoryEnd] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [refresh, setRefresh] = useState(0);
  const messageIdentity = useRef<{ threadId: string; body: string; id: string } | null>(null);
  const readId = useRef<string | null>(null);
  const conversationEnd = useRef<HTMLDivElement>(null);

  const active = threads.find((thread) => thread.id === selected);
  const visibleMessages = [...new Map([...older, ...messages].map((message) => [message.id, message])).values()]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
  const latestId = visibleMessages.at(-1)?.id;

  function update() { setRefresh((count) => count + 1); }
  function problem(reason: unknown) {
    setError(reason instanceof Error ? reason.message : "Ongera ugerageze.");
  }
  async function act(operation: () => Promise<void>) {
    setError("");
    setBusy(true);
    try { await operation(); } catch (reason) { problem(reason); } finally { setBusy(false); }
  }
  function selectThread(id: string | null) {
    setMessages([]);
    setOlder([]);
    setHasOlder(false);
    setHistoryEnd(false);
    setDraft("");
    readId.current = null;
    setSelected(id);
  }

  useEffect(() => {
    if (!member || tab !== "feed") return;
    let current = true;
    void community<{ posts: Post[]; hasMore: boolean }>(`?page=${page}`).then((result) => {
      if (!current) return;
      setPosts(result.posts);
      setHasMore(result.hasMore);
    }).catch((reason) => { if (current) problem(reason); });
    return () => { current = false; };
  }, [member, page, tab, refresh]);

  useEffect(() => {
    if (!member || tab !== "people") return;
    let current = true;
    void community<{ members: Member[] }>("?members=").then((result) => {
      if (current) setPeople(result.members);
    }).catch((reason) => { if (current) problem(reason); });
    return () => { current = false; };
  }, [member, tab]);

  useEffect(() => {
    if (!member) return;
    let current = true;
    let timer: ReturnType<typeof setTimeout>;
    async function tick() {
      try {
        if (!document.hidden) {
          const result = await community<{ threads: Thread[] }>("?inbox=1");
          if (!current) return;
          setThreads(result.threads);
        }
      } catch (reason) { if (current && tab === "inbox") problem(reason); }
      if (current) timer = setTimeout(tick, tab === "inbox" && !selected ? 2500 : 8000);
    }
    void tick();
    return () => { current = false; clearTimeout(timer); };
  }, [member, tab, selected, refresh]);

  const acceptedThread = tab === "inbox" && active?.status === "ACCEPTED" ? active.id : null;
  useEffect(() => {
    if (!acceptedThread || !member) return;
    let current = true;
    let timer: ReturnType<typeof setTimeout>;
    async function tick() {
      try {
        if (!document.hidden) {
          const result = await community<{ messages: Message[]; hasOlder: boolean }>(`?thread=${acceptedThread}`);
          if (!current) return;
          setMessages(result.messages);
          setHasOlder(result.hasOlder);
          const incoming = result.messages.findLast((message) => message.senderId !== member?.id);
          if (incoming && readId.current !== incoming.id) {
            await community("", { action: "read", threadId: acceptedThread, messageId: incoming.id });
            if (current) readId.current = incoming.id;
          }
        }
      } catch (reason) { if (current) problem(reason); }
      if (current) timer = setTimeout(tick, 1800);
    }
    void tick();
    return () => { current = false; clearTimeout(timer); };
  }, [acceptedThread, member, refresh]);

  useEffect(() => {
    if (latestId) conversationEnd.current?.scrollIntoView({ block: "nearest" });
  }, [latestId]);

  function submit(handler: (form: HTMLFormElement, values: FormData) => Promise<void>) {
    return (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      void act(() => handler(form, new FormData(form)));
    };
  }

  function request(person: Member) {
    void act(async () => {
      const result = await community<{ thread: { id: string } }>("", { action: "request", memberId: person.id });
      if (result.thread.id !== selected) selectThread(result.thread.id);
      setTab("inbox");
      update();
    });
  }

  function displayPerson(person: Member): ReactNode {
    return person.id === member?.id ? <strong>{person.displayName}</strong> : (
      <button className={styles.name} type="button" disabled={busy} onClick={() => request(person)}
        title={`Andikira ${person.displayName}`}>{person.displayName}</button>
    );
  }

  if (!member) return (
    <section className={styles.card}>
      <h2>Iyandikishe muri Community</h2>
      <p>Hitamo izina rigaragarira abandi banyamuryango. Email na telefone byawe biguma muri konti yawe.</p>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      <form className={styles.actions} onSubmit={submit(async (_form, values) => {
        const result = await community<{ member: Member }>("", { action: "join", displayName: values.get("name") });
        setMember(result.member);
      })}>
        <input name="name" aria-label="Izina rigaragara" placeholder="Izina rigaragara" maxLength={45} required />
        <button className={styles.primary} disabled={busy}>Injira muri Community</button>
      </form>
    </section>
  );

  const unread = threads.filter((thread) => thread.unread).length;
  return (
    <>
      <nav className={styles.tabs} aria-label="BaBra Community">
        <button aria-pressed={tab === "feed"} onClick={() => { setError(""); setTab("feed"); }}>Ibyasangiwe</button>
        <button aria-pressed={tab === "people"} onClick={() => { setError(""); setTab("people"); }}>Abanyamuryango</button>
        <button aria-pressed={tab === "inbox"} onClick={() => { setError(""); setTab("inbox"); }}>
          Ubutumwa {unread > 0 && <span className={styles.badge} aria-label={`${unread} bishya`}>{unread}</span>}
        </button>
      </nav>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {tab === "feed" && <section className={styles.stack}>
        <form className={styles.card} onSubmit={submit(async (form, values) => {
          const file = values.get("photo");
          let photo;
          if (file instanceof File && file.size) {
            if (file.size > 600000 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
              throw new Error("Hitamo JPG, PNG cyangwa WebP itarengeje 600 KB.");
            }
            const alt = String(values.get("alt")).trim();
            if (!alt) throw new Error("Andika ibisobanuro bigufi by’ifoto.");
            photo = await preparePhoto(file, alt);
          }
          await community("", { action: "post", body: values.get("body"), photo });
          form.reset();
          setPage(0);
          update();
        })}>
          <label htmlFor="new-post">Sangiza abanyamuryango</label>
          <textarea id="new-post" name="body" placeholder="Andika icyo ushaka gusangiza…" maxLength={1200} required />
          <div className={styles.mediaOptions}>
            <label>Ifoto <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" /></label>
            <label>Ibisobanuro by’ifoto <input name="alt" maxLength={160} /></label>
          </div>
          <button className={styles.primary} disabled={busy}>Sangiza</button>
        </form>
        {!posts.length && <p className={styles.muted}>Nta byasangiwe biragaragara.</p>}
        {posts.map((post) => <article className={styles.card} key={post.id}>
          <div className={styles.row}>
            {displayPerson(post.author)}
            {(post.author.id === member.id || canModerate) && <button className={styles.secondary} disabled={busy} onClick={() => void act(async () => {
              await community("", { action: "removePost", postId: post.id });
              update();
            })}>Siba</button>}
          </div>
          <p className={styles.body}>{post.body}</p>
          {post.alt && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.photo} src={`/api/community/photo/${post.id}`} alt={post.alt} loading="lazy" />
          )}
          <div className={styles.comments}>
            {[...post.comments].reverse().map((comment) => <div key={comment.id} className={styles.comment}>
              {displayPerson(comment.author)}
              <span className={styles.body}>{comment.body}</span>
              {(comment.author.id === member.id || canModerate) && <button className={styles.secondary} disabled={busy} onClick={() => void act(async () => {
                await community("", { action: "removeComment", commentId: comment.id });
                update();
              })}>Siba</button>}
            </div>)}
          </div>
          <form className={styles.actions} onSubmit={submit(async (form, values) => {
            await community("", { action: "comment", postId: post.id, body: values.get("body") });
            form.reset();
            update();
          })}>
            <input name="body" aria-label="Igitekerezo" placeholder="Andika igitekerezo…" maxLength={600} required />
            <button className={styles.outline} disabled={busy}>Ohereza</button>
          </form>
        </article>)}
        {(page > 0 || hasMore) && <div className={styles.actions}>
          <button className={styles.outline} disabled={page === 0} onClick={() => setPage(page - 1)}>Ibanza</button>
          <button className={styles.outline} disabled={!hasMore} onClick={() => setPage(page + 1)}>Ibikurikira</button>
        </div>}
      </section>}
      {tab === "people" && <section className={styles.card}>
        <h2>Shaka umunyamuryango</h2>
        <form className={styles.actions} onSubmit={submit(async (_form, values) => {
          const result = await community<{ members: Member[] }>(`?members=${encodeURIComponent(String(values.get("query")))}`);
          setPeople(result.members);
        })}>
          <input name="query" aria-label="Izina ushaka" placeholder="Shaka ku izina…" maxLength={45} />
          <button className={styles.primary} disabled={busy}>Shaka</button>
        </form>
        {!people.length && <p className={styles.muted}>Nta bandi banyamuryango babonetse.</p>}
        {people.map((person) => <div className={styles.person} key={person.id}>
          <strong>{person.displayName}</strong>
          <button className={styles.outline} disabled={busy} onClick={() => request(person)}>Mwandikire</button>
        </div>)}
      </section>}
      {tab === "inbox" && <section className={styles.inbox}>
        <div className={styles.card}>
          <h2>Ibiganiro</h2>
          {!threads.length && <p className={styles.muted}>Shaka umunyamuryango kugira ngo utangize ikiganiro.</p>}
          {threads.map((thread) => <button key={thread.id} className={styles.thread}
            disabled={busy} aria-pressed={thread.id === selected} onClick={() => { if (selected !== thread.id) selectThread(thread.id); }}>
            {thread.person.displayName}
            {thread.unread && <span className={styles.badge}>{thread.status === "PENDING" ? "Ubusabe" : "Bushya"}</span>}
          </button>)}
        </div>
        <div className={styles.card}>
          {!active ? <p className={styles.muted}>Hitamo ikiganiro.</p> : <>
            <div className={styles.row}>
              <h2>{active.person.displayName}</h2>
              {active.status === "ACCEPTED" && <button className={styles.secondary} disabled={busy} onClick={() => {
                if (!window.confirm("Ushaka guhagarika iki kiganiro?")) return;
                void act(async () => {
                  await community("", { action: "block", threadId: active.id });
                  selectThread(null);
                  update();
                });
              }}>Hagarika ikiganiro</button>}
            </div>
            {active.status === "PENDING" ? active.incoming ? <>
              <p>Arashaka kuganira nawe.</p>
              <div className={styles.actions}>
                {[true, false].map((accept) => <button key={String(accept)} className={accept ? styles.primary : styles.outline}
                  disabled={busy} onClick={() => void act(async () => {
                    await community("", { action: "respond", threadId: active.id, accept });
                    if (!accept) selectThread(null);
                    update();
                  })}>{accept ? "Emera" : "Anga"}</button>)}
              </div>
            </> : <p>Ubusabe bwo kuganira bwoherejwe. Tegereza ko abwemera.</p> : <>
              <div className={styles.conversation} aria-label="Ubutumwa bwihariye" role="log" aria-live="polite" tabIndex={0}>
                {hasOlder && !historyEnd && visibleMessages.length > 0 && <button className={styles.outline} disabled={busy}
                  onClick={() => void act(async () => {
                    const first = visibleMessages[0].id;
                    const result = await community<{ messages: Message[]; hasOlder: boolean }>(`?thread=${active.id}&before=${first}`);
                    setOlder((existing) => [...result.messages, ...existing]);
                    setHistoryEnd(!result.hasOlder);
                  })}>Reba ubutumwa bwa mbere</button>}
                {!visibleMessages.length && <p className={styles.muted}>Tangiza ikiganiro.</p>}
                {visibleMessages.map((message) => <div className={message.senderId === member.id ? styles.mine : styles.theirs} key={message.id}>
                  <p className={styles.body}>{message.body}</p>
                  <DateText value={message.createdAt} />
                </div>)}
                <div ref={conversationEnd} />
              </div>
              <form className={styles.actions} onSubmit={submit(async () => {
                const body = draft.trim();
                if (!body) return;
                const previous = messageIdentity.current;
                const id = previous?.threadId === active.id && previous.body === body ? previous.id : crypto.randomUUID();
                messageIdentity.current = { threadId: active.id, body, id };
                const result = await community<{ message: Message }>("", { action: "message", threadId: active.id, messageId: id, body });
                setMessages((list) => [...list.filter((message) => message.id !== id), result.message]);
                messageIdentity.current = null;
                setDraft("");
                update();
              })}>
                <input name="message" aria-label="Ubutumwa bwihariye" placeholder="Andika ubutumwa…" value={draft}
                  onChange={(event) => setDraft(event.target.value)} disabled={busy} maxLength={2000} required />
                <button className={styles.primary} disabled={busy || !draft.trim()}>Ohereza</button>
              </form>
            </>}
          </>}
        </div>
      </section>}
    </>
  );
}
