"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

const WHATSAPP_NUMBER = "250788351482";

type MediaPreview = {
  url: string;
  name: string;
  type: string;
};

const categories = [
  "BaBra Cosmetics",
  "LifeTalk TV",
  "NZABIGERAHO Film",
  "BaBra Foundation",
  "BaBra Farm",
  "BaBra Schools",
  "Customer Testimonial",
  "Announcement"
];

const samplePosts = [
  {
    type: "Video",
    title: "Factory production update",
    text: "Short production clips can be reviewed, approved, and published after brand checks.",
    tag: "Review first"
  },
  {
    type: "Image",
    title: "Product launch photo",
    text: "New BaBra product photos can be prepared for store, social media, and homepage sections.",
    tag: "Visual content"
  },
  {
    type: "Text",
    title: "Founder message",
    text: "Short text updates can become website news, LifeTalk TV notes, or social captions.",
    tag: "Story content"
  }
];

export function ContentStudioClient() {
  const [media, setMedia] = useState<MediaPreview | null>(null);
  const [postType, setPostType] = useState("Image + Text");
  const [category, setCategory] = useState(categories[0]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [publishTarget, setPublishTarget] = useState("Website + Social Media");

  const canSubmit = title.trim().length > 2 && body.trim().length > 8;
  const mediaKind = useMemo(() => {
    if (!media) return "No media selected";
    if (media.type.startsWith("video/")) return "Video selected";
    if (media.type.startsWith("image/")) return "Image selected";
    return "File selected";
  }, [media]);

  function handleMedia(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setMedia(null);
      return;
    }

    setMedia({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    });
  }

  function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const message = [
      "BaBra Content Studio Request",
      `Type: ${postType}`,
      `Category: ${category}`,
      `Publish target: ${publishTarget}`,
      `Title: ${title}`,
      "",
      "Text:",
      body,
      "",
      media ? `Media selected in browser preview: ${media.name}` : "Media: none",
      "Note: I will attach the image/video in WhatsApp for review."
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={submitPost} className="rounded-[2rem] border border-[#f1d58b]/20 bg-white/[0.055] p-5 shadow-2xl shadow-black/25 md:p-8">
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Content type</span>
            <select
              className="min-h-14 rounded-2xl border border-white/10 bg-[#120d0b] px-4 text-base font-bold text-white outline-none focus:border-[#4ebeff]"
              value={postType}
              onChange={(event) => setPostType(event.target.value)}
            >
              <option>Image + Text</option>
              <option>Video + Text</option>
              <option>Text Only</option>
              <option>Testimonial</option>
              <option>Announcement</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Division / category</span>
            <select
              className="min-h-14 rounded-2xl border border-white/10 bg-[#120d0b] px-4 text-base font-bold text-white outline-none focus:border-[#4ebeff]"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Title</span>
            <input
              className="min-h-14 rounded-2xl border border-white/10 bg-[#120d0b] px-4 text-base font-bold text-white outline-none focus:border-[#4ebeff]"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Urugero: BaBra Lotion launch update"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Text / caption</span>
            <textarea
              className="min-h-40 rounded-2xl border border-white/10 bg-[#120d0b] px-4 py-4 text-base font-semibold leading-7 text-white outline-none focus:border-[#4ebeff]"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Andika ubutumwa, story, caption, cyangwa announcement..."
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Image or video</span>
            <input
              className="rounded-2xl border border-dashed border-[#f1d58b]/35 bg-[#120d0b] px-4 py-5 text-sm font-bold text-white file:mr-4 file:rounded-full file:border-0 file:bg-[#f1d58b] file:px-4 file:py-2 file:font-black file:text-[#130d08]"
              type="file"
              accept="image/*,video/*"
              onChange={handleMedia}
            />
            <span className="text-sm font-semibold text-white/48">{mediaKind}</span>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Publish target</span>
            <select
              className="min-h-14 rounded-2xl border border-white/10 bg-[#120d0b] px-4 text-base font-bold text-white outline-none focus:border-[#4ebeff]"
              value={publishTarget}
              onChange={(event) => setPublishTarget(event.target.value)}
            >
              <option>Website + Social Media</option>
              <option>Website only</option>
              <option>Social media only</option>
              <option>Internal review only</option>
            </select>
          </label>

          <button
            className="min-h-14 rounded-full bg-[#f1d58b] px-6 py-3 text-base font-black text-[#130d08] disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!canSubmit}
            type="submit"
          >
            Send for review
          </button>
        </div>
      </form>

      <aside className="grid gap-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#4ebeff]">Live preview</p>
          <article className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#120d0b]">
            <div className="grid min-h-80 place-items-center bg-black/30">
              {media?.type.startsWith("video/") ? (
                <video className="max-h-96 w-full object-contain" src={media.url} controls muted playsInline />
              ) : media?.type.startsWith("image/") ? (
                <img className="max-h-96 w-full object-contain" src={media.url} alt="Selected content preview" />
              ) : (
                <div className="px-6 text-center">
                  <p className="font-serif text-4xl">Preview</p>
                  <p className="mt-3 text-sm leading-6 text-white/52">Choose an image or video to preview it before sending.</p>
                </div>
              )}
            </div>
            <div className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d58b]">{category}</p>
              <h2 className="mt-2 font-serif text-3xl">{title || "Post title will appear here"}</h2>
              <p className="mt-3 leading-7 text-white/62">{body || "Your post text, story, caption, or announcement will appear here."}</p>
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] border border-[#f1d58b]/20 bg-[#fffaf1] p-5 text-[#18110c] md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a9141d]">Publishing rules</p>
          <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-black/62">
            <li>1. Content is reviewed before it becomes public.</li>
            <li>2. Do not post private formulas, supplier documents, barcodes, passwords, or full certificates.</li>
            <li>3. Videos and images should support BaBra premium/global positioning.</li>
            <li>4. Full automatic publishing requires backend storage and admin approval workflow.</li>
          </ul>
        </section>

        <section className="grid gap-3">
          {samplePosts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-[#f1d58b]/25 px-3 py-1 text-xs font-black text-[#f1d58b]">{post.type}</span>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-white/38">{post.tag}</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl">{post.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{post.text}</p>
            </article>
          ))}
        </section>
      </aside>
    </div>
  );
}
