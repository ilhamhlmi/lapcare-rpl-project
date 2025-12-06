"use client";

import { useState } from "react";
import Link from "next/link";
import NavbarClient from "../components/NavbarClient";

export default function ulasanPage() {
    return (
        <div>
            <NavbarClient />
            <section className="min-h-screen w-full flex items-center bg-slate-200 relative pt-16">
                <div className="container mx-auto flex items-center justify-center px-4 xl:px-0">
                    <div className="w-full xl:w-1/2 bg-white border border-darkb shadow-2xl rounded-2xl flex flex-col items-center justify-center px-7 xl:px-10 py-10">
                        <h1 className="font-poppins text-3xl text-darkb font-semibold mb-8 text-center">Pendapat kamu membantu kami meningkatkan layanan!</h1>
                        <div className="flex flex-col w-full xl:w-2/3 mb-3">
                            <input type="email" className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb" placeholder="Email" />
                        </div>
                        <div className="flex flex-col w-full xl:w-2/3 mb-3">
                            <input type="email" className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb" placeholder="Nama" />
                        </div>
                        <div className="flex flex-col w-full xl:w-2/3 mb-3">
                            <input type="email" className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb" placeholder="Pekerjaan (Opsional)" />
                        </div>
                        <div className="flex flex-col w-full xl:w-2/3 mb-3">
                            <textarea className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb" placeholder="Tulis pesan dan kesan kamu untuk LapCare :D"/>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <button className="border rounded-full px-6 py-2 font-poppins border-primary bg-primary text-white shadow-xl cursor-pointer">Kirim</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};