"use client";

import { useState } from "react";
import Link from "next/link";
import NavbarClient from "@/app/components/NavbarClient";
import hardware from "@/assets/guidecategory/hardware.jpg";
import laptopHardware from "@/assets/guidecategory/laptophardware.jpg";
import software from "@/assets/guidecategory/software.jpg";
import Image from "next/image";
import FooterClient from "@/app/components/FooterClient";

export default function laptopGuide() {
    return (
        <div>
            <NavbarClient />

            <section className="bg-slate-200 pt-32 pb-16">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center mb-5">
                        <h1 className="text-darkb font-poppins text-2xl 2xl:text-3xl font-semibold border-b pb-5 border-secondary">Panduan Laptop</h1>
                    </div>
                    <div className="flex justify-center items-center px-4">
                        <p className="text-darkb text-center text-4xl xl:text-5xl font-poppins">Kamu butuh panduan di bagian mana?</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-200 pb-16">
                <div className="container mx-auto">
                    {/* Mobile Ver */}
                    <div className="xl:hidden grid grid-cols-1 xl:grid-cols-2 px-8 gap-y-10 xl:gap-x-10">
                        <div className="border border-darkb flex flex-col p-6 text-center items-center justify-center rounded-xl space-y-5">
                            <Image src={hardware} alt="hardware" className="w-[350px] rounded-xl" />
                            <Link href="/guide/komputer/hardware" className="font-poppins border px-3 py-1 rounded-full text-white text-xl bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer">Hardware</Link>
                        </div>
                        <div className="border border-darkb flex flex-col p-6 text-center items-center justify-center rounded-xl space-y-5">
                            <Image src={software} alt="software" className="w-[350px] rounded-xl" />
                            <Link href="/guide/komputer/software" className="font-poppins border px-3 py-1 rounded-full text-white text-xl bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer">Software</Link>
                        </div>
                    </div>
                    {/* Desktop Ver */}
                    <div className="hidden xl:grid grid-cols-1 xl:grid-cols-2 px-8 gap-y-10 xl:gap-x-10">
                        <Link href="/guide/komputer/hardware" className="border border-darkb text-center items-center justify-center rounded-xl relative group">
                            <Image src={hardware} alt="hardware" className="w-full h-full object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-black/70 rounded-xl group-hover:bg-black/85 transition duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-white font-poppins text-3xl uppercase font-semibold">Hardware</h1>
                            </div>
                        </Link>
                        <Link href="/guide/komputer/software" className="border border-darkb text-center items-center justify-center rounded-xl relative group">
                            <Image src={software} alt="software" className="w-full h-full object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-black/70 rounded-xl group-hover:bg-black/85 transition duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-white font-poppins text-3xl uppercase font-semibold">Software</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <FooterClient />
        </div>
    );
};