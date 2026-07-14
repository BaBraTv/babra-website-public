import { NextResponse } from "next/server";
import { authFail } from "../../../../lib/api";
import { requireAdminUser } from "../../../../lib/session";
import { site } from "../../../commerce-data";

export async function GET() {
  try {
    await requireAdminUser();
    return NextResponse.json({ ok: true, settings: { company: site.company, email: site.email, phone: site.phone, address: site.address, socialLinks: [], seoDefaults: { title: "BaBra Holding Ltd", description: "Official BaBra ecosystem platform" }, homepage: { slogan: "Luxury in Every Touch" } } });
  } catch (error) {
    return authFail(error);
  }
}