import assert from "node:assert/strict";
import test from "node:test";
import { galleryDate, galleryPostInput, galleryCommentInput, decodeGalleryPhoto } from "../lib/gallery.ts";

test("gallery dates reject impossible calendar days and preserve the selected date", () => {
  assert.equal(galleryDate.parse("2026-11-06"), "2026-11-06");
  assert.equal(galleryDate.safeParse("2026-02-30").success, false);
  assert.equal(galleryDate.safeParse("2026-13-01").success, false);
});
test("public comments require consent and reject hidden spam fields", () => {
  const comment = { author: "Visitor", body: "Thank you BaBra", consent: true, website: "" };
  assert.equal(galleryCommentInput.safeParse(comment).success, true);
  assert.equal(galleryCommentInput.safeParse({ ...comment, consent: false }).success, false);
  assert.equal(galleryCommentInput.safeParse({ ...comment, website: "spam.example" }).success, false);
});
test("photo validation checks file contents as well as MIME type and size", () => {
  const jpeg = Buffer.from([255,216,255,...Array(20).fill(0)]).toString("base64");
  assert.equal(decodeGalleryPhoto({ data: jpeg, type: "image/jpeg" }).contentType, "image/jpeg");
  assert.throws(() => decodeGalleryPhoto({ data: jpeg, type: "image/png" }));
  assert.throws(() => decodeGalleryPhoto({ data: Buffer.alloc(600001).toString("base64"), type: "image/jpeg" }));
  assert.throws(() => decodeGalleryPhoto({ data: "<svg onload='alert(1)'>", type: "image/jpeg" }));
});
test("activity submissions cap photos and do not accept arbitrary status values", () => {
  const post = { title: "BaBra activity", description: "Daily activity", activityDate: "2026-11-06", division: "BaBra Cosmetics", photos: [] };
  assert.equal(galleryPostInput.parse(post).status, "PUBLISHED");
  assert.equal(galleryPostInput.safeParse({ ...post, status: "ADMIN" }).success, false);
  assert.equal(galleryPostInput.safeParse({ ...post, photos: Array(5).fill({ data: "AAAA", type: "image/jpeg" }) }).success, false);
});
