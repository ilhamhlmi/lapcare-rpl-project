import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("sessionLogin", "", {
    path: "/",
    maxAge: 0, // HAPUS TOTAL
  });

  return res;
}
