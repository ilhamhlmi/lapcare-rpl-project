"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

export default function LaporanTeknisi() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [fileNameSparepart, setFileNameSparepart] = useState("Belum ada file");
  const [fileNamePembayaran, setFileNamePembayaran] = useState("Belum ada file");

  const [home_service_id, setHomeServiceId] = useState("");
  const [username_customer, setUsernameCustomer] = useState("");
  const [username_teknisi, setUsernameTeknisi] = useState("");
  const [detail_kerusakan, setDetailKerusakan] = useState("");
  const [ongkos_perbaikan, setOngkosPerbaikan] = useState("");
  const [biaya_sparepart, setBiayaSparepart] = useState("");

  const [bukti_pembelian_sparepart, setBuktiPembelianSparepart] =
    useState<File | null>(null);
  const [bukti_pembayaran_customer, setBuktiPembayaranCustomer] =
    useState<File | null>(null);

  useEffect(() => {
    fetch("/api/laporan-homeservice", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setHomeServiceId(String(data.home_service_id ?? ""));
        setUsernameCustomer(data.username_customer ?? "");
        setUsernameTeknisi(data.username_teknisi ?? "");
      })
      .catch(() => toast.error("Gagal mengambil data"));
  }, []);

  const handleSubmit = async () => {
    if (!home_service_id || !detail_kerusakan || !ongkos_perbaikan) {
      toast.error("Field wajib belum lengkap");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("home_service_id", home_service_id);
      formData.append("detail_kerusakan", detail_kerusakan);
      formData.append("ongkos_perbaikan", ongkos_perbaikan);
      formData.append("biaya_sparepart", biaya_sparepart);

      if (bukti_pembelian_sparepart) {
        formData.append(
          "bukti_pembelian_sparepart",
          bukti_pembelian_sparepart
        );
      }

      if (bukti_pembayaran_customer) {
        formData.append(
          "bukti_pembayaran_customer",
          bukti_pembayaran_customer
        );
      }

      const res = await fetch("/api/laporan-homeservice", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Laporan berhasil dikirim");
    } catch {
      toast.error("Terjadi kesalahan server");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logoutTeknisi", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/teknisi/login";
  };

  return (
    <section className="bg-darkb pt-16 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="text-center mb-5">
          <h1 className="font-poppins text-3xl text-white">
            Laporan Teknisi
          </h1>
        </div>

        <div className="flex justify-center">
          <input
            value={home_service_id}
            readOnly
            className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3 text-white bg-transparent"
            placeholder="ID Home Service"
          />
        </div>

        <div className="flex justify-center">
          <input
            value={username_customer}
            readOnly
            className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3 text-white bg-transparent"
            placeholder="Username Customer"
          />
        </div>

        <div className="flex justify-center">
          <input
            value={username_teknisi}
            readOnly
            className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3 text-white bg-transparent"
            placeholder="Username Teknisi"
          />
        </div>

        <div className="flex justify-center">
          <textarea
            value={detail_kerusakan}
            onChange={e => setDetailKerusakan(e.target.value)}
            placeholder="Detail Kerusakan"
            className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3 text-white bg-transparent"
          />
        </div>

        <div className="flex justify-center">
          <input
            value={ongkos_perbaikan}
            onChange={e => setOngkosPerbaikan(e.target.value)}
            placeholder="Ongkos & Biaya Perbaikan"
            className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3 text-white bg-transparent"
          />
        </div>

        <div className="flex justify-center">
          <input
            value={biaya_sparepart}
            onChange={e => setBiayaSparepart(e.target.value)}
            placeholder="Biaya Sparepart (Opsional)"
            className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3 text-white bg-transparent"
          />
        </div>

        <div className="flex justify-center mb-4">
          <label className="border-dashed border px-6 py-6 rounded-full w-3/4 xl:w-1/2 text-white cursor-pointer text-center">
            📤 Bukti Pembelian Sparepart
            <p className="text-sm mt-1">File: {fileNameSparepart}</p>
            <input
              type="file"
              hidden
              onChange={e => {
                if (e.target.files?.[0]) {
                  setBuktiPembelianSparepart(e.target.files[0]);
                  setFileNameSparepart(e.target.files[0].name);
                }
              }}
            />
          </label>
        </div>

        <div className="flex justify-center mb-4">
          <label className="border-dashed border px-6 py-6 rounded-full w-3/4 xl:w-1/2 text-white cursor-pointer text-center">
            📤 Bukti Pembayaran Customer
            <p className="text-sm mt-1">File: {fileNamePembayaran}</p>
            <input
              type="file"
              hidden
              onChange={e => {
                if (e.target.files?.[0]) {
                  setBuktiPembayaranCustomer(e.target.files[0]);
                  setFileNamePembayaran(e.target.files[0].name);
                }
              }}
            />
          </label>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            className="border rounded-full px-6 py-2 bg-primary text-white hover:bg-sky-500 duration-300"
          >
            Kirim
          </button>

          <button
            onClick={handleLogout}
            className="border rounded-full px-6 py-2 border-red-600 bg-red-600 hover:bg-red-800 duration-300 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
