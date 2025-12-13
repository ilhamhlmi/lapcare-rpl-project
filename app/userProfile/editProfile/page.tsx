"use client";

import AOS from "aos";
import { useEffect, useState } from "react";
import NavbarClient from "@/app/components/NavbarClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserProfile() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    no_tlp: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    async function fetchProfile() {
      try {
        const res = await fetch("/api/editProfile", { method: "GET" });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to load profile");
          return;
        }

        
        setForm({
          username: data.username,
          no_tlp: data.no_tlp,
          email: data.email,
          password: data.password,
        });

        setLoading(false);
      } catch (error) {
        toast.error("Failed to connect to server");
      }
    }

    fetchProfile();
  }, []);


  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/editProfile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Profile updated successfully!");
      router.refresh();
    } else {
      toast.error(data.error || "Failed to update profile");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-darkb text-xl font-poppins">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <NavbarClient />

      <form
        onSubmit={handleUpdate}
        className="min-h-screen w-full flex items-center bg-slate-200 relative pt-16 text-start"
      >
        <div className="container mx-auto flex items-center justify-center px-4 xl:px-0">
          <div
            className="w-full xl:w-2/3 bg-white backdrop-blur-2xl border border-darkb shadow-2xl rounded-2xl flex flex-col items-center justify-center px-7 xl:px-10 py-10"
            data-aos="zoom-in-up"
          >
            <h1 className="font-poppins text-3xl text-darkb font-semibold mb-5">
              Edit Profile
            </h1>

            {/* Username */}
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label className="font-poppins text-sm px-4">Username</label>
              <input
                className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label className="font-poppins text-sm px-4">Phone Number</label>
              <input
                className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb"
                value={form.no_tlp}
                onChange={(e) =>
                  setForm({ ...form, no_tlp: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="flex flex-col w-full xl:w-2/3 mb-3">
              <label className="font-poppins text-sm px-4">Email</label>
              <input
                className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full xl:w-2/3 mb-3 relative">
              <label className="font-poppins text-sm px-4">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                className="border focus:outline-none px-4 py-2 font-poppins border-darkb rounded-full text-darkb pr-12"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[30px] text-darkb"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Submit */}
            <div className="flex flex-col items-center justify-center space-y-2 w-full xl:w-2/3">
              <button
                type="submit"
                className="border rounded-full px-6 py-2 font-poppins border-green-500 bg-green-500 hover:bg-green-700 hover:border-green-700 shadow-md hover:shadow-2xl duration-300 text-white cursor-pointer w-full"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
