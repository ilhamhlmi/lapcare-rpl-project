import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // VALIDASI INPUT
  if (!username || !password) {
    return NextResponse.json(
      { message: "Username dan password wajib diisi" },
      { status: 400 }
    );
  }

  // CEK ADMIN
  const [admins]: any = await db.query(
    "SELECT * FROM `user` WHERE username = ? AND role = 'admin'",
    [username]
  );

  if (admins.length === 0) {
    return NextResponse.json(
      { message: "Admin tidak ditemukan" },
      { status: 404 }
    );
  }

  const admin = admins[0];

  // CEK PASSWORD (plain text)
  if (String(password).trim() !== String(admin.password).trim()) {
    return NextResponse.json(
      { message: "Password salah" },
      { status: 401 }
    );
  }

  // RESPONSE LOGIN
  const response = NextResponse.json({
    success: true,
    message: "Login admin berhasil",
  });

  // COOKIE ADMIN
  response.cookies.set("admin_id", String(admin.id), {
    httpOnly: false,
    path: "/admin",   // path khusus admin
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 hari
  });

  // ROLE ADMIN TERPISAH
  response.cookies.set("admin_role", "admin", {
    httpOnly: false,
    path: "/admin",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
