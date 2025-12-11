"use client"

import { useEffect } from "react";
import NavbarClient from "@/app/components/NavbarClient";
import FooterClient from "@/app/components/FooterClient";
import Image from "next/image";
import computer from "@/assets/guide/computer.svg";
import laptop from "@/assets/guide/laptop.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";

export default function hardwareKomputer() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);
    return (
        <div>
            <NavbarClient />

            <section className="bg-slate-200 pt-32">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center mb-5">
                        <h1 className="text-darkb font-poppins text-2xl 2xl:text-3xl font-semibold border-b pb-5 border-secondary">Panduan Hardware Komputer</h1>
                    </div>
                    <div className="flex justify-center items-center px-4">
                        <p className="text-darkb text-center text-4xl xl:text-5xl font-poppins">Silahkan pilih kendala yang kamu alami</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-200 pt-16 pb-16 px-6">
                <div className="container mx-auto bg-gradient-to-tl from-[#1d293d] via-[#23385e] to-[#3b82f6] border border-secondary rounded-xl shadow-xl p-5">
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                        <Link href="/guide/komputer/hardware/tampilantidakmuncul" className="border text-center p-4 flex items-center justify-center rounded-xl border-secondary bg-white/5 backdrop-blur-2xl hover:bg-white/15 duration-250">
                            <div>
                                <h1 className="font-poppins text-slate-200 font-semibold text-lg">Tampilan Tidak Muncul</h1>
                            </div>
                        </Link>
                        <Link href="/guide/komputer/hardware/tidaknyala" className="border text-center p-4 flex items-center justify-center rounded-xl border-secondary bg-white/5 backdrop-blur-2xl hover:bg-white/15 duration-250">
                            <div>
                                <h1 className="font-poppins text-slate-200 font-semibold text-lg">Komputer Tidak Nyala Sama Sekali</h1>
                            </div>
                        </Link>
                        <Link href="/guide/komputer/hardware/kipastidakmutar" className="border text-center p-4 flex items-center justify-center rounded-xl border-secondary bg-white/5 backdrop-blur-2xl hover:bg-white/15 duration-250">
                            <div>
                                <h1 className="font-poppins text-slate-200 font-semibold text-lg">Kipas Tidak Mutar</h1>
                            </div>
                        </Link>
                        <Link href="/guide/komputer/hardware/ram" className="border text-center p-4 flex items-center justify-center rounded-xl border-secondary bg-white/5 backdrop-blur-2xl hover:bg-white/15 duration-250">
                            <div>
                                <h1 className="font-poppins text-slate-200 font-semibold text-lg">RAM Tidak Terbaca</h1>
                            </div>
                        </Link>
                        <Link href="/guide/komputer/hardware/ssdtidakterbaca" className="border text-center p-4 flex items-center justify-center rounded-xl border-secondary bg-white/5 backdrop-blur-2xl hover:bg-white/15 duration-250">
                            <div>
                                <h1 className="font-poppins text-slate-200 font-semibold text-lg">Hardisk / SSD Tidak Terbaca</h1>
                            </div>
                        </Link>
                        <Link href="/guide/komputer/hardware/usb" className="border text-center p-4 flex items-center justify-center rounded-xl border-secondary bg-white/5 backdrop-blur-2xl hover:bg-white/15 duration-250">
                            <div>
                                <h1 className="font-poppins text-slate-200 font-semibold text-lg">Port USB Tidak Terbaca</h1>
                            </div>
                        </Link>
                        <Link href="/guide/komputer/hardware/aud" className="border text-center p-4 flex items-center justify-center rounded-xl border-secondary bg-white/5 backdrop-blur-2xl hover:bg-white/15 duration-250">
                            <div>
                                <h1 className="font-poppins text-slate-200 font-semibold text-lg">Port Audio Tidak Terbaca</h1>
                            </div>
                        </Link>
                        <Link href="/guide/komputer/hardware/psu" className="border text-center p-4 flex items-center justify-center rounded-xl border-secondary bg-white/5 backdrop-blur-2xl hover:bg-white/15 duration-250">
                            <div>
                                <h1 className="font-poppins text-slate-200 font-semibold text-lg">PSU Lemah</h1>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="text-center flex items-center justify-center mt-5">
                    <Link href="/" className="font-poppins text-white bg-primary border-primary px-4 py-2 rounded-full hover:bg-sky-600 hover:border-sky-600 shadow-xl duration-250">Punya Kendala lain? Hubungi Kami</Link>
                </div>
            </section>

            <FooterClient />
        </div>
    );
}