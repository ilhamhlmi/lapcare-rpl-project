"use client";

import AOS from 'aos';
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import NavbarClient from "../components/NavbarClient";
import toast from 'react-hot-toast';
import Image from 'next/image';
import showPass from "@/assets/password/eye-alt-svgrepo-com.svg";
import hidePass from "@/assets/password/eye-slash-alt-svgrepo-com.svg";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        credentials: "include",

        body: JSON.stringify(form),
      });

      const data = await res.json();


      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("Login berhasil!");
        setTimeout(() => {
          router.push("/");
        }, 800);
      }


    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarClient />

      <section className="min-h-screen w-full flex items-center bg-slate-200 pt-16">
        <div className="container mx-auto flex items-center justify-center px-4">
          <div className="w-full xl:w-1/2 bg-white backdrop-blur-2xl shadow-2xl rounded-2xl flex flex-col items-center px-7 py-10 border border-darkb">
            <h1 className="text-3xl text-darkb mb-8 font-poppins font-semibold">Login</h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full items-center"
              autoComplete='off'
            >
              <div className="w-full xl:w-2/3 mb-3">
                <input name="username" onChange={handleChange} type="text" className="border px-4 py-2 rounded-full w-full text-darkb border-darkb focus:outline-none" placeholder="Username" required />
              </div>

              <div className="flex flex-col w-full xl:w-2/3 mb-3 relative">
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

              <button
                type="submit"
                className="border rounded-full px-6 py-2 bg-primary border-primary hover:bg-sky-700 hover:border-sky-700 shadow-md hover:shadow-2xl cursor-pointer duration-300  text-white font-poppins mb-2"
              >
                Login
              </button>

              <p className="text-darkb font-poppins">
                Belum punya akun?{" "}
                <Link href="/signup" className="font-semibold text-darkb">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}