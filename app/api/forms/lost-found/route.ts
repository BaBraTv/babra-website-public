import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { lostFoundReportSchema } from "../../../../lib/validation";
import { getCurrentUser } from "../../../../lib/session";
import { queueNotification } from "../../../../lib/email-routing";
import { fail } from "../../../../lib/api";

export async function POST(request: NextRequest) {
  try {
    const payload = lostFoundReportSchema.parse(await request.json());
    const user = await getCurrentUser();
    const report = await getPrisma().lostFoundReport.create({
      data: {
        ...payload,
        reporterEmail: payload.reporterEmail || null,
        userId: user?.id
      }
    });
    await queueNotification({
      route: "lostFound",
      subject: `Lost & Found report: ${payload.itemTitle}`,
      templateKey: "forms.lost_found",
      payload: { reportId: report.id, reportType: payload.reportType }
    });
    return NextResponse.json({ ok: true, report });
  } catch (error) {
    return fail(error);
  }
}
