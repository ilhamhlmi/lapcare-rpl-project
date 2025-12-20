"use client"

import Image from "next/image";
import Link from "next/link";
import NavbarClient from "./components/NavbarClient";
import FooterClient from "./components/FooterClient";

import hero from "@/assets/hero/hero.png"

import house from "@/assets/layanan/house.png"
import info from "@/assets/layanan/info.png"
import chatServices from "@/assets/layanan/online-chat.png"

import userMale from "@/assets/review/user2.svg"
import userFemale from "@/assets/review/userFemale.svg"

import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Home() {

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/review");
        const json = await res.json();
        setReviews(json.data);
      } catch (error) {
        console.error("Gagal mengambil review", error);
      }
    };

    fetchReviews();
  }, []);


  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState<any[]>([]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);


    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, job, message }),
      });

      if (!res.ok) {
        alert("Gagal mengirim ulasan");
        return;
      }

      alert("Ulasan berhasil dikirim!");
      setName("");
      setJob("");
      setMessage("");
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <NavbarClient />

      <section id="hero" className="h-screen w-full flex items-center pt-16">
        <Image src={hero} alt="hero" fill className="object-cover -z-10 inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-darkb/85 via-darkb/90 to-darkb -z-10" />
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-5">
            <h1 className="font-poppins text-7xl font-semibold px-4 lg:text-9xl mb-5 text-white">Lap<span className="text-transparent bg-clip-text bg-gradient-to-tr from-sky-500 to-sky-300">Care</span></h1>
            <p className="max-w-sm lg:max-w-2xl px-4 text-md lg:text-lg font-poppins text-white">Selamat datang di <span className="font-semibold">LapCare</span>, platform konsultasi dan informasi seputar laptop dan komputer.</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-3 mb-5">
            <Link href="/guide" className="border font-poppins px-10 py-2 rounded-full text-white bg-transparent border-white cursor-pointer hover:bg-white hover:text-darkb transition duration-300">
              Cari Panduan
            </Link>
            <Link href="/konsultasi" className="border font-poppins px-8 py-2 rounded-full text-white bg-primary border-primary cursor-pointer hover:bg-sky-700 hover:border-sky-700 transition duration-300">
              Konsultasi Sekarang
            </Link>
          </div>
          <div className="flex justify-center space-x-5 lg:space-x-12">
            <a href="" className="text-secondary border p-3 rounded-full hover:bg-primary hover:border hover:border-primary hover:text-white duration-300">
              <svg className="fill-current" width={30} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg>
            </a>
            <a href="" className="text-secondary border rounded-full p-3 hover:text-white hover:border-primary hover:bg-primary duration-300">
              <svg width={30} className="fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gmail</title><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" /></svg>
            </a>
            <a href="" className="text-secondary border p-3 rounded-full hover:bg-primary hover:border hover:border-primary hover:text-white duration-300">
              <svg width={30} className="fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            </a>
          </div>
        </div>
      </section>

      <section id="layanan" className="w-full flex items-center pt-16 pb-16 bg-slate-200">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <h1 className="font-poppins text-3xl 2xl:text-4xl text-darkb border-b pb-5 border-secondary font-semibold" data-aos="fade-up">Layanan Kami</h1>
          </div>
          <div className="flex justify-center items-center mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-10 2xl:gap-x-20">
              <div className="border border-darkb flex-col justify-items-center text-center space-y-4 px-8 py-5 rounded-xl shadow-xl bg-white/5 backdrop-blur-md" data-aos="fade-up">
                <Image src={info} alt="info" className="w-[125px]" />
                <h1 className="text-darkb font-poppins max-w-[225px]">Panduan Dasar Laptop & Komputer</h1>
                <Link href="/guide" className="border px-3 py-1 rounded-full font-poppins text-white bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer">Lihat Panduan</Link>
              </div>
              <div className="border border-darkb flex-col justify-items-center text-center space-y-4 px-8 py-5 rounded-xl shadow-xl bg-white/5 backdrop-blur-md" data-aos="fade-up">
                <Image src={chatServices} alt="info" className="w-[125px]" />
                <h1 className="text-darkb font-poppins max-w-[225px]">Konsultasi Chat Online Dengan Teknisi Kami</h1>
                <Link href="/konsultasi" className="border px-3 py-1 rounded-full font-poppins text-white bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer">Konsultasi Sekarang</Link>
              </div>
              <div className="border border-darkb flex-col justify-items-center text-center space-y-4 px-8 py-5 rounded-xl shadow-xl bg-white/5 backdrop-blur-md" data-aos="fade-up">
                <Image src={house} alt="info" className="w-[125px]" />
                <h1 className="text-darkb font-poppins max-w-[225px]">Panggil Teknisi Kami Ke Rumah Anda</h1>
                <Link href="/homeService" className="border px-3 py-1 rounded-full font-poppins text-white bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer">Pesan Layanan</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="w-full flex items-center bg-slate-200 pt-16 pb-16 px-4 lg:px-6">
        <div className="container mx-auto bg-gradient-to-tl from-[#1d293d] via-[#23385e] to-[#3b82f6] border-secondary border rounded-2xl pt-12 pb-12" data-aos="fade-up">
          <div className="flex justify-center items-center">
            <h1 className="font-poppins text-3xl 2xl:text-4xl text-white border-b pb-5 border-secondary font-semibold text-center max-w-[300px] lg:max-w-none mb-8">Pertanyaan Umum Dari Pengguna</h1>
          </div>
          <div className="bg-white/5 shadow-lg backdrop-blur-md w-[350px] lg:w-3xl 2xl:w-4xl flex-col justify-items-center mx-auto rounded-lg border border-secondary text-center divide-y divide-white mb-8 text-white">
            <details className="py-4 w-full border-secondary">
              <summary className="text-lg font-poppins lg:text-xl 2xl:text-2xl cursor-pointer">Mengapa Laptop Saya Terasa Lambat atau Lemot?</summary>
              <p className="text-md lg:text-lg 2xl:text-xl text-justify px-6 mt-2">Laptop yang terasa lemot biasanya disebabkan oleh terlalu banyak aplikasi yang berjalan, kapasitas penyimpanan hampir penuh, atau spesifikasi hardware yang sudah tidak memadai untuk kebutuhan saat ini. Selain itu, virus atau malware juga bisa membuat performa laptop menurun drastis. Laptop lama yang masih menggunakan hard disk (HDD) juga cenderung lebih lambat dibandingkan laptop dengan SSD. Perawatan rutin seperti membersihkan file tidak perlu, menghapus aplikasi berat, atau upgrade hardware dapat membantu mengatasi masalah ini.</p>
            </details>
            <details className="py-4 w-full border-secondary">
              <summary className="text-lg font-poppins lg:text-xl 2xl:text-2xl cursor-pointer">Kenapa Laptop Cepat Panas?</summary>
              <p className="text-md lg:text-lg 2xl:text-xl text-justify px-6 mt-2">Laptop yang cepat panas umumnya disebabkan oleh debu yang menumpuk di dalam kipas dan ventilasi, sehingga sirkulasi udara menjadi buruk. Penggunaan laptop di permukaan empuk seperti kasur juga dapat menghambat pembuangan panas. Selain itu, pemakaian aplikasi berat dalam waktu lama dapat membuat prosesor bekerja lebih keras dan menghasilkan panas berlebih. Jika dibiarkan, kondisi ini dapat merusak komponen internal laptop.</p>
            </details>
            <details className="py-4 w-full border-secondary">
              <summary className="text-lg font-poppins lg:text-xl 2xl:text-2xl cursor-pointer">Mengapa Suara Kipas Laptop Sangat Kencang</summary>
              <p className="text-md lg:text-lg 2xl:text-xl text-justify px-6 mt-2">Suara kipas yang berisik biasanya muncul karena suhu laptop terlalu tinggi, sehingga kipas bekerja ekstra untuk mendinginkan komponen di dalamnya. Penyebab lainnya bisa karena debu yang menumpuk, kipas yang sudah aus, atau pengaturan sistem yang tidak optimal. Meski terdengar sepele, kipas yang terus bekerja keras menandakan laptop membutuhkan pengecekan lebih lanjut.</p>
            </details>
            <details className="py-4 w-full border-secondary">
              <summary className="text-lg font-poppins lg:text-xl 2xl:text-2xl cursor-pointer">Kenapa Baterai Laptop Cepat Habis?</summary>
              <p className="text-md lg:text-lg 2xl:text-xl text-justify px-6 mt-2">Baterai laptop yang cepat habis umumnya terjadi karena usia baterai yang sudah menurun, penggunaan aplikasi berat, atau pengaturan daya yang kurang efisien. Baterai laptop memang memiliki umur pakai, sehingga seiring waktu kemampuannya menyimpan daya akan berkurang. Jika baterai sudah sangat boros, penggantian baterai biasanya menjadi solusi terbaik.</p>
            </details>
            <details className="py-4 w-full border-secondary">
              <summary className="text-lg font-poppins lg:text-xl 2xl:text-2xl cursor-pointer">Mengapa Laptop/PC Tidak Dapat Terhubung ke Wi-Fi?</summary>
              <p className="text-md lg:text-lg 2xl:text-xl text-justify px-6 mt-2">Masalah koneksi Wi-Fi sering disebabkan oleh driver jaringan yang bermasalah, pengaturan sistem yang keliru, atau gangguan pada perangkat keras jaringan. Terkadang, pembaruan sistem yang tidak sempurna juga dapat memengaruhi koneksi internet. Pemeriksaan software dan hardware diperlukan untuk memastikan sumber masalahnya.</p>
            </details>
            <details className="py-4 w-full border-secondary">
              <summary className="text-lg font-poppins lg:text-xl 2xl:text-2xl cursor-pointer">Mengapa Laptop/PC Sangat Lama Untuk Dihidupkan?</summary>
              <p className="text-md lg:text-lg 2xl:text-xl text-justify px-6 mt-2">Laptop yang lama saat dinyalakan biasanya disebabkan oleh terlalu banyak program yang berjalan otomatis saat startup, sistem operasi yang berat, atau penggunaan HDD lama. Kondisi ini membuat laptop membutuhkan waktu lebih lama untuk siap digunakan. Membersihkan program startup atau upgrade ke SSD dapat mempercepat proses booting secara signifikan.</p>
            </details>
            <details className="py-4 w-full border-secondary">
              <summary className="text-lg font-poppins lg:text-xl 2xl:text-2xl cursor-pointer">Kenapa Laptop Tidak Bisa Mengisi Baterai?</summary>
              <p className="text-md lg:text-lg 2xl:text-xl text-justify px-6 mt-2">Laptop yang tidak bisa mengisi baterai dapat disebabkan oleh charger yang rusak, port charger longgar, baterai bermasalah, atau kerusakan pada komponen internal. Masalah ini sebaiknya segera ditangani karena berkaitan langsung dengan daya listrik dan keamanan perangkat.</p>
            </details>
          </div>
          <div className="flex justify-center">
            <h3 className="font-poppins text-sm lg:text-md text-white">Punya Pertanyaan Lain? <span className="underline text-white"><Link href="/konsultasi">Konsultasi Sekarang</Link></span></h3>
          </div>
        </div>
      </section>

      <section className="w-full flex items-center bg-slate-200">
        <div className="max-w-screen mx-auto">
          <div className="flex justify-center items-center" data-aos="fade-up">
            <h1 className="font-poppins text-3xl 2xl:text-4xl text-darkb border-b pb-5 border-secondary font-semibold text-center max-w-[300px] lg:max-w-none mb-8">
              Kata Mereka Tentang LapCare
            </h1>
          </div>
          <div className="overflow-hidden w-full">
            <div className="marquee-track py-5">
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={`${review.id ?? index}-${index}`}
                  className="min-w-[330px] mr-6 border border-darkb rounded-xl flex items-center px-5 py-3 bg-slate-100 hover:scale-[1.05] hover:bg-white transition duration-200 hover:shadow-md cursor-pointer">
                  <Image src={index % 2 === 0 ? userMale : userFemale} alt="userLogo" width={65} height={65} className="border border-secondary bg-primary rounded-full mr-5"/>
                  <div>
                    <h1 className="text-darkb font-poppins font-semibold text-md">
                      {review.name}
                    </h1>
                    {review.job && (
                      <h2 className="text-secondary font-poppins text-sm">
                        {review.job}
                      </h2>
                    )}
                    <p className="text-darkb font-poppins text-sm">
                      “{review.message}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex items-center bg-slate-200 pt-16 pb-16 px-4 lg:px-6">
        <div className="container mx-auto bg-gradient-to-b from-[#1d293d] via-[#23385e] to-[#3b82f6] border border-secondary rounded-2xl pt-12 pb-12" data-aos="fade-up">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const res = await fetch("/api/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, job, message }),
              });

              if (res.ok) {
                toast.success("Ulasan berhasil dikirim!");
                setName("");
                setJob("");
                setMessage("");
              } else {
                toast.error("Gagal mengirim ulasan");
              }
            }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="font-poppins text-slate-100 text-2xl xl:text-3xl mb-8">
              Pendapat kamu membantu kami meningkatkan layanan!
            </h1>

            <div className="w-full flex items-center justify-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border focus:outline-none px-4 py-2 font-poppins border-slate-100 rounded-full text-slate-100 w-3/4 xl:w-1/2 mb-3"
                placeholder="Nama"
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="border focus:outline-none px-4 py-2 font-poppins border-slate-100 rounded-full text-slate-100 w-3/4 xl:w-1/2 mb-3"
                placeholder="Pekerjaan (Opsional)"
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="border focus:outline-none px-4 py-2 font-poppins border-slate-100 rounded-full text-slate-100 w-3/4 xl:w-1/2 mb-3"
                placeholder="Tulis pendapat kamu disini :D"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className="border rounded-full px-6 py-2 font-poppins border-primary bg-primary text-white cursor-pointer hover:bg-sky-500 hover:border-sky-500 shadow-md hover:shadow-2xl duration-300"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </section>

      <FooterClient />
    </div>
  );
}
