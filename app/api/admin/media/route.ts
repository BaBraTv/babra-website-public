import { NextResponse } from "next/server";
import { authFail } from "../../../../lib/api";
import { requireAdminUser } from "../../../../lib/session";

export async function GET() {
  try {
    await requireAdminUser();
    return NextResponse.json({ ok: true, folders: ["products", "homepage", "company", "documents"], uploadsEnabled: false, note: "Media upload provider is not configured yet." });
  } catch (error) {
    return authFail(error);
  }
}