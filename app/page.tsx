"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // INTRO 2 SECONDI - ARANCIONE PESCA
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FF8F6B] flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg">
            🐾
          </div>
          <h1 className="mt-5 text-white text-5xl font-bold tracking-wide">LeashLove</h1>
        </div>
      </main>
    );
  }

  // HOME
  return (
    <main className="min-h-screen bg-[#fffef9]">
      <header className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-[#4a5a8c] text-lg">
          <span>🐾</span> LeashLove
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 rounded-full border bg-white text-sm">Accedi</Link>
          <Link href="/iscrizione" className="px-5 py-2 rounded-full bg-[#FF8F6B] text-white text-sm font-semibold">Iscriviti</Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 mt-4">
        <div className="bg-[#FFF1C6]/70 rounded-[2rem] grid md:grid-cols-2 gap-8 items-center p-12">
          <div>
            <h1 className="text-5xl font-extrabold leading-[1.05] text-[#2f3a5a]">
              Trova un nuovo<br />amico al tuo cane
            </h1>
            <p className="mt-4 text-zinc-500 text-sm max-w-md leading-relaxed">
              Connettiti con altri proprietari di cani vicino a te. Incontri, passeggiate e nuove amicizie pensate per te e per il tuo cucciolo.
            </p>
            <Link href="/iscrizione" className="inline-block mt-8 px-8 py-3 bg-[#FF8F6B] text-white rounded-full text-sm font-semibold shadow">
              Iscriviti
            </Link>
          </div>
          <img src="/dogs-hero.jpg" alt="3 cani che corrono" className="w-full h-[380px] object-cover rounded-2xl" />
        </div>
      </section>
    </main>
  );
}
