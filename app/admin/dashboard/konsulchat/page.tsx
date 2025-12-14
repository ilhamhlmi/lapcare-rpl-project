"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/app/components/AdminSidebar";

interface KonsulTable {
    id: number;
    nama: string;
    nomorHP: string;
    perangkat: string;
    pesan: string;
    foto: string | null;
    created_at: string;
}

export default function KonsulTable() {
    const [KonsulTable, setKonsulTable] = useState<KonsulTable[]>([]);
        const [loading, setLoading] = useState(true);

            useEffect(() => {
        const fetchKonsulTable = async () => {
            try {
                const res = await fetch("/api/konsulchat");
                const data = await res.json();
                setKonsulTable(data);
            } catch (error) {
                console.error("Gagal mengambil data pengguna:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchKonsulTable();
    }, []);
    return (
        <div className="flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Konten */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold mb-4 font-poppins text-darkb">Data Konsultasi</h1>

                <div className="overflow-x-auto rounded-xl shadow bg-white">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">Tanggal Dibuat</th>
                                <th className="px-4 py-3">Username</th>
                                <th className="px-4 py-3">Perangkat</th>
                                <th className="px-4 py-3">Pesan</th>
                                <th className="px-4 py-3">Foto</th>
                                <th className="px-4 py-3">No. Telp</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center">
                                        Memuat data...
                                    </td>
                                </tr>
                            ) : KonsulTable.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center">
                                        Data pengguna tidak tersedia
                                    </td>
                                </tr>
                            ) : (
                                KonsulTable.map((konsultasi, index) => (
                                    <tr key={konsultasi.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <h1>{index + 1}</h1>
                                        </td>
                                        <td className="px-4 py-3">
                                            <h1>
                                                {new Date(konsultasi.created_at).toLocaleDateString("id-ID")}
                                            </h1>
                                        </td>
                                        <td className="px-4 py-3">
                                            <h1>{konsultasi.nama}</h1>
                                        </td>
                                        <td className="px-4 py-3">
                                            <h1>{konsultasi.perangkat}</h1>
                                        </td>
                                        <td className="px-4 py-3">
                                            <h1>{konsultasi.pesan}</h1>
                                        </td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={`/uploads/${konsultasi.foto}`}
                                                alt="Foto Konsul"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <h1>{konsultasi.nomorHP}</h1>
                                        </td>
                                        <td className="px-4 py-3">
                                    <h1 className="border text-center rounded-md border-orange-500 bg-orange-500 text-white">Diproses</h1>
                                </td>

                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
