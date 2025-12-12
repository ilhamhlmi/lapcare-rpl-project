"use client";

import AOS from 'aos';
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import NavbarClient from "../components/NavbarClient";
import toast from 'react-hot-toast';

export default function Login() {

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

        // ✅ WAJIB supaya cookie terbaca middleware
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


      // alert("Login berhasil!");

      // ✅ WAJIB full reload agar middleware membaca cookie
      // window.location.href = "/";
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
                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  className="border px-4 py-2 rounded-full w-full text-darkb border-darkb focus:outline-none"
                  placeholder="Username"
                  required />
              </div>

              <div className="w-full xl:w-2/3 mb-3">
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className="border px-4 py-2 rounded-full w-full text-darkb border-darkb focus:outline-none"
                  placeholder="Password"
                  required
                />
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