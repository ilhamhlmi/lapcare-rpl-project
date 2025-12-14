"use client";
import { useState, useEffect } from "react";
import NavbarClient from "../components/NavbarClient";
import FooterClient from "../components/FooterClient";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

export default function Konsultasi() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const [fileName, setFileName] = useState("Belum ada file");
    const [userId, setUserId] = useState("");
    const [nama, setNama] = useState("");
    const [nomorHP, setNomorHP] = useState("");
    const [perangkat, setPerangkat] = useState("");
    const [pesan, setPesan] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

     useEffect(() => {
        fetch("/api/userProfile")
          .then((res) => res.json())
          .then((data) => {
            setUserId(String(data.id));
            setNama(data.username);
            setNomorHP(data.no_tlp);
            setLoadingUser(false);
          })
          .catch(() => {
            toast.error("Gagal mengambil data user");
            setLoadingUser(false);
          });
      }, []);

    const [form, setForm] = useState({
        nama: "",
        nomorHP: "",
        perangkat: "",
        pesan: "",
        foto: "",
    });

    const handleSubmit = async () => {

        if (!nama || !perangkat || !pesan || !file) {
            toast.error("Semua field wajib diisi!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("user_id", userId);
            formData.append("perangkat", perangkat);
            formData.append("pesan", pesan);
            formData.append("foto", file);

            const res = await fetch("/api/konsultasi", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error("Gagal mengirim: " + data.message);
                return;
            }

            toast.success(data.message);

            setPerangkat("");
            setPesan("");
            setFile(null);
            setFileName("Belum ada file");

        } catch (error) {
            toast.error("Terjadi kesalahan saat mengirim data");
        }
    };

    return (
        <div>
            <NavbarClient />

            <section className="bg-slate-200 pt-32 pb-12">
                <div className="container mx-auto text-center">
                    <div className="flex justify-center items-center mb-5">
                        <h1 className="text-darkb font-poppins text-2xl 2xl:text-3xl font-semibold border-b pb-5 border-secondary text-center">
                            Konsultasi
                        </h1>
                    </div>
                    <div className="flex justify-center items-center px-4">
                        <p className="text-darkb text-center text-2xl xl:text-4xl font-poppins">
                            Beritahu kami kendala mu, kami akan segera menghubungi Anda
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full flex items-center bg-slate-200 pb-16">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center text-center">

                        <div className="w-full flex items-center justify-center">
                            <input
                                type="text"
                                className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb w-3/4 xl:w-1/2 mb-3"
                                placeholder="Nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <input
                                type="text"
                                className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb w-3/4 xl:w-1/2 mb-3"
                                placeholder="Nomor Telepon"
                                value={nomorHP}
                                onChange={(e) => setNomorHP(e.target.value)}
                            />
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <input
                                type="text"
                                className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb w-3/4 xl:w-1/2 mb-3"
                                placeholder="Perangkat"
                                value={perangkat}
                                onChange={(e) => setPerangkat(e.target.value)}
                            />
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <textarea
                                className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb w-3/4 xl:w-1/2 mb-3"
                                placeholder="Tulis kendala yang kamu alami"
                                value={pesan}
                                onChange={(e) => setPesan(e.target.value)}
                            />
                        </div>

                        <div className="w-full flex items-center justify-center mb-3">
                            <label
                                htmlFor="uploadFoto"
                                className="flex items-center justify-center border border-dashed border-darkb rounded-full w-3/4 xl:w-1/2 px-4 py-3 font-poppins text-darkb cursor-pointer hover:border-sky-hover:text-sky-600 hover:shadow transition"
                            >
                                <span className="flex flex-col items-center space-y-2">
                                    <span>📤</span>
                                    <h1>Upload Foto Kendala</h1>
                                    {fileName && (
                                        <p className="text-darkb font-poppins text-sm mt-[-10px] mb-3 text-center">
                                            File dipilih: {fileName}
                                        </p>
                                    )}
                                </span>
                            </label>

                            <input
                                id="uploadFoto"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setFile(e.target.files[0]);
                                        setFileName(e.target.files[0].name);
                                    }
                                }}
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button
                                onClick={handleSubmit}
                                className="border rounded-full px-6 py-2 font-poppins border-primary bg-primary text-white cursor-pointer hover:bg-sky-500 hover:border-sky-500 shadow-md hover:shadow-2xl duration-300"
                            >
                                Kirim
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            <FooterClient />
        </div>
    );
}
