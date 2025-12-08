"use client";

import { useState } from "react";
import Link from "next/link";
import NavbarClient from "../components/NavbarClient";

export default function Login() {
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
        alert(data.message);
        return;
      }

      alert("Login berhasil!");

      // ✅ WAJIB full reload agar middleware membaca cookie
      window.location.href = "/guide";
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarClient />

      <section className="min-h-screen w-full flex items-center bg-gradient-to-t from-[#1d293d] via-[#23385e] to-[#3b82f6] pt-16">
        <div className="container mx-auto flex items-center justify-center px-4">
          <div className="w-full xl:w-1/2 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-2xl flex flex-col items-center px-7 py-10">
            <h1 className="text-3xl text-white mb-8">Login</h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full items-center"
            >
              <div className="w-full xl:w-2/3 mb-3">
                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  className="border px-4 py-2 rounded-full w-full"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="w-full xl:w-2/3 mb-3">
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className="border px-4 py-2 rounded-full w-full"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="border rounded-full px-6 py-2 bg-primary text-white mb-2"
              >
                Login
              </button>

              <p className="text-white">
                Belum punya akun?{" "}
                <Link href="/signup" className="font-semibold">
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
