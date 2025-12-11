import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "../../../lib/db";

export async function GET() {
  const cookieStore: ReturnType<typeof cookies> = cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const [rows]: any = await db.query(
    "SELECT email, username, no_tlp, password FROM user WHERE id = ?",
    [userId]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}
