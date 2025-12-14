"use client";
import { useState, useEffect } from "react";
import NavbarClient from "../components/NavbarClient";
import FooterClient from "../components/FooterClient";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

export default function HomeService() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [fileName, setFileName] = useState("Belum ada file");
  const [userId, setUserId] = useState("");
  const [nama, setNama] = useState("");
  const [nomor_hp, setNomor_hp] = useState("");
  const [perangkat, setPerangkat] = useState("");
  const [alamat_lengkap, setAlamat_lengkap] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [kendala, setKendala] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    fetch("/api/userProfile")
      .then((res) => res.json())
      .then((data) => {
        setUserId(String(data.id));
        setNama(data.username);
        setNomor_hp(data.no_tlp);
        setLoadingUser(false);
      })
      .catch(() => {
        toast.error("Gagal mengambil data user");
        setLoadingUser(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (
      !userId ||
      !perangkat ||
      !alamat_lengkap ||
      !tanggal ||
      !kendala ||
      !file
    ) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("perangkat", perangkat);
      formData.append("alamat_lengkap", alamat_lengkap);
      formData.append("tanggal", tanggal);
      formData.append("kendala", kendala);
      formData.append("foto", file);

      const res = await fetch("/api/homeService", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      setPerangkat("");
      setAlamat_lengkap("");
      setTanggal("");
      setKendala("");
      setFile(null);
      setFileName("Belum ada file");

    } catch {
      toast.error("Terjadi kesalahan server");
    }
  };

 return (
    <div>
      <NavbarClient />

      <section className="bg-slate-200 pt-32 pb-12">
        <div className="container mx-auto">
          <div className="flex justify-center items-center mb-5">
            <h1 className="text-darkb font-poppins text-2xl 2xl:text-3xl font-semibold border-b pb-5 border-secondary text-center">
              Home Service
            </h1>
          </div>
          <div className="flex justify-center items-center px-4">
            <p className="text-darkb text-center text-2xl xl:text-4xl font-poppins">
              Kami siap datang ke tempat Anda. Silahkan isi informasi berikut
            </p>
          </div>
        </div>
      </section>

      <section className="w-full flex items-center bg-slate-200 pb-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center text-center">

            <input
              type="text"
              className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3"
              value={nama}
              readOnly
            />

            <input
              type="text"
              className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3"
              placeholder="Perangkat"
              value={perangkat}
              onChange={(e) => setPerangkat(e.target.value)}
            />

            <input
              type="text"
              className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3"
              placeholder="Alamat Lengkap"
              value={alamat_lengkap}
              onChange={(e) => setAlamat_lengkap(e.target.value)}
            />

            <input
              type="text"
              className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3"
              value={nomor_hp}
              readOnly
            />

            <input
              type="date"
              className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />

            <textarea
              className="border px-4 py-2 rounded-full w-3/4 xl:w-1/2 mb-3"
              placeholder="Tulis kendala yang kamu alami"
              value={kendala}
              onChange={(e) => setKendala(e.target.value)}
            />

            <label
              htmlFor="uploadFoto"
              className="flex items-center justify-center border border-dashed border-darkb rounded-full w-3/4 xl:w-1/2 px-4 py-3 cursor-pointer"
            >
              <span className="flex flex-col items-center">
                <span>📤</span>
                <h1>Upload Foto Kendala</h1>
                <p className="text-sm">File dipilih: {fileName}</p>
              </span>
            </label>

            <input
              id="uploadFoto"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                }
              }}
            />

            <button
              disabled={loadingUser}
              onClick={handleSubmit}
              className="mt-5 px-6 py-2 rounded-full bg-primary text-white disabled:opacity-50"
            >
              Kirim
            </button>

          </div>
        </div>
      </section>

      <FooterClient />
    </div>
  );
}

