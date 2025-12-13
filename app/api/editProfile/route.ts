import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "../../../lib/db";


export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const [rows]: any = await db.query(
    "SELECT username, email, no_tlp, password FROM user WHERE id = ?",
    [userId]
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}


export async function PUT(req: Request) {
  const body = await req.json();
  const { username, email, no_tlp, password } = body;

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    
    if (!password || password.trim() === "") {
      await db.query(
        "UPDATE user SET username=?, email=?, no_tlp=?, password=? WHERE id=?",
        [username, email, no_tlp, password, userId]
      );
    } else {

      await db.query(
        "UPDATE user SET username=?, email=?, no_tlp=?, password=? WHERE id=?",
        [username, email, no_tlp, password, userId]
      );
    }

    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}
