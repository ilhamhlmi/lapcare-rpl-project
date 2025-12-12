"use client";

import AOS from 'aos';
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import NavbarClient from '@/app/components/NavbarClient';
import { useRouter } from "next/navigation";

export default function userProfile() {

  return (
    <div>
      <NavbarClient />
      <form className="min-h-screen w-full flex items-center bg-slate-200 relative pt-16 text-start">
        <div className="container mx-auto flex items-center justify-center px-4 xl:px-0">
          <div className="w-full xl:w-2/3 bg-white backdrop-blur-2xl border border-darkb shadow-2xl rounded-2xl flex flex-col items-center justify-center px-7 xl:px-10 py-10" data-aos="zoom-in-up">
            <h1 className="font-poppins text-3xl text-darkb font-semibold mb-5">Edit Profile</h1>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label htmlFor="" className="font-poppins text-sm px-4">Username</label>
              <input className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb"></input>
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label htmlFor="" className="font-poppins text-sm px-4">Phone Number</label>
              <input className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb"></input>
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label htmlFor="" className="font-poppins text-sm px-4">Email</label>
              <input className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb"></input>
            </div>
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label htmlFor="" className="font-poppins text-sm px-4">Password</label>
              <input className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb"></input>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 w-full xl:w-2/3">
              <button className="border rounded-full px-6 py-2 font-poppins border-green-500 bg-green-500 hover:bg-green-700 hover:border-green-700 shadow-md hover:shadow-2xl duration-300 text-white cursor-pointer w-full">Update Profile</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
