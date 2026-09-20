import { NextResponse, type NextRequest } from "next/server.js";

const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const originExemptPaths = new Set(["/api/payments/callback"]);

export function isJsonContentType(value: string | null) {
  if (!value) return false;
  return value.split(";", 1)[0]?.trim().toLowerCase() === "application/json";
}

export function expectedRequestOrigin(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",", 1)[0]?.trim();
  const host = forwardedHost || request.headers.get("host") || request.nextUrl.host;
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",", 1)[0]?.trim().toLowerCase();
  const protocol = forwardedProtocol === "http" || forwardedProtocol === "https" ? forwardedProtocol : request.nextUrl.protocol.slice(0, -1);
  if (!host || (protocol !== "http" && protocol !== "https")) return null;

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/") || !unsafeMethods.has(request.method)) {
    return NextResponse.next();
  }

  if (!isJsonContentType(request.headers.get("content-type"))) {
    return NextResponse.json({ ok: false, error: "Content-Type must be application/json" }, { status: 415 });
  }

  if (!originExemptPaths.has(request.nextUrl.pathname)) {
    const expectedOrigin = expectedRequestOrigin(request);
    let receivedOrigin: string;
    try {
      const rawOrigin = request.headers.get("origin");
      if (!rawOrigin) throw new Error("missing origin");
      receivedOrigin = new URL(rawOrigin).origin;
    } catch {
      return NextResponse.json({ ok: false, error: "A valid Origin header is required" }, { status: 403 });
    }

    if (!expectedOrigin || receivedOrigin !== expectedOrigin) {
      return NextResponse.json({ ok: false, error: "Cross-origin request rejected" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*"
};
