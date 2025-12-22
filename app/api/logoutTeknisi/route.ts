import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // HAPUS SESSION ADMIN SAJA
  res.cookies.set("teknisi_id", "", {
    path: "/teknisi",
    maxAge: 0,
  });

  res.cookies.set("teknisi_role", "", {
    path: "/teknisi",
    maxAge: 0,
  });

  return res;
}
