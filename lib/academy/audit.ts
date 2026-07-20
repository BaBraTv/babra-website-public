import { headers } from "next/headers";
import { getPrisma } from "../db";

type AuditInput = {
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  outcome?: "SUCCESS" | "FAILURE";
  metadata?: Record<string, string | number | boolean | null>;
};

export async function writeAcademyAudit(input: AuditInput) {
  const requestHeaders = await headers();
  await getPrisma().academyAuditLog.create({
    data: {
      ...input,
      ipAddress: requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim(),
      userAgent: requestHeaders.get("user-agent")
    }
  });
}
