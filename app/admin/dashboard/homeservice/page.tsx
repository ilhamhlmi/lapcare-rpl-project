"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/app/components/AdminSidebar";

interface HomeService {
  id: number;
  nama: string;
  perangkat: string;
  alamat_lengkap: string;
  nomor_hp: string;
  tanggal: string;
  kendala: string;
  foto: string | null;
  created_at: string;
}

export default function HomeServiceTable() {
  const [data, setData] = useState<HomeService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeServiceTable = async () => {
      try {
        const res = await fetch("/api/servicehome");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeServiceTable();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4 font-poppins text-darkb">
          Data Home Service
        </h1>

        <div className="overflow-x-auto rounded-xl shadow bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Tanggal Dibuat</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Perangkat</th>
                <th className="px-4 py-3">Alamat Lengkap</th>
                <th className="px-4 py-3">Nomor Cadangan</th>
                <th className="px-4 py-3">Permintaan Layanan</th>
                <th className="px-4 py-3">Pesan</th>
                <th className="px-4 py-3">Foto</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-4 py-6 text-center">
                    Memuat data...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-6 text-center">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                data.map((home_service, index) => (
                  <tr key={home_service.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <h1>{index + 1}</h1>
                    </td>
                    <td className="px-4 py-3">
                      <h1>
                        {new Date(home_service.created_at).toLocaleDateString("id-ID")}
                      </h1>
                    </td>
                    <td className="px-4 py-3">
                      <h1>{home_service.nama}</h1>
                    </td>
                    <td className="px-4 py-3">
                      <h1>{home_service.perangkat}</h1>
                    </td>
                    <td className="px-4 py-3">
                      <h1>{home_service.alamat_lengkap}</h1>
                    </td>
                    <td className="px-4 py-3">
                      <h1>{home_service.nomor_hp}</h1>
                    </td>
                    <td className="px-4 py-3">
                    <h1>
                        {new Date(home_service.tanggal).toLocaleDateString("id-ID")}
                    </h1>
                    </td>
                    <td className="px-4 py-3">
                      <h1>{home_service.kendala}</h1>
                    </td>
                    <td className="px-4 py-3">
                      {home_service.foto ? (
                        <img
                          src={`/uploads/${home_service.foto}`}
                          alt="Foto"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <h1 className="border text-center rounded-md border-orange-500 bg-orange-500 text-white">
                        Diproses
                      </h1>
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
