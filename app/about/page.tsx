"use client"

import Image from "next/image"
import gambar from "@/assets/about/ilus.svg"
import NavbarClient from "../components/NavbarClient";
import FooterClient from "../components/FooterClient";

export default function aboutPage() {
    return (
        <div>
            <NavbarClient />

            <section className="pt-16 pb-16 bg-slate-200">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center">
                        <h1 className="font-poppins text-3xl 2xl:text-4xl text-darkb border-b pb-5 border-secondary font-semibold">Tentang Kami</h1>
                    </div>
                </div>
            </section>


        </div>




    );
}