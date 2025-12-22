import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let username: string | null = null;
    let password: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    // JIKA FORM DATA
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      username = formData.get("username") as string | null;
      password = formData.get("password") as string | null;
    }
    // JIKA JSON
    else if (contentType.includes("application/json")) {
      const body = await req.json();
      username = body.username;
      password = body.password;
    }

    // VALIDASI INPUT
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    // CEK TEKNISI
    const [rows]: any = await db.query(
      "SELECT * FROM `user` WHERE username = ? AND role = 'teknisi'",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Teknisi tidak ditemukan" },
        { status: 404 }
      );
    }

    const teknisi = rows[0];

    // CEK PASSWORD (sementara plaintext)
    if (String(password).trim() !== String(teknisi.password).trim()) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login teknisi berhasil",
    });

    // PENTING 
    // HAPUS COOKIE ROLE LAIN (CEGAH LOOP)
    response.cookies.set("user_id", "", { path: "/", maxAge: 0 });
    response.cookies.set("user_role", "", { path: "/", maxAge: 0 });
    response.cookies.set("admin_id", "", { path: "/", maxAge: 0 });
    response.cookies.set("admin_role", "", { path: "/", maxAge: 0 });

    // SET COOKIE TEKNISI (WAJIB httpOnly)
    response.cookies.set("teknisi_id", String(teknisi.id), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    response.cookies.set("teknisi_role", "teknisi", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
