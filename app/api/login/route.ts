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

  // CEK USER
  const [users]: any = await db.query(
    "SELECT * FROM user WHERE username = ? AND role = 'user'",
    [username]
  );

  if (users.length === 0) {
    return NextResponse.json(
      { message: "User tidak ditemukan" },
      { status: 404 }
    );
  }

  const user = users[0];

  // CEK PASSWORD (plain text)
  if (String(password).trim() !== String(user.password).trim()) {
    return NextResponse.json(
      { message: "Password salah" },
      { status: 401 }
    );
  }

  // RESPONSE LOGIN
  const response = NextResponse.json({
    success: true,
    message: "Login user berhasil",
  });

  // COOKIE USER
  response.cookies.set("user_id", String(user.id), {
    httpOnly: false,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 hari
  });

  // ROLE USER TERPISAH
  response.cookies.set("user_role", "user", {
    httpOnly: false,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
