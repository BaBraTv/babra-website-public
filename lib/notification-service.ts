import { getPrisma } from "./db";

type NotificationChannel = "EMAIL" | "WHATSAPP" | "SMS";

export async function queueNotificationDelivery(input: {
  channel: NotificationChannel;
  recipient: string;
  templateKey: string;
  payload: unknown;
  subject?: string;
}) {
  const providerEnv = `${input.channel}_PROVIDER`;
  return getPrisma().notificationDelivery.create({
    data: {
      channel: input.channel,
      recipient: input.recipient,
      subject: input.subject,
      templateKey: input.templateKey,
      payload: input.payload as object,
      provider: process.env[providerEnv] || "QUEUE_ONLY"
    }
  });
}
