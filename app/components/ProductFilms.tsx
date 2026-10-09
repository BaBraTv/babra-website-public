"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ProductFilms.module.css";

const films = [
  { slug: "babra-lotion-women-front", title: "Signature for Her · Front view", description: "A short camera view of the original BaBra Body Lotion bottle on a desk. The front label reads Signature for Her and 500 ml." },
  { slug: "babra-lotion-women-back-label", title: "The bottle · Back label", description: "A short camera view of the back of the BaBra lotion bottle, showing its printed ingredients, directions and manufacturer and distributor details. Some small text is obscured by reflections." }
] as const;

function Film({ film }: { film: (typeof films)[number] }) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const base = `/media/cosmetics/${film.slug}`;
  return (
    <figure className={styles.film}>
      <div className={styles.player}>
        {started ? (
          <video controls autoPlay playsInline preload="none" poster={`${base}-poster.webp`} width={1280} height={720} aria-label={`${film.title}. Instrumental music only.`} aria-describedby={`${film.slug}-description`} onError={() => setFailed(true)}>
            <source src={`${base}.mp4`} type="video/mp4" />
            Your browser does not support video. <a href={`${base}.mp4`}>Open the film</a>.
          </video>
        ) : (
          <button type="button" className={styles.play} onClick={() => setStarted(true)} aria-label={`Play ${film.title}. Instrumental music only.`}>
            <Image src={`${base}-poster.webp`} alt="" width={1280} height={720} sizes="(min-width: 768px) 45vw, 92vw" loading="lazy" />
            <span className={styles.playLabel}><span aria-hidden="true">▶</span> Play film</span>
          </button>
        )}
      </div>
      <figcaption>
        <h3>{film.title}</h3>
        <p id={`${film.slug}-description`}>{film.description}</p>
        <span className={styles.silent}>Instrumental music only</span>
        {failed && <p role="status">The film could not load. Please try the direct link below.</p>}
        <a href={`${base}.mp4`}>Open video file <span aria-hidden="true">↗</span></a>
      </figcaption>
    </figure>
  );
}

export function ProductFilms() {
  return <div className={styles.grid}>{films.map(film => <Film key={film.slug} film={film} />)}</div>;
}
