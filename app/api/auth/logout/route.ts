import { NextResponse } from "next/server";
import { destroyCurrentSession } from "../../../../lib/session";
import { fail } from "../../../../lib/api";

export async function POST() {
  try {
    await destroyCurrentSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
