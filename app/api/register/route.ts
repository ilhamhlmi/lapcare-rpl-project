import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, no_tlp, username, password } = await req.json();

  if (!email || !no_tlp || !username || !password) {
    return NextResponse.json(
      { message: "Semua field wajib diisi" },
      { status: 400 }
    );
  }

  const [check]: any = await db.query(
    "SELECT id FROM users WHERE username = ? OR email = ?",
    [username, email]
  );

  if (check.length > 0) {
    return NextResponse.json(
      { message: "Username atau Email sudah terdaftar" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (email, no_tlp, username, password) VALUES (?, ?, ?, ?)",
    [email, no_tlp, username, hashedPassword]
  );

  return NextResponse.json({
    success: true,
    message: "Akun berhasil dibuat",
  });
}
