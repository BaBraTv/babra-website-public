import { NextRequest, NextResponse } from "next/server";
import { authFail } from "../../../../lib/api";
import { recordAdminAction } from "../../../../lib/audit";
import { getPrisma } from "../../../../lib/db";
import { createMediaAsset } from "../../../../lib/media-storage";
import { requireSameOrigin } from "../../../../lib/security";
import { requireAdminUser } from "../../../../lib/session";

export async function GET() {
  try {
    await requireAdminUser();
    const assets = await getPrisma().mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return NextResponse.json({ ok: true, folders: ["products", "homepage", "company", "documents"], uploadsEnabled: true, assets });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const admin = await requireAdminUser();
    const payload = await request.json();
    const asset = await createMediaAsset({
      folder: String(payload.folder || "products"),
      fileName: String(payload.fileName || "upload"),
      mimeType: String(payload.mimeType || "application/octet-stream"),
      sizeBytes: Number(payload.sizeBytes || 0),
      alt: payload.alt ? String(payload.alt) : null,
      uploadedById: admin.id
    });
    await recordAdminAction({ actorId: admin.id, action: "CREATE", entityType: "MediaAsset", entityId: asset.id, summary: `Created media asset ${asset.fileName}` });
    return NextResponse.json({ ok: true, asset }, { status: 201 });
  } catch (error) {
    return authFail(error);
  }
}
