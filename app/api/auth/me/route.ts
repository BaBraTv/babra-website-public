import { NextResponse } from "next/server";
import { getCurrentUser, publicUser } from "../../../../lib/session";
import { fail } from "../../../../lib/api";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ ok: true, user: user ? publicUser(user) : null });
  } catch (error) {
    return fail(error);
  }
}
