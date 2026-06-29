import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { contactMessageSchema } from "../../../../lib/validation";
import { queueNotification } from "../../../../lib/email-routing";
import { fail } from "../../../../lib/api";

export async function POST(request: NextRequest) {
  try {
    const payload = contactMessageSchema.parse(await request.json());
    const message = await getPrisma().contactMessage.create({ data: payload });
    await queueNotification({
      route: "contact",
      subject: payload.subject || "New BaBra contact message",
      templateKey: "forms.contact",
      payload: { messageId: message.id, sourcePage: payload.sourcePage }
    });
    return NextResponse.json({ ok: true, message });
  } catch (error) {
    return fail(error);
  }
}
