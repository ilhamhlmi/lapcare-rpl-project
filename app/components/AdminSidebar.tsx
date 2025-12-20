"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname()

      const handleLogout = async () => {
    await fetch("/api/logoutAdmin", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/admin/login";
  };
    return (
        <div className="w-60 h-screen bg-darkb text-white p-4 text-center">
            <h1 className="font-poppins text-2xl text-white mb-8 uppercase font-semibold">Admin</h1>
            <div className="text-center flex flex-col items-center justify-center ">
                <div className="">
                    <nav className="flex flex-col space-y-8">
                        <Link href="/admin/dashboard" className={pathname === '/admin/dashboard' ? 'border bg-primary text-white font-poppins p-3 border-primary rounded-md font-semibold' : 'border border-white text-white font-poppins p-3 rounded-md hover:bg-primary hover:border-primary'}>Dashboard Utama</Link>
                        <Link href="/admin/dashboard/konsulchat" className={pathname === '/admin/dashboard/konsulchat' ? 'border bg-primary text-white font-poppins p-3 border-primary rounded-md font-semibold' : 'border border-white text-white font-poppins p-3 rounded-md hover:bg-primary hover:border-primary'}>Data Layanan Konsultasi Chat</Link>
                        <Link href="/admin/dashboard/homeservice" className={pathname === '/admin/dashboard/homeservice' ? 'border bg-primary text-white font-poppins p-3 border-primary rounded-md font-semibold' : 'border border-white text-white font-poppins p-3 rounded-md hover:bg-primary hover:border-primary'}> Data Layanan Home Service</Link>
                        <Link href="/admin/dashboard/datapengguna" className={pathname === '/admin/dashboard/datapengguna' ? 'border bg-primary text-white font-poppins p-3 border-primary rounded-md font-semibold' : 'border border-white text-white font-poppins p-3 rounded-md hover:bg-primary hover:border-primary'}>Data Pengguna</Link>
                        <Link href="/admin/dashboard/ulasan" className={pathname === '/admin/dashboard/ulasan' ? 'border bg-primary text-white font-poppins p-3 border-primary rounded-md font-semibold' : 'border border-white text-white font-poppins p-3 rounded-md hover:bg-primary hover:border-primary'}>Ulasan Pengguna</Link>
                        <button onClick={handleLogout} className="font-poppins border-red-600 bg-red-600 hover:bg-red-800 hover:border-red-800 rounded-md p-3 cursor-pointer">Logout</button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
