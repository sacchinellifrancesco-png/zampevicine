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
        <p className="text-white text-[23px] font-black mt-4 text-center px-6">
          Trova un nuovo amico al tuo cane
        </p>
      </div>
    </div>
  )
}

function CookieBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="fixed bottom-3 left-3 right-3 md:left-6 md:right-6 bg-[#FFF2C2] border border-[#FFE9A0] rounded-2xl shadow-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 z-50">
      <p className="text-[#1E2A4A] text-[13px] md:text-[14px] leading-snug">
        <span className="font-bold">Questo sito utilizza i cookie</span> per migliorare la tua esperienza. Puoi accettare o rifiutare i cookie non essenziali.
      </p>
      <div className="flex gap-2 w-full md:w-auto">
        <button onClick={() => setVisible(false)} className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-white border-2 border-[#1E2A4A] text-[#1E2A4A] font-bold text-sm">
          Rifiuta
        </button>
        <button onClick={() => setVisible(false)} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#FF7A11] text-white font-black text-sm shadow">
          Accetta
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(t)
  }, [])
  if (showSplash) return <SplashScreen />

  return (
    <main className="min-h-screen bg-[#FFFBF2]">
      {/* HEADER */}
      <header className="bg-white max-w-7xl mx-auto flex justify-between items-center px-6 py-4 rounded-b-2xl shadow-sm mt-2 mx-4 md:mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐾</span>
          <span className="font-black text-[28px] tracking-tight text-[#1E2A4A]">LeashLove</span>
        </div>
        <a href="/login" className="px-6 py-2 border-2 border-[#1E2A4A] rounded-xl text-sm font-bold text-[#1E2A4A] bg-white">
          Accedi
        </a>
      </header>

      {/* HERO BEIGE CON 3 CANI */}
      <section className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-[#FFF2C2] rounded-[28px] overflow-hidden grid md:grid-cols-2 items-center p-2 md:p-3">
          <div className="p-6 md:p-10">
            <h1 className="text-[34px] md:text-[52px] font-black leading-[0.95] text-[#1E2A4A] tracking-tight">
              Trova un nuovo amico al tuo cane
            </h1>
            <p className="mt-4 text-[#1E2A4A]/80 text-[14px] md:text-[15px] leading-snug max-w-sm">
              Connettiti con altri proprietari di cani vicino a te. Incontri, passeggiate e nuove amicizie pensate per te e per il tuo cucciolo.
            </p>
            <a href="/signup" className="inline-block mt-6 bg-[#FF7A11] text-white rounded-xl px-8 py-3.5 font-black text-[18px] shadow-md">
              Iscriviti
            </a>
          </div>

          <div className="rounded-[20px] overflow-hidden h-[320px] md:h-[460px] m-1 md:m-0">
            <img 
              src="/dogs-hero.jpg"
              alt="Tre cani sul prato - golden, labrador nero e corgi"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <CookieBanner />
    </main>
  )
}
