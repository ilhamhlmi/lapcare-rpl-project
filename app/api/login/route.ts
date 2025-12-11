import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username dan password wajib diisi" },
      { status: 400 }
    );
  }

  const [users]: any = await db.query(
    "SELECT * FROM user WHERE username = ?",
    [username]
  );

  if (users.length === 0) {
    return NextResponse.json(
      { message: "Username tidak ditemukan" },
      { status: 404 }
    );
  }

  const user = users[0];

  // PLAIN CHECK — TANPA BCRYPT
  if (String(password).trim() !== String(user.password).trim()) {
    return NextResponse.json(
      { message: "Password salah" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: "Login berhasil",
  });

  // SAVE USER ID IN COOKIE
  response.cookies.set("user_id", String(user.id), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  // Optional: sessionLogin
  response.cookies.set("sessionLogin", "true", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}