"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // 1. SCHERMATA ROSA DI CARICAMENTO - quella che mancava
  if (loading) {
    return (
      <main className="min-h-screen bg-[#ffb3b3] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
            🐾
          </div>
          <h1 className="text-white text-4xl font-bold tracking-wide">LeashLove</h1>
          <p className="text-white/80 text-sm">Trova un nuovo amico al tuo cane</p>
        </div>
      </main>
    );
  }

  // 2. HOMEPAGE come nello screen
  return (
    <main className="min-h-screen bg-[#fffef9]">
      <header className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span>🐾</span> ZampeVicine
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 rounded-full border bg-white text-sm">Accedi</Link>
          <Link href="/iscrizione" className="px-5 py-2 rounded-full bg-[#ff6b4a] text-white text-sm font-semibold">Iscriviti</Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 mt-6">
        <div className="bg-[#fef3c7]/60 rounded-[2rem] grid md:grid-cols-2 gap-10 items-center p-10 md:p-14">
          <div>
            <h1 className="text-[2.6rem] md:text-5xl font-extrabold leading-[1.1] text-zinc-800">
              Trova un nuovo<br />amico al tuo cane
            </h1>
            <p className="mt-5 text-zinc-600 text-[15px] max-w-md">
              Connettiti con altri proprietari di cani vicino a te. Incontri, passeggiate e nuove amicizie pensate per te e per il tuo cucciolo.
            </p>
            <Link href="/iscrizione" className="inline-block mt-8 px-8 py-3 bg-[#ff6b4a] text-white rounded-full font-semibold text-sm">
              Iscriviti
            </Link>
          </div>
          <div>
            <img src="/dogs-hero.jpg" alt="3 cani" className="w-full h-[380px] object-cover rounded-[1.5rem]" />
          </div>
        </div>
        <div className="mt-6 flex justify-between text-[11px] text-zinc-500 px-2">
          <p>Usiamo solo cookie tecnico per login. Niente pubblicità. Privacy</p>
          <span className="px-4 py-1 bg-[#ff6b4a]/20 text-[#ff6b4a] rounded-full">Accetta</span>
        </div>
      </section>
    </main>
  );
}
