import { NextResponse } from "next/server";
import { getAcademyUser } from "../../../../../lib/academy/auth";
import { findAcademyLesson } from "../../../../../lib/academy/curriculum";
import { enforceAcademyRateLimit } from "../../../../../lib/academy/rate-limit";
import { z } from "zod";

const requestSchema = z.object({
  lessonId: z.string().min(2).max(80),
  question: z.string().trim().min(3).max(500),
  locale: z.enum(["rw", "en"])
});

export async function POST(request: Request) {
  const user = await getAcademyUser();
  if (!user) return NextResponse.json({ error: "Please sign in to use the learning assistant." }, { status: 401 });
  try { await enforceAcademyRateLimit(`academy-tutor:${user.id}`, 12, 10); } catch {
    return NextResponse.json({ error: "You have asked several questions. Take a short learning break and try again." }, { status: 429 });
  }

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please ask a short question about this lesson." }, { status: 400 });
  const context = findAcademyLesson(parsed.data.lessonId);
  if (!context) return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "The learning assistant is temporarily unavailable. Please ask a parent or teacher." }, { status: 503 });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_ACADEMY_MODEL || "gpt-5.6-luna",
      store: false,
      max_output_tokens: 350,
      input: [
        { role: "developer", content: `You are the BaBra AI Academy learning assistant for a learner aged 10 or older. Answer only about the supplied lesson. Be encouraging, factual, concise and age-appropriate. Never request personal information. Do not provide medical, legal, financial or dangerous instructions. If a request is unsafe, private, unrelated or asks for cheating, refuse briefly and guide the learner to a parent, guardian or teacher. Reply in ${parsed.data.locale === "rw" ? "clear Kinyarwanda" : "clear English"}. Lesson: ${context.lesson.title[parsed.data.locale]}. Explanation: ${context.lesson.explanation[parsed.data.locale]}.` },
        { role: "user", content: parsed.data.question }
      ]
    }),
    signal: AbortSignal.timeout(15_000)
  }).catch(() => null);

  if (!response?.ok) return NextResponse.json({ error: "The learning assistant is temporarily unavailable. Please continue with the lesson." }, { status: 503 });
  const body = await response.json() as { output_text?: string };
  const answer = body.output_text?.trim();
  if (!answer) return NextResponse.json({ error: "The learning assistant could not answer that question." }, { status: 503 });
  return NextResponse.json({ answer });
}
