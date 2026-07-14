import type { AdminAction, Prisma } from "@prisma/client";
import { getPrisma } from "./db";

export async function recordAdminAction(input: {
  actorId?: string | null;
  action: AdminAction;
  entityType: string;
  entityId?: string | null;
  summary: string;
  metadata?: Prisma.InputJsonValue;
}) {
  return getPrisma().adminActivityLog.create({
    data: {
      actorId: input.actorId ?? null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      summary: input.summary,
      metadata: input.metadata
    }
  });
}
