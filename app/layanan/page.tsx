"use client"

import { useEffect } from "react";
import NavbarClient from "../components/NavbarClient";
import FooterClient from "../components/FooterClient";
import Image from "next/image";
import Hardware from "@/assets/layanan-kami/hardware-fixing.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";
import { format } from "path";

export default function layananPage() {
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
                        <h1 className="text-darkb font-poppins text-2xl 2xl:text-3xl font-semibold border-b pb-5 border-secondary" data-aos="zoom-in">Layanan Kami</h1>
                    </div>
                    <div className="flex justify-center items-center px-4">
                        <p className="text-darkb text-center text-5xl xl:text-6xl font-poppins" data-aos="zoom-in">Apa yang kami tawarkan?</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-200 pb-16">
                <div className="container mx-auto space-y-10 xl:space-y-20">
                    {/* Mobile Card 1 */}
                    <div className="xl:hidden flex flex-col xl:flex-row px-6 py-6 xl:py-0 items-center justify-center text-center xl:text-start gap-8">
                        <div>
                            <Image src={Hardware} alt="Hardware" className="w-[350px] xl:w-[500px] rounded-xl shadow-xl"  />
                        </div>
                        <div className="xl:w-1/2">
                            <h1 className="mb-5 className
                            font-poppins font-semibold text-2xl xl:text-3xl text-darkb">Panduan Informasi Online Yang Lengkap</h1>
                            <p className="mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab minus hic unde vel reiciendis suscipit iste, omnis id in velit perferendis repellendus autem a aliquid itaque illo quae, dignissimos alias quod corporis? Molestiae hic consequuntur cupiditate veniam. Vel quaerat eum aperiam enim, nostrum iste explicabo facere nam, quasi fuga cum.</p>
                            <Link href="/guide" className="border px-4 py-2 rounded-full font-poppins text-white text-md bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300">Lihat Panduan</Link>
                        </div>
                    </div>
                    {/* Desktop Card 1 */}
                    <div className="hidden xl:flex flex-col xl:flex-row px-6 py-6 xl:py-0 items-center justify-center text-center xl:text-start gap-8" data-aos="fade-left">
                        <div>
                            <Image src={Hardware} alt="Hardware" className="w-[350px] xl:w-[500px] rounded-xl shadow-xl"  />
                        </div>
                        <div className="xl:w-1/2">
                            <h1 className="mb-5 className
                            font-poppins font-semibold text-2xl xl:text-3xl text-darkb">Panduan Informasi Online Yang Lengkap</h1>
                            <p className="mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab minus hic unde vel reiciendis suscipit iste, omnis id in velit perferendis repellendus autem a aliquid itaque illo quae, dignissimos alias quod corporis? Molestiae hic consequuntur cupiditate veniam. Vel quaerat eum aperiam enim, nostrum iste explicabo facere nam, quasi fuga cum.</p>
                            <Link href="/guide" className="border px-4 py-2 rounded-full font-poppins text-white text-md bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300">Lihat Panduan</Link>
                        </div>
                    </div>
                    {/* Mobile Card 2 */}
                    <div className="xl:hidden flex flex-col xl:flex-row px-6 py-6 xl:py-0 items-center justify-center text-center xl:text-start gap-8">
                        <div>
                            <Image src={Hardware} alt="Hardware" className="w-[350px] xl:w-[500px] rounded-xl shadow-xl" />
                        </div>
                        <div className="xl:w-1/2">
                            <h1 className="mb-5 className
                            font-poppins font-semibold text-2xl xl:text-3xl text-darkb">Layanan Konsultasi Chat Online Dengan Teknisi Kami</h1>
                            <p className="mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab minus hic unde vel reiciendis suscipit iste, omnis id in velit perferendis repellendus autem a aliquid itaque illo quae, dignissimos alias quod corporis? Molestiae hic consequuntur cupiditate veniam. Vel quaerat eum aperiam enim, nostrum iste explicabo facere nam, quasi fuga cum.</p>
                            <Link href="/guide" className="border px-4 py-2 rounded-full font-poppins text-white text-md bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300">Konsultasi Sekarang</Link>
                        </div>
                    </div>
                    {/* Desktop Card 2 */}
                    <div className="hidden xl:flex flex-col xl:flex-row px-6 py-6 xl:py-0 items-center justify-center text-center xl:text-start gap-8" data-aos="fade-right">
                        <div className="xl:w-1/2">
                            <h1 className="mb-5 className
                            font-poppins font-semibold text-2xl xl:text-3xl text-darkb">Layanan Konsultasi Chat Online Dengan Teknisi Kami</h1>
                            <p className="mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab minus hic unde vel reiciendis suscipit iste, omnis id in velit perferendis repellendus autem a aliquid itaque illo quae, dignissimos alias quod corporis? Molestiae hic consequuntur cupiditate veniam. Vel quaerat eum aperiam enim, nostrum iste explicabo facere nam, quasi fuga cum.</p>
                            <Link href="/" className="border px-4 py-2 rounded-full font-poppins text-white text-md bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300">Konsultasi Sekarang</Link>
                        </div>
                        <div>
                            <Image src={Hardware} alt="Hardware" className="w-[350px] xl:w-[500px] rounded-xl shadow-xl" />
                        </div>
                    </div>
                    {/* Mobile Card 3 */}
                    <div className="xl:hidden flex flex-col xl:flex-row px-6 py-6 xl:py-0 items-center justify-center text-center xl:text-start gap-8">
                        <div>
                            <Image src={Hardware} alt="Hardware" className="w-[350px] xl:w-[500px] rounded-xl shadow-xl" />
                        </div>
                        <div className="xl:w-1/2">
                            <h1 className="mb-5 className
                            font-poppins font-semibold text-2xl xl:text-3xl text-darkb">Teknisi Datang Ke Rumah Anda</h1>
                            <p className="mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab minus hic unde vel reiciendis suscipit iste, omnis id in velit perferendis repellendus autem a aliquid itaque illo quae, dignissimos alias quod corporis? Molestiae hic consequuntur cupiditate veniam. Vel quaerat eum aperiam enim, nostrum iste explicabo facere nam, quasi fuga cum.</p>
                            <Link href="/guide" className="border px-4 py-2 rounded-full font-poppins text-white text-md bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300">Panggil Teknisi</Link>
                        </div>
                    </div>
                    {/* Desktop Card 3 */}
                    <div className="hidden xl:flex flex-col xl:flex-row px-6 py-6 xl:py-0 items-center justify-center text-center xl:text-start gap-8" data-aos="fade-left">
                        <div>
                            <Image src={Hardware} alt="Hardware" className="w-[350px] xl:w-[500px] rounded-xl shadow-xl" />
                        </div>
                        <div className="xl:w-1/2">
                            <h1 className="mb-5 className
                            font-poppins font-semibold text-2xl xl:text-3xl text-darkb">Teknisi Datang Ke Rumah Anda</h1>
                            <p className="mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab minus hic unde vel reiciendis suscipit iste, omnis id in velit perferendis repellendus autem a aliquid itaque illo quae, dignissimos alias quod corporis? Molestiae hic consequuntur cupiditate veniam. Vel quaerat eum aperiam enim, nostrum iste explicabo facere nam, quasi fuga cum.</p>
                            <Link href="/" className="border px-4 py-2 rounded-full font-poppins text-white text-md bg-primary border-primary hover:bg-sky-500 shadow-md hover:shadow-2xl transition duration-300">Panggil Teknisi</Link>
                        </div>
                    </div>
                </div>
            </section>

            <FooterClient />
        </div>
    );
}