import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // SESSION USER
  const userId = request.cookies.get("user_id")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  // SESSION ADMIN
  const adminId = request.cookies.get("admin_id")?.value;
  const adminRole = request.cookies.get("admin_role")?.value;

  /*USER PROTECTED ROUTES */
  const userProtectedRoutes = [
    "/guide",
    "/konsultasi",
    "/userProfile",
    "/homeService",
  ];

  if (userProtectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!userId || userRole !== "user") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // User login page → redirect jika sudah login
  if (pathname === "/login" && userId && userRole === "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /*ADMIN ROUTES */
  if (pathname.startsWith("/admin")) {
    // Admin login page boleh diakses
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Selain login → wajib login admin
    if (!adminId || adminRole !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

/*MATCHER */
export const config = {
  matcher: [
    "/guide/:path*",
    "/konsultasi/:path*",
    "/homeService/:path*",
    "/userProfile/:path*",
    "/login",
    "/admin/:path*",
  ],
};
