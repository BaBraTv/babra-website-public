import Image from "next/image";
import type { OfficialMediaItem } from "../data/official-media";
import { officialMediaPendingLabel } from "../data/official-media";

export function OfficialMedia({
  media,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 92vw, 420px"
}: {
  media?: OfficialMediaItem | null;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!media?.approved || !media.path) {
    return (
      <div className={`grid min-h-32 place-items-center rounded-lg border border-dashed border-[#d6ad57]/40 bg-black/25 p-5 text-center text-sm font-black uppercase tracking-[0.14em] text-[#f1d58b] ${className}`}>
        {officialMediaPendingLabel}
      </div>
    );
  }

  return (
    <Image
      className={className}
      src={media.path}
      alt={media.alt}
      width={media.category === "logo" ? 1536 : media.id.includes("babies") ? 512 : media.id.includes("men") ? 516 : 518}
      height={media.category === "logo" ? 1024 : 1024}
      sizes={sizes}
      priority={priority}
    />
  );
}

