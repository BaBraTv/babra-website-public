import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { investorAccessRequestSchema } from "../../../../lib/validation";
import { getCurrentUser } from "../../../../lib/session";
import { queueNotification } from "../../../../lib/email-routing";
import { fail } from "../../../../lib/api";

export async function POST(request: NextRequest) {
  try {
    const payload = investorAccessRequestSchema.parse(await request.json());
    const user = await getCurrentUser();
    const investorRequest = await getPrisma().investorAccessRequest.create({
      data: {
        ...payload,
        userId: user?.id
      }
    });
    await queueNotification({
      route: "investorAccess",
      subject: `Investor access request: ${payload.fullName}`,
      templateKey: "forms.investor_access",
      payload: { investorRequestId: investorRequest.id, projectArea: payload.projectArea }
    });
    return NextResponse.json({ ok: true, investorRequest });
  } catch (error) {
    return fail(error);
  }
}
