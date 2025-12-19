"use client"

import Image from "next/image";
import NavbarClient from "../components/NavbarClient";
import FooterClient from "../components/FooterClient";

import integrity from "@/assets/about/userCheck.svg";
import time from "@/assets/about/timeFast.svg";
import care from "@/assets/about/care.svg";
import star from "@/assets/about/star.svg";

import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function aboutPage() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);
    return (
        <div>
            <NavbarClient />

            <section className="pt-32 pb-16 bg-slate-200">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center mb-8" data-aos="fade-up">
                        <h1 className="font-poppins text-2xl 2xl:text-3xl text-darkb border-b pb-5 border-secondary font-semibold">Tentang Kami</h1>
                    </div>
                    <div className="flex justify-center items-center text-center px-4 mb-5" data-aos="fade-up">
                        <h1 className="text-black font-poppins font-semibold text-4xl lg:text-6xl max-w-xs lg:max-w-3xl">Layanan Service Digital Laptop & Komputer</h1>
                    </div>
                    <div className="flex justify-center items-center px-4" data-aos="fade-up">
                        <p className="text-darkb text-md lg:text-xl font-poppins max-w-xs lg:max-w-2xl text-center">LapCare adalah platform konsultasi dan informasi seputar laptop tentang komputer. Kami hadir untuk menjadi mitra terpercaya Anda dalam menemukan serta memberikan panduan & solusi tepat atas berbagai permasalahan pada Laptop atau Komputer Anda. mulai dari kinerja lambat, error pada sistem hingga upgrade komponen. Kami siap melayani anda baik dengan memberikan panduan yang solutif, konsultasi chat online, hingga layanan <span className="italic">home service</span> untuk langsung ke lokasi Anda.</p>
                    </div>
                </div>
            </section>

            <section className="pb-16 bg-slate-200">
                <div className="w-full bg-gradient-to-tl from-[#1d293d] via-[#23385e] to-[#3b82f6] pt-12 pb-12" data-aos="fade-up">
                    <div className="flex justify-center items-center">
                        <h1 className="font-poppins text-xl lg:text-2xl text-white">Etos & Nilai Perusahaan</h1>
                    </div>
                    <div className="flex justify-center items-center mt-8 px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-5 xl:gap-7 2xl:10">
                            <div className="flex border px-8 py-5 border-secondary rounded-2xl bg-white/5 backdrop-blur-md shadow-lg hover:scale-[1.08] hover:border-primary transition duration-150">
                                <div className="border bg-white mr-5 rounded-xl p-3">
                                    <Image src={integrity} alt="integrity" className="w-[35px]" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h1 className="font-poppins font-semibold text-white">Integritas & Transparansi</h1>
                                    <h1 className="font-poppins text-sm text-slate-400">Integrity & Transparency</h1>
                                </div>
                            </div>
                            <div className="flex border px-8 py-5 border-secondary rounded-2xl bg-white/5 backdrop-blur-md shadow-lg hover:scale-[1.08] hover:border-primary transition duration-150">
                                <div className="border bg-white mr-5 rounded-xl p-3">
                                    <Image src={time} alt="time" className="w-[35px]" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h1 className="font-poppins font-semibold text-white">Kecepatan & Efisiensi</h1>
                                    <h1 className="font-poppins text-sm text-slate-400">Speed & Efficiency</h1>
                                </div>
                            </div>
                            <div className="flex border px-8 py-5 border-secondary rounded-2xl bg-white/5 backdrop-blur-md shadow-lg hover:scale-[1.08] hover:border-primary transition duration-150">
                                <div className="border bg-white mr-5 rounded-xl p-3">
                                    <Image src={care} alt="care" className="w-[35px]" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h1 className="font-poppins font-semibold text-white">Kepedulian & Empati</h1>
                                    <h1 className="font-poppins text-sm text-slate-400">Care & Empathy</h1>
                                </div>
                            </div>
                            <div className="flex border px-8 py-5 border-secondary rounded-2xl bg-white/5 backdrop-blur-md shadow-lg hover:scale-[1.08] hover:border-primary transition duration-150">
                                <div className="border bg-white mr-5 rounded-xl p-3">
                                    <Image src={star} alt="star" className="w-[35px]" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h1 className="font-poppins font-semibold text-white">Kepuasan Pengguna</h1>
                                    <h1 className="font-poppins text-sm text-slate-400">Customer Satisfaction</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section className="pb-16 bg-slate-200">
                <div className="container mx-auto">
                    <div className="flex items-center justify-center px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div className="flex flex-col items-center justify-center text-center" data-aos="fade-right">
                                <h1 className="text-darkb font-poppins font-semibold border-b-2 pb-1 px-3 border-darkb mb-3 text-2xl lg:text-3xl">Visi</h1>
                                <p className="text-black max-w-sm lg:max-w-md font-poppins text-md lg:text-lg">Menjadi mitra terpercaya dalam konsultasi dan layanan perbaikan perangkat digital yang cepat, efisien, dan berkualitas tinggi, dengan mengutamakan kepuasan pengguna serta nilai kolaborasi dalam setiap proses pelayanan, kami akan melayani dengan sepenuh hati.</p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center" data-aos="fade-left">
                                <h1 className="text-darkb font-poppins font-semibold border-b-2 pb-1 px-3 border-darkb mb-3 text-2xl lg:text-3xl">Misi</h1>
                                <p className="text-black max-w-sm lg:max-w-md font-poppins text-md lg:text-lg">Memberikan solusi terbaik melalui layanan konsultasi dan perbaikan yang responsif, transparan, dan penuh kepedulian, serta berkomitmen menjaga kepercayaan pengguna melalui inovasi berkelanjutan dan kerja sama tim yang profesional.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterClient />

        </div>




    );
}