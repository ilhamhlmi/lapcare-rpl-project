import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  //  USER SESSION 
  const userId = request.cookies.get("user_id")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  //  ADMIN SESSION 
  const adminId = request.cookies.get("admin_id")?.value;
  const adminRole = request.cookies.get("admin_role")?.value;

  // TEKNISI SESSION 
  const teknisiId = request.cookies.get("teknisi_id")?.value;
  const teknisiRole = request.cookies.get("teknisi_role")?.value;

  //  USER PROTECTED 
  const userRoutes = [
    "/guide",
    "/konsultasi",
    "/userProfile",
    "/homeService",
  ];

  if (userRoutes.some(r => pathname === r || pathname.startsWith(r + "/"))) {
    if (!userId || userRole !== "user") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname === "/login" && userId && userRole === "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //  ADMIN
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (!adminId || adminRole !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  //  TEKNISI 
  if (pathname === "/teknisi" || pathname.startsWith("/teknisi/")) {
    if (pathname === "/teknisi/login") {
      return NextResponse.next();
    }

    if (!teknisiId || teknisiRole !== "teknisi") {
      return NextResponse.redirect(new URL("/teknisi/login", request.url));
    }
  }

  return NextResponse.next();
}

//  MATCHER 
export const config = {
  matcher: [
    "/guide/:path*",
    "/konsultasi/:path*",
    "/homeService/:path*",
    "/userProfile/:path*",
    "/login",
    "/admin/:path*",
    "/teknisi/:path*",
  ],
};
