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
        <p className="text-white text-[23px] font-black mt-4 text-center px-6">Trova un nuovo amico al tuo cane</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  useEffect(() => { const t=setTimeout(()=>setShowSplash(false),2000); return()=>clearTimeout(t)},[])
  if(showSplash) return <SplashScreen />
  return (
    <main className="min-h-screen bg-[#FFFBF2]">
      <header className="bg-white max-w-7xl mx-auto flex justify-between items-center px-6 py-4 rounded-b-2xl shadow-sm">
        <div className="flex items-center gap-2"><span className="text-3xl">🐾</span><span className="font-black text-[28px] text-[#1E2A4A]">LeashLove</span></div>
        <a href="/login" className="px-6 py-2 border border-zinc-300 rounded-full text-sm font-bold text-zinc-600 bg-white">Accedi</a>
      </header>
      <section className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-[#FFF2C2] rounded-[28px] overflow-hidden grid md:grid-cols-2 items-center">
          <div className="p-7 md:p-10">
            <h1 className="text-[34px] md:text-[52px] font-black leading-[0.95] text-[#1E2A4A]">Trova un nuovo amico al tuo cane</h1>
            <p className="mt-4 text-[#1E2A4A]/70 text-[14px] max-w-sm">Connettiti con altri proprietari di cani vicino a te. Incontri, passeggiate e nuove amicizie pensate per te e per il tuo cucciolo.</p>
            <a href="/signup" className="inline-block mt-6 bg-[#FF8C1A] text-white rounded-xl px-8 py-3.5 font-black text-[18px]">Iscriviti</a>
          </div>
          <div className="h-[340px] md:h-[460px]">
            <img src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=900&auto=format&fit=crop" alt="Tre cani" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </main>
  )
}
