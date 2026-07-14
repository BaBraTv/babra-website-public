import { NextRequest, NextResponse } from "next/server";
import { fail } from "../../../lib/api";
import { listShippingOptions } from "../../../lib/shipping";

export async function GET(request: NextRequest) {
  try {
    const country = request.nextUrl.searchParams.get("country") || "RW";
    const region = request.nextUrl.searchParams.get("region") || undefined;
    const options = await listShippingOptions(country, region);
    return NextResponse.json({ ok: true, options });
  } catch (error) {
    return fail(error);
  }
}
