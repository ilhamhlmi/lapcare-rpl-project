"use client";

export default function ServicesPage() {
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };

  const whatsappKonsultasi =
    "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20laptop";
  const whatsappHomeService =
    "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20home%20service%20perbaikan%20laptop";

  return (
    <section className="min-h-screen bg-gradient-to-t from-[#1d293d] to-[#3b82f6] pt-24 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10">Layanan Kami</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white/10 p-8 rounded-xl">
          <h2 className="text-2xl mb-3">Konsultasi Online</h2>
          <ul className="mb-5 text-sm space-y-2">
            <li>✅ Cara merawat laptop</li>
            <li>✅ Solusi laptop rusak</li>
          </ul>
          <a
            href={whatsappKonsultasi}
            target="_blank"
            className="bg-green-500 px-6 py-2 rounded"
          >
            Konsultasi WhatsApp
          </a>
        </div>

        <div className="bg-white/10 p-8 rounded-xl">
          <h2 className="text-2xl mb-3">Home Service</h2>
          <p className="text-sm">Jl. Paramadina, Jakarta</p>
          <p className="text-sm mb-4">0812-3456-7890</p>
          <a
            href={whatsappHomeService}
            target="_blank"
            className="bg-green-500 px-6 py-2 rounded"
          >
            Pesan Home Service
          </a>
        </div>
      </div>

      <div className="flex justify-center mt-14">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded font-semibold"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
