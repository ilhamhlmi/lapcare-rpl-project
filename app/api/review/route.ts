import { NextResponse } from "next/server";
import mysql from "mysql2/promise";


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "lapcare",
});


export async function POST(req: Request) {
  try {
    const { name, job, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Nama dan pesan wajib diisi" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO reviews (name, job, message)
      VALUES (?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      name,
      job || null,
      message,
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: (result as any).insertId,
          name,
          job,
          message,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const query = `
      SELECT id, name, job, message, createdAt
      FROM reviews
      ORDER BY createdAt DESC
    `;

    const [rows] = await pool.execute(query);

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal mengambil data review" },
      { status: 500 }
    );
  }
}
