import { getPrisma } from "./db";

export type EmailTemplateKey = "welcome" | "orderConfirmation" | "shippingUpdate" | "passwordReset" | "contactAcknowledgement";

export const emailTemplates: Record<EmailTemplateKey, { subject: string; templateKey: string }> = {
  welcome: { subject: "Welcome to BaBra", templateKey: "customer.welcome" },
  orderConfirmation: { subject: "BaBra order confirmation", templateKey: "orders.confirmation" },
  shippingUpdate: { subject: "BaBra shipping update", templateKey: "orders.shipping" },
  passwordReset: { subject: "BaBra password reset", templateKey: "auth.password_reset" },
  contactAcknowledgement: { subject: "BaBra received your message", templateKey: "contact.acknowledgement" }
};

export type EmailProvider = {
  name: string;
  queue(input: { to: string; subject: string; templateKey: string; payload: unknown }): Promise<{ providerRef?: string }>;
};

export function getEmailProvider(): EmailProvider {
  const name = process.env.EMAIL_PROVIDER || "QUEUE_ONLY";
  return {
    name,
    async queue() {
      return {};
    }
  };
}

export async function queueTransactionalEmail(input: {
  to: string;
  template: EmailTemplateKey;
  payload: unknown;
  subject?: string;
}) {
  const template = emailTemplates[input.template];
  const provider = getEmailProvider();
  const subject = input.subject ?? template.subject;
  const queued = await provider.queue({ to: input.to, subject, templateKey: template.templateKey, payload: input.payload });
  return getPrisma().notificationDelivery.create({
    data: {
      channel: "EMAIL",
      recipient: input.to,
      subject,
      templateKey: template.templateKey,
      payload: input.payload as object,
      provider: provider.name,
      providerRef: queued.providerRef
    }
  });
}
