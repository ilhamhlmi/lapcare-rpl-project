"use client";

import AOS from 'aos';
import { useEffect, useState } from 'react';
import Link from "next/link";
import NavbarClient from "../components/NavbarClient";
import showPass from "@/assets/password/eye-alt-svgrepo-com.svg";
import hidePass from "@/assets/password/eye-slash-alt-svgrepo-com.svg";
import Image from "next/image";

export default function userProfile() {

  const [user, setUser] = useState<any>({});
  const [form, setForm] = useState({
    username: "",
    no_tlp: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch("/api/userProfile")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);


        setForm({
          username: data.username,
          no_tlp: data.no_tlp,
          email: data.email,
          password: data.password,
        });

      })
      .catch((err) => console.log("Fetch error:", err)); //buat debug console
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };

  return (
    <div>
      <NavbarClient />
      <div className="min-h-screen w-full flex items-center bg-slate-200 relative pt-16 text-start">
        <div className="container mx-auto flex items-center justify-center px-4 xl:px-0">
          <div className="w-full xl:w-2/3 bg-white border border-darkb shadow-2xl rounded-2xl flex flex-col items-center justify-center px-7 xl:px-10 py-10">

            <h1 className="font-poppins text-3xl text-darkb font-semibold mb-5">
              Account Profile
            </h1>

            {/* Username */}
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label className="font-poppins text-sm px-4">Username</label>
              <h1 className="border px-4 py-2 font-poppins border-darkb rounded-full text-darkb focus:outline-none">
                {user.username}
              </h1>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label className="font-poppins text-sm px-4">Phone Number</label>
              <h1 className="border px-4 py-2 font-poppins border-darkb rounded-full text-darkb focus:outline-none">
                {user.no_tlp}
              </h1>
            </div>

            {/* Email */}
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label className="font-poppins text-sm px-4">Email</label>
              <h1 className="border px-4 py-2 font-poppins border-darkb rounded-full text-darkb focus:outline-none">
                {user.email}
              </h1>
            </div>

            {/* Password with show/hide */}
            <div className="flex flex-col w-full xl:w-2/3 mb-3 relative">
              <label className="font-poppins text-sm px-4">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                className="border px-4 py-2 font-poppins border-darkb rounded-full text-darkb focus:outline-none"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                readOnly // karena ini hanya untuk display
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[30px] text-secondary font-poppins cursor-pointer text-sm"
              >
                <Image
                  src={showPassword ? hidePass : showPass}
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 w-full xl:w-2/3 text-center">
              <Link href="/userProfile/editProfile" className="border rounded-full px-6 py-1 font-poppins border-primary bg-primary hover:bg-sky-700 hover:border-sky-700 shadow-md hover:shadow-2xl duration-300 text-white cursor-pointer w-full">
                Edit Profile
              </Link>

              <Link href="/userProfile/riwayatLayanan" className="border rounded-full px-6 py-1 font-poppins border-primary bg-primary hover:bg-sky-700 hover:border-sky-700 shadow-md hover:shadow-2xl duration-300 text-white cursor-pointer w-full">
                Lihat Riwayat Layanan
              </Link>

              <button
                onClick={handleLogout}
                className="border rounded-full px-6 py-2 font-poppins border-red-600 bg-red-600 hover:bg-red-800 hover:border-red-800 shadow-md hover:shadow-2xl duration-300 text-white cursor-pointer w-full"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
