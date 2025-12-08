import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("sessionLogin")?.value;
  const { pathname } = request.nextUrl;

  // JEGAL SERVICES JIKA BELUM LOGIN
  if (!session && pathname.startsWith("/guide")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // JEGAL LOGIN JIKA SUDAH LOGIN
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/guide", request.url));
  }

  return NextResponse.next(); // INI WAJIB ADA
}

export const config = {
  matcher: ["/guide/:path*", "/login"],
};
