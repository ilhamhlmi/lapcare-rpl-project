import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("sessionLogin")?.value;
  const { pathname } = request.nextUrl;

  // daftar halaman yang wajib login
  const protectedRoutes = [
    "/guide",
    "/konsultasi",
    "/homeService"
  ];

  // CEK: kalau belum login dan menuju salah satu protected route
  if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // CEK: kalau sudah login dan mencoba buka /login
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/guide/:path*",
    "/konsultasi/:path*",
    "/homeService/:path*",
    "/login"
  ],
};
