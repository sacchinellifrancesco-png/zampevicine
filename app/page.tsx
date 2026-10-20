"use client"
import { useState, useEffect } from "react"

function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDAB9] via-[#FF9A5C] to-[#FF7A2E]">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-white/25 rounded-full flex items-center justify-center mb-6">
          <span className="text-5xl">🐾</span>
        </div>
        <h1 className="text-6xl font-black text-white tracking-tight">LeashLove</h1>
        <p className="text-white text-[23px] font-black mt-4 tracking-tight text-center px-6">
          Trova un nuovo amico al tuo cane
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <SplashScreen />

  return (
    <main className="min-h-screen bg-[#FFFBF2]">
      {/* HEADER BIANCO - SOLO ACCEDI */}
      <nav className="bg-white flex justify-between items-center px-6 py-4 max-w-7xl mx-auto rounded-b-2xl">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐾</span>
          <span className="font-black text-[28px] tracking-tight text-[#1A2744]">LeashLove</span>
        </div>
        <a href="/login" className="text-sm font-bold px-7 py-2.5 border border-zinc-300 rounded-full bg-white text-zinc-700">
          Accedi
        </a>
      </nav>

      {/* SEZIONE BEIGE COME SCREENSHOT */}
      <section className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-[#FFF1C7]/70 rounded-[28px] p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center overflow-hidden">
          <div>
            <h1 className="text-[36px] md:text-[54px] font-black leading-[0.95] text-[#1A2744] tracking-tight">
              Trova un nuovo amico al tuo cane
            </h1>
            <p className="mt-4 text-[#1A2744]/70 text-[15px] md:text-[16px] leading-snug max-w-sm">
              Connettiti con altri proprietari di cani vicino a te. Incontri, passeggiate e nuove amicizie pensate per te e per il tuo cucciolo.
            </p>
            <a href="/signup" className="inline-block mt-6 bg-[#FF8C2F] text-white rounded-xl px-8 py-3.5 font-black text-[18px] shadow-sm">
              Iscriviti
            </a>
          </div>

          <div className="rounded-[24px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=1000&auto=format&fit=crop"
              alt="Tre cani: golden, labrador nero e corgi sul prato"
              className="w-full h-[320px] md:h-[420px] object-cover object-center"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
