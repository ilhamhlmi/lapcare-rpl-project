"use client"

import { useEffect } from "react";
import NavbarClient from "../components/NavbarClient";
import FooterClient from "../components/FooterClient";
import Image from "next/image";
import computer from "@/assets/guide/computer.svg";
import laptop from "@/assets/guide/laptop.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";

export default function guidePage() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);
    return (
        <div>
            <NavbarClient />

            <section className="bg-slate-200 pt-32 pb-16">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center mb-5">
                        <h1 className="text-darkb font-poppins text-2xl 2xl:text-3xl font-semibold border-b pb-5 border-secondary" data-aos="fade-up">Panduan</h1>
                    </div>
                    <div className="flex justify-center items-center px-4" data-aos="fade-up">
                        <p className="text-darkb text-center text-4xl xl:text-5xl font-poppins">Perangkat apa yang ingin kamu perbaiki?</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-200 pb-16">
                <div className="container mx-auto">
                    {/* Desktop Ver */}
                    <div className="hidden xl:grid grid-cols-1 xl:grid-cols-2 px-8 gap-y-10 xl:gap-x-10">
                        <Link href="/guide/komputer">
                            <div className="relative border border-darkb flex-col justify-items-center py-5 xl:py-0 text-center rounded-xl bg-white/5 xl:hover:bg-darkb transition duration-300 group" data-aos="fade-up-right">
                                <Image src={computer} alt="computer" className="w-[350px] xl:w-[400px] transition duration-300 xl:group-hover:scale-110" />
                                <button className="border px-3 py-1 rounded-full font-poppins text-white text-lg bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer xl:hidden">Komputer</button>
                                <div className="hidden xl:flex absolute inset-0 bg-black/50 items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl">
                                    <p className="text-white font-semibold text-5xl font-poppins">Komputer</p>
                                </div>
                            </div>
                        </Link>
                        <Link href="/guide/laptop">
                            <div className="relative border border-darkb flex-col justify-items-center py-5 xl:py-0 text-center rounded-xl bg-white/5 xl:hover:bg-darkb transition duration-300 group" data-aos="fade-up-left">
                                <Image src={laptop} alt="laptop" className="w-[350px] xl:w-[400px] transition duration-300 xl:group-hover:scale-110" />
                                <button className="border px-3 py-1 rounded-full font-poppins text-white text-lg bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer xl:hidden">Laptop</button>
                                <div className="hidden xl:flex absolute inset-0 bg-black/50 items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl">
                                    <p className="text-white font-semibold text-5xl font-poppins">Laptop</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* Mobile Ver */}
                    <div className="xl:hidden grid grid-cols-1 xl:grid-cols-2 px-8 gap-y-10 xl:gap-x-10">
                        <div>
                            <div className="relative border border-darkb flex-col justify-items-center py-5 xl:py-0 text-center rounded-xl bg-white/5 xl:hover:bg-darkb transition duration-300 group" data-aos="fade-up-right">
                                <Image src={computer} alt="computer" className="w-[350px] xl:w-[400px] transition duration-300 xl:group-hover:scale-110" />
                                <Link href="/guide/komputer" className="border px-3 py-1 rounded-full font-poppins text-white text-lg bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer xl:hidden">Komputer</Link>
                            </div>
                        </div>
                        <div>
                            <div className="relative border border-darkb flex-col justify-items-center py-5 xl:py-0 text-center rounded-xl bg-white/5 xl:hover:bg-darkb transition duration-300 group" data-aos="fade-up-left">
                                <Image src={laptop} alt="laptop" className="w-[350px] xl:w-[400px] transition duration-300 xl:group-hover:scale-110" />
                                <Link href="/guide/laptop" className="border px-3 py-1 rounded-full font-poppins text-white text-lg bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer xl:hidden">Laptop</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterClient />
        </div>
    );
}