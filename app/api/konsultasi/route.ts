export const runtime = "nodejs";

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  let db;
  try {
    const formData = await req.formData();
    const userId = formData.get("user_id") as string;
    const perangkat = formData.get("perangkat") as string;
    const pesan = formData.get("pesan") as string;
    const file = formData.get("foto");

    if (!userId || !perangkat || !pesan ) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    if (file && !(file instanceof File)) {
      return NextResponse.json(
        { message: "File tidak valid" },
        { status: 400 }
      );
    }

   db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "lapcare", 
    });

        const [rows]: any = await db.execute(
          "SELECT username, no_tlp FROM user WHERE id = ?",
          [userId]
        );
    
        if (!rows || rows.length === 0) {
          return NextResponse.json(
            { message: "User tidak ditemukan" },
            { status: 404 }
          );
        }
    
        const nama = rows[0].username;
        const nomorHP = rows[0].no_tlp;
    
        let fileName: string | null = null;
        const uploadDir = path.join(process.cwd(), "public/uploads");
    
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
    
        if (file instanceof File) {
          const buffer = Buffer.from(await file.arrayBuffer());
          fileName = `${Date.now()}-${file.name}`;
          await writeFile(path.join(uploadDir, fileName), buffer);
        }

    

    await db.execute(
      `INSERT INTO konsultasi (nama, nomorHP, perangkat, pesan, foto) VALUES (?, ?, ?, ?, ?)`,
      [nama, nomorHP, perangkat, pesan, fileName]
    );

    await db.end();

    return NextResponse.json({
      message: "Permintaan mu sudah terkirim, Kami akan segera menghubungi anda",
      data: {
        nama,
        nomorHP,
        perangkat,
        pesan,
        foto: fileName ? `/uploads/${fileName}` : null,
      },
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        message: "Terjadi kesalahan server",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
