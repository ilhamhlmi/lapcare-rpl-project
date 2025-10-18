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
    <header className="z-50 w-full fixed top-0 left-0 flex items-center bg-transparent">
      <div className="container mx-auto">

        {/* MOBILEEEEEEEEEEEEEEEEEE */}
        <div className="flex items-center justify-start lg:hidden">
          <button onClick={toggleMenu} className="cursor-pointer mx-5 my-4 border px-4 py-2 rounded-full backdrop-blur-xl bg-transparent shadow-xl">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {isOpen && (
          <nav className="absolute bg-primary left-3 top-full px-8 py-5 border rounded-md border-primary shadow-xl">
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
          <div className="border px-10 rounded-full mt-5 backdrop-blur-xl bg-transparent shadow-xl">
            <nav className="py-4 space-x-16">
              <Link href="/" className={pathname === '/' ? 'text-darkb bg-white border px-4 py-2 rounded-full border-transparent font-poppins' : 'text-white hover:text-darkb  hover:bg-white hover:border hover:px-4 duration-250 py-2 hover:rounded-full border-transparent font-poppins'  }>Beranda</Link>
              <Link href="/about" className={pathname === '/about' ? 'text-darkb bg-white border px-4 py-2 rounded-full border-transparent font-poppins' : 'text-white hover:text-darkb hover:bg-white hover:border hover:px-4 duration-250 py-2 hover:rounded-full border-transparent font-poppins'}>Tentang Kami</Link>
              <Link href="/guide" className={pathname === '/guide' ? 'text-darkb bg-white border px-4 py-2 rounded-full border-transparent font-poppins' : 'text-white hover:text-darkb hover:bg-white hover:border hover:px-4 duration-250 py-2 hover:rounded-full border-transparent font-poppins'}>Panduan</Link>
              <Link href="/contact" className={pathname === '/contact' ? 'text-darkb bg-white border px-4 py-2 rounded-full border-transparent font-poppins' : 'text-white hover:text-darkb hover:bg-white hover:border hover:px-4 duration-250 py-2 hover:rounded-full border-transparent font-poppins'}>Kontak</Link>
            </nav>
          </div>
        </div>

      </div>
    </header>
  );
}
