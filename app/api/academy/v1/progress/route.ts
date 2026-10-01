import { NextResponse } from "next/server";
import { getAcademyUser } from "../../../../../lib/academy/auth";
import { findAcademyLesson } from "../../../../../lib/academy/curriculum";
import { enforceAcademyRateLimit } from "../../../../../lib/academy/rate-limit";
import { academyProgressSchema } from "../../../../../lib/academy/validation";
import { writeAcademyAudit } from "../../../../../lib/academy/audit";
import { getPrisma } from "../../../../../lib/db";
import { requireAcademyEnabled } from "../../../../../lib/academy/feature";

export async function POST(request: Request) {
  try { requireAcademyEnabled(); } catch { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
  const user = await getAcademyUser();
  if (!user) return NextResponse.json({ error: "Sign in is required" }, { status: 401 });
  try { await enforceAcademyRateLimit(`academy-progress:${user.id}`, 60, 15); } catch { return NextResponse.json({ error: "Too many requests" }, { status: 429 }); }
  const parsed = academyProgressSchema.safeParse(await request.json().catch(() => null));
  const found = parsed.success ? findAcademyLesson(parsed.data.lessonId) : null;
  if (!parsed.success || !found) return NextResponse.json({ error: "Invalid lesson progress" }, { status: 400 });
  const score = parsed.data.answer === found.lesson.check.answer ? 100 : 0;
  const existing = await getPrisma().academyLessonProgress.findUnique({ where: { userId_lessonId: { userId: user.id, lessonId: parsed.data.lessonId } } });
  const bestScore = Math.max(existing?.score ?? 0, score);
  const progress = await getPrisma().academyLessonProgress.upsert({
    where: { userId_lessonId: { userId: user.id, lessonId: parsed.data.lessonId } },
    create: { userId: user.id, lessonId: parsed.data.lessonId, score, completedAt: score === 100 ? new Date() : null },
    update: { score: bestScore, attempts: { increment: 1 }, completedAt: bestScore === 100 ? (existing?.completedAt ?? new Date()) : null }
  });
  await writeAcademyAudit({ actorId: user.id, action: "LESSON_PROGRESS_SAVED", entityType: "AcademyLessonProgress", entityId: progress.id, metadata: { lessonId: parsed.data.lessonId, score } });
  return NextResponse.json({ ok: true, score: progress.score });
}
