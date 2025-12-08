"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="z-50 w-full fixed top-0 left-0 flex items-center">
      <div className="container mx-auto">

        {/* MOBILEEEEEEEEEEEEEEEEEE */}
        <div className="lg:hidden">
          <nav className="w-full">
            <div className="flex items-center justify-between mx-5 my-4">
              <button onClick={toggleMenu} className="cursor-pointer border px-4 py-2 rounded-full backdrop-blur-xl bg-darkb/30 shadow-xl">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
              <Link href="/login" className="border px-3 py-2 rounded-xl font-poppins bg-gradient-to-tr from-teal-500 to-primary border-transparent">Sign Up | Login</Link>
            </div>
          </nav>
        </div>

        {isOpen && (
          <nav className="absolute bg-darkb/30 backdrop-blur-3xl left-3 top-full px-8 py-5 border rounded-md border-secondary shadow-xl">
            <div className="flex flex-col text-center text-s100 space-y-5">
              <Link href="/" className="text-lg font-semibold font-poppins text-white">Beranda</Link>
              <Link href="/about" className="text-lg font-semibold font-poppins text-white">Tentang Kami</Link>
              <Link href="/guide" className="text-lg font-semibold font-poppins text-white">Panduan</Link>
              <Link href="/contact" className="text-lg font-semibold font-poppins text-white">Kontak</Link>
            </div>
          </nav>
        )}

        {/* DESKTOOOOOOOOOOOOOOOOOPP */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="border border-white px-10 rounded-2xl mt-5 backdrop-blur-xl bg-darkb/30 shadow-xl">
            <nav className="py-4 space-x-8">
              <Link href="/" className={pathname === '/' ? 'text-darkb bg-white border px-3 py-2 rounded-xl border-transparent font-poppins' : 'text-white hover:text-darkb  hover:bg-white duration-200 py-2 rounded-xl px-3 border-transparent font-poppins'}>Beranda</Link>
              <Link href="/about" className={pathname === '/about' ? 'text-darkb bg-white border px-3 py-2 rounded-xl border-transparent font-poppins' : 'text-white hover:text-darkb  hover:bg-white duration-200 py-2 rounded-xl px-3 border-transparent font-poppins'}>Tentang Kami</Link>
              <Link href="/guide" className={pathname === '/guide' ? 'text-darkb bg-white border px-3 py-2 rounded-xl border-transparent font-poppins' : 'text-white hover:text-darkb  hover:bg-white duration-200 py-2 rounded-xl px-3 border-transparent font-poppins'}>Panduan</Link>
              <Link href="/services" className={pathname === '/services' ? 'text-darkb bg-white border px-3 py-2 rounded-xl border-transparent font-poppins' : 'text-white hover:text-darkb  hover:bg-white duration-200 py-2 rounded-xl px-3 border-transparent font-poppins'}>Layanan Kami</Link>
              <Link href="/signup" className="border px-3 py-2 rounded-xl font-poppins  border-white">Sign Up</Link>
              <Link href="/login" className="border px-3 py-2 rounded-xl font-poppins bg-gradient-to-tr from-teal-500 to-primary border-transparent">Login</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

