import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "Username dan password wajib diisi" }, { status: 400 });
  }

  const [users]: any = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (users.length === 0) {
    return NextResponse.json({ message: "Username tidak ditemukan" }, { status: 404 });
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ message: "Password salah" }, { status: 401 });
  }

  const response = NextResponse.json({
    success: true,
    message: "Login berhasil",
  });

  response.cookies.set("sessionLogin", "true", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",   // PENTING ANTI BUG
    maxAge: 60 * 60 * 24,
  });

  return response;
}
