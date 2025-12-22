import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";

/*  GET → data untuk form*/
export async function GET() {
  try {
    const cookieStore = await cookies();
    const teknisiId = cookieStore.get("teknisi_id")?.value;

    if (!teknisiId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ambil username teknisi login
    const [teknisiRows]: any = await db.query(
      "SELECT username FROM user WHERE id = ? AND role = 'teknisi'",
      [teknisiId]
    );

    if (!teknisiRows || teknisiRows.length === 0) {
      return NextResponse.json(
        { message: "Akun bukan teknisi" },
        { status: 403 }
      );
    }

    // ambil home service terbaru
    const [homeServiceRows]: any = await db.query(
      `
      SELECT id, nama
      FROM home_service
      ORDER BY id DESC
      LIMIT 1
      `
    );

    if (!homeServiceRows || homeServiceRows.length === 0) {
      return NextResponse.json(
        { message: "Home service tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      home_service_id: homeServiceRows[0].id,
      username_customer: homeServiceRows[0].nama,
      username_teknisi: teknisiRows[0].username,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

/*  POST → simpan laporan */
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const teknisiId = cookieStore.get("teknisi_id")?.value;

    if (!teknisiId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [teknisiRows]: any = await db.query(
      "SELECT username FROM user WHERE id = ? AND role = 'teknisi'",
      [teknisiId]
    );

    if (!teknisiRows || teknisiRows.length === 0) {
      return NextResponse.json(
        { message: "Akses ditolak" },
        { status: 403 }
      );
    }

    const teknisiUsername = teknisiRows[0].username;

    const formData = await req.formData();
    const homeServiceId = formData.get("home_service_id") as string;
    const detailKerusakan = formData.get("detail_kerusakan") as string;
    const ongkosPerbaikan = formData.get("ongkos_perbaikan") as string;
    const biayaSparepart = formData.get("biaya_sparepart") as string;

    if (!homeServiceId || !detailKerusakan || !ongkosPerbaikan) {
      return NextResponse.json(
        { message: "Data wajib belum lengkap" },
        { status: 400 }
      );
    }

    const [homeServiceRows]: any = await db.query(
      "SELECT nama FROM home_service WHERE id = ?",
      [homeServiceId]
    );

    if (!homeServiceRows || homeServiceRows.length === 0) {
      return NextResponse.json(
        { message: "Home service tidak ditemukan" },
        { status: 404 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    let buktiSparepartPath: string | null = null;
    let buktiPembayaranPath: string | null = null;

    const sparepart = formData.get("bukti_pembelian_sparepart") as File | null;
    if (sparepart && sparepart.size > 0) {
      const buffer = Buffer.from(await sparepart.arrayBuffer());
      const name = `sparepart_${Date.now()}_${sparepart.name}`;
      await fs.writeFile(path.join(uploadDir, name), buffer);
      buktiSparepartPath = `/uploads/${name}`;
    }

    const pembayaran = formData.get("bukti_pembayaran_customer") as File | null;
    if (pembayaran && pembayaran.size > 0) {
      const buffer = Buffer.from(await pembayaran.arrayBuffer());
      const name = `pembayaran_${Date.now()}_${pembayaran.name}`;
      await fs.writeFile(path.join(uploadDir, name), buffer);
      buktiPembayaranPath = `/uploads/${name}`;
    }

    await db.execute(
      `
      INSERT INTO laporan_teknisi (
        home_service_id,
        username_customer,
        username_teknisi,
        detail_kerusakan,
        ongkos_perbaikan,
        biaya_sparepart,
        bukti_pembelian_sparepart,
        bukti_pembayaran_customer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        homeServiceId,
        homeServiceRows[0].nama,
        teknisiUsername,
        detailKerusakan,
        ongkosPerbaikan,
        biayaSparepart || 0,
        buktiSparepartPath,
        buktiPembayaranPath,
      ]
    );

    return NextResponse.json(
      { message: "Laporan teknisi berhasil disimpan" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
