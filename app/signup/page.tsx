"use client";

import AOS from 'aos';
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import NavbarClient from "../components/NavbarClient";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Image from 'next/image';
import showPass from "@/assets/password/eye-alt-svgrepo-com.svg";
import hidePass from "@/assets/password/eye-slash-alt-svgrepo-com.svg";

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    no_tlp: "",
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.email || !form.no_tlp || !form.username || !form.password) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("Sign Up berhasil!");
        setTimeout(() => {
          router.push("/login");
        }, 800);
      }

      // alert("Akun berhasil dibuat!");
      // router.push("/login");
    } catch (error) {
      alert("Server error");
    }
  };



  return (
    <div>
      <NavbarClient />
      <form onSubmit={handleSubmit} className="min-h-screen w-full flex items-center bg-slate-200 relative pt-16" autoComplete='off'>
        <div className="container mx-auto flex items-center justify-center px-4 xl:px-0">
          <div className="w-full xl:w-1/2 bg-white backdrop-blur-2xl border border-darkb shadow-2xl rounded-2xl flex flex-col items-center justify-center px-7 xl:px-10 py-10">
            <h1 className="font-poppins text-3xl text-darkb font-semibold mb-8">Sign Up</h1>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              {/* <label htmlFor="" className="font-poppins text-sm">Email</label> */}
              <input onChange={handleChange} name="email" type="email" className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb" placeholder="Email Address" />
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              {/* <label htmlFor="" className="font-poppins text-sm">Phone Number</label> */}
              <input onChange={handleChange} name="no_tlp" type="tel" className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb" placeholder="Phone Number" />
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              {/* <label htmlFor="" className="font-poppins text-sm">Username</label> */}
              <input onChange={handleChange} type="username" name="username" className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb" placeholder="Username" />
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3 relative">
              {/* <label htmlFor="" className="font-poppins text-sm">Password</label> */}
              <input onChange={handleChange} type={showPassword ? "text" : "password"} name="password" className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb" placeholder="Password" />
              <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2'>
                <Image
                  src={showPassword ? hidePass : showPass}
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2">
              <button className="border rounded-full px-6 py-2 font-poppins border-primary bg-primary hover:bg-sky-700 hover:border-sky-700 shadow-md hover:shadow-2xl duration-300 text-white cursor-pointer">Buat Akun</button>
              <p className="font-poppins text-sm text-darkb">Sudah punya akun? <Link href="/login" className="font-semibold text-darkb">Login</Link></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
