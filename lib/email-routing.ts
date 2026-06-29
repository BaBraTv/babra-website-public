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
  return getPrisma().emailNotification.create({
    data: {
      recipient: divisionEmailRoutes[input.route],
      subject: input.subject,
      templateKey: input.templateKey,
      payload: input.payload as object
    }
  });
}
