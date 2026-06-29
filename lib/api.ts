import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok(data: unknown = {}) {
  return NextResponse.json({ ok: true, ...((data && typeof data === "object") ? data : { data }) });
}

export function fail(error: unknown, status = 400) {
  const message =
    error instanceof ZodError
      ? error.issues.map((issue) => issue.message).join("; ")
      : error instanceof Error
        ? error.message
        : "Request failed";

  return NextResponse.json({ ok: false, error: message }, { status });
}

export function authFail(error: unknown) {
  const message = error instanceof Error ? error.message : "Authentication required";
  const status = message.includes("Admin") ? 403 : 401;
  return fail(error, status);
}
