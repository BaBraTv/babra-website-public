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
  rwandaMobileHub: "mobilehub@babra.store"
} as const;

export async function queueNotification(input: {
  route: keyof typeof divisionEmailRoutes;
  subject: string;
  templateKey: string;
  payload: unknown;
}) {
  const prisma = getPrisma();
  const recipient = divisionEmailRoutes[input.route];
  const [emailNotification] = await prisma.$transaction([
    prisma.emailNotification.create({
      data: {
        recipient,
        subject: input.subject,
        templateKey: input.templateKey,
        payload: input.payload as object
      }
    }),
    prisma.notificationDelivery.create({
      data: {
        channel: "EMAIL",
        recipient,
        subject: input.subject,
        templateKey: input.templateKey,
        payload: input.payload as object
      }
    })
  ]);
  return emailNotification;
}

export const commerceEmailTemplates = {
  welcome: "customer.welcome",
  orderConfirmation: "orders.confirmation",
  shipping: "orders.shipping",
  passwordReset: "auth.forgot_password",
  contact: "contact.received"
} as const;

export async function queueCustomerNotification(input: {
  channel: "EMAIL" | "WHATSAPP" | "SMS";
  recipient: string;
  subject?: string;
  templateKey: string;
  payload: unknown;
}) {
  return getPrisma().notificationDelivery.create({
    data: {
      channel: input.channel,
      recipient: input.recipient,
      subject: input.subject,
      templateKey: input.templateKey,
      payload: input.payload as object
    }
  });
}
