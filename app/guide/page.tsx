"use client"

import { useEffect } from "react";
import NavbarClient from "../components/NavbarClient";
import FooterClient from "../components/FooterClient";
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function guidePage(){
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);
    return(
        <div>
            <NavbarClient/>

            <section className="bg-slate-200 pt-32 pb-16">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center">
                        <h1 className="text-darkb font-poppins text-2xl 2xl:text-3xl font-semibold border-b pb-5 border-secondary">Panduan</h1>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mx-auto">
                    <div className="flex justify-center items-center">
                        <h1 className="text-darkb font-poppins text-2">Panduan</h1>
                    </div>
                </div>
            </section>

            {/* <FooterClient/> */}
        </div>
    );
}