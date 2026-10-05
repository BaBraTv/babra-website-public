import { getPrisma } from "./db";

export const divisionEmailRoutes = {
  orders: "orders@babra.store",
  payments: "payments@babra.store",
  contact: "support@babra.store",
  jobs: "jobs@babra.store",
  lostFound: "lostfound@babra.store",
  investorAccess: "investors@babra.store",
  foundation: "foundation@babra.store",
  schools: "schools@babra.store",
  hospital: "hospital@babra.store",
  rwandaMobileHub: "mobilehub@babra.store",
  testimonials: "support@babra.store"
} as const;

async function tryDeliverInternalNotification(notification: {
  id: string;
  recipient: string;
  subject: string;
  templateKey: string;
  payload: unknown;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || process.env.PASSWORD_RECOVERY_FROM;
  const to = process.env.INTERNAL_NOTIFICATION_EMAIL || "babracosmeticsltd@gmail.com";
  if (!apiKey || !from) return;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(15_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[BaBra · ${notification.recipient}] ${notification.subject}`,
        text: [
          `Template: ${notification.templateKey}`,
          `Queue ID: ${notification.id}`,
          "",
          JSON.stringify(notification.payload, null, 2)
        ].join("\n")
      })
    });

    if (!response.ok) throw new Error(`Resend returned ${response.status}`);
    await getPrisma().emailNotification.update({
      where: { id: notification.id },
      data: { sentAt: new Date(), failedAt: null, failureReason: null }
    });
  } catch (error) {
    await getPrisma().emailNotification.update({
      where: { id: notification.id },
      data: {
        failedAt: new Date(),
        failureReason: error instanceof Error ? error.message.slice(0, 500) : "Email delivery failed"
      }
    }).catch(() => undefined);
    console.error("Internal notification email delivery failed", { notificationId: notification.id });
  }
}

export async function queueNotification(input: {
  route: keyof typeof divisionEmailRoutes;
  subject: string;
  templateKey: string;
  payload: unknown;
}) {
  const notification = await getPrisma().emailNotification.create({
    data: {
      recipient: divisionEmailRoutes[input.route],
      subject: input.subject,
      templateKey: input.templateKey,
      payload: input.payload as object
    }
  });

  await tryDeliverInternalNotification(notification);
  return notification;
}
