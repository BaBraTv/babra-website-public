import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { jobApplicationSchema } from "../../../../lib/validation";
import { getCurrentUser } from "../../../../lib/session";
import { queueNotification } from "../../../../lib/email-routing";
import { fail } from "../../../../lib/api";

export async function POST(request: NextRequest) {
  try {
    const payload = jobApplicationSchema.parse(await request.json());
    const user = await getCurrentUser();
    const application = await getPrisma().jobApplication.create({
      data: {
        ...payload,
        email: payload.email || null,
        userId: user?.id
      }
    });
    await queueNotification({
      route: "jobs",
      subject: `New BaBra job application: ${payload.roleApplied}`,
      templateKey: "forms.job_application",
      payload: { applicationId: application.id, division: payload.division }
    });
    return NextResponse.json({ ok: true, application });
  } catch (error) {
    return fail(error);
  }
}
