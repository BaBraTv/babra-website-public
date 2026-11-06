import { z } from "zod";

export const galleryDivisions = ["BaBra Cosmetics", "Rwanda Mobile Hub", "LifeTalk TV", "BaBra Holding", "Other"] as const;
export const galleryDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date").refine(v => {
  const d = new Date(`${v}T00:00:00.000Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}, "Choose a valid calendar date");
const photo = z.object({ data: z.string().max(820000), type: z.enum(["image/jpeg", "image/png", "image/webp"]), alt: z.string().trim().max(160).optional() });
export const galleryPostInput = z.object({
  title: z.string().trim().min(3).max(140),
  description: z.string().trim().min(5).max(4000),
  activityDate: galleryDate,
  division: z.enum(galleryDivisions),
  status: z.enum(["PUBLISHED", "HIDDEN"]).default("PUBLISHED"),
  photos: z.array(photo).max(4).default([])
});
export const galleryCommentInput = z.object({
  author: z.string().trim().min(2).max(60),
  body: z.string().trim().min(3).max(1200),
  consent: z.literal(true, { error: "Please agree to publish your name and comment" }),
  website: z.string().max(0).optional()
});
export function decodeGalleryPhoto(input: z.infer<typeof photo>) {
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(input.data)) throw new Error("Invalid image");
  const data = Buffer.from(input.data, "base64");
  if (data.length < 12 || data.length > 600000) throw new Error("Photo must be under 600 KB");
  const png = data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpeg = data[0] === 255 && data[1] === 216 && data[2] === 255;
  const webp = data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP";
  if (!(input.type === "image/png" ? png : input.type === "image/jpeg" ? jpeg : webp)) throw new Error("Invalid image format");
  return { data: new Uint8Array(data), contentType: input.type, alt: input.alt || "BaBra activity photograph" };
}
export function galleryDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Kigali" }).format(new Date(value));
}
export type GalleryEntry = {
  id: string; title: string; description: string; activityDate: string; division: string; status: string;
  images: { id: string; alt: string; src: string | null }[];
  _count: { comments: number };
};
export type GalleryCommentEntry = { id: string; author: string; body: string; createdAt: string; status?: string; postId?: string };
