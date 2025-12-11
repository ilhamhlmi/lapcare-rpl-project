"use client";

import AOS from 'aos';
import { useEffect, useState } from 'react';
import Link from "next/link";
import NavbarClient from "../components/NavbarClient";
import { useRouter } from "next/navigation";

export default function userProfile() {

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    fetch("/api/userProfile")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log("User data:", data); // buat debug di console
      })
      .catch((err) => console.log("Fetch error:", err));
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
          <div className="w-full xl:w-2/3 bg-white backdrop-blur-2xl border border-darkb shadow-2xl rounded-2xl flex flex-col items-center justify-center px-7 xl:px-10 py-10" data-aos="zoom-in-up">
            <h1 className="font-poppins text-3xl text-darkb font-semibold mb-5">Account Profile</h1>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label htmlFor="" className="font-poppins text-sm px-4">Username</label>
              <h1 className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb">{user.username}</h1>
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label htmlFor="" className="font-poppins text-sm px-4">Phone Number</label>
              <h1 className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb">{user.no_tlp}</h1>
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label htmlFor="" className="font-poppins text-sm px-4">Email</label>
              <h1 className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb">{user.email}</h1>
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label htmlFor="" className="font-poppins text-sm px-4">Password</label>
              <h1 className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb">{user.password}</h1>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 w-full xl:w-2/3 text-center">
              <Link href="/userProfile/editProfile" className="border rounded-full px-6 py-2 font-poppins border-primary bg-primary hover:bg-sky-700 hover:border-sky-700 shadow-md hover:shadow-2xl duration-300 text-white cursor-pointer w-full">Edit Profile</Link>
              <button onClick={handleLogout} className="border rounded-full px-6 py-2 font-poppins border-red-600 bg-red-600 hover:bg-red-800 hover:border-red-800 shadow-md hover:shadow-2xl duration-300 text-white cursor-pointer w-full">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
