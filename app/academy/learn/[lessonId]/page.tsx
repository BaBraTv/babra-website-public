import { notFound } from "next/navigation";
import { requireAcademyUser } from "../../../../lib/academy/auth";
import { findAcademyLesson } from "../../../../lib/academy/curriculum";
import { getPrisma } from "../../../../lib/db";
import { LessonExperience } from "./LessonExperience";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const user = await requireAcademyUser();
  const { lessonId } = await params;
  const found = findAcademyLesson(lessonId);
  if (!found) notFound();
  const progress = await getPrisma().academyLessonProgress.findUnique({ where: { userId_lessonId: { userId: user.id, lessonId } } });
  return <LessonExperience module={found.module} lesson={found.lesson} initialScore={progress?.score ?? null} />;
}
