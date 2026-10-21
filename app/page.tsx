"use client"
import { useState, useEffect } from "react"

function Splash() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDAB9] via-[#FF9A5C] to-[#FF7A2E]">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-white/25 rounded-full flex items-center justify-center mb-6">
          <span className="text-5xl">🐾</span>
        </div>
        <h1 className="text-6xl font-black text-white">LeashLove</h1>
        <p className="text-white text-[23px] font-black mt-4 text-center px-6">Trova un nuovo amico al tuo cane</p>
      </div>
    </div>
  )
}

function Cookie() {
  const [v, setV] = useState(true)
  if (!v) return null
  return (
    <div className="fixed bottom-3 left-3 right-3 md:left-6 md:right-6 bg-[#FFF2C2] border border-[#FFE9A0] rounded-2xl shadow-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 z-50">
      <p className="text-[#1E2A4A] text-[13px]"><b>Questo sito utilizza i cookie</b> per migliorare la tua esperienza. Puoi accettare o rifiutare.</p>
      <div className="flex gap-2 w-full md:w-auto">
        <button onClick={() => setV(false)} className="flex-1 px-5 py-2.5 rounded-xl bg-white border-2 border-[#1E2A4A] text-[#1E2A4A] font-bold text-sm">Rifiuta</button>
        <button onClick={() => setV(false)} className="flex-1 px-6 py-2.5 rounded-xl bg-[#FF8C42] text-white font-black text-sm">Accetta</button>
      </div>
    </div>
  )
}

export default function Home() {
  const [s, setS] = useState(true)
  useEffect(() => { const t = setTimeout(() => setS(false), 2000); return () => clearTimeout(t) }, [])
  if (s) return <Splash />
  return (
    <main className="min-h-screen bg-[#FFFBF2]">
      <header className="bg-white max-w-7xl mx-auto flex justify-between items-center px-6 py-4 rounded-b-2xl shadow-sm mt-2 mx-4 md:mx-auto">
        <div className="flex items-center gap-2"><span className="text-3xl">🐾</span><span className="font-black text-[28px] text-[#1E2A4A]">LeashLove</span></div>
        <div className="flex gap-3">
          <a href="/login" className="px-6 py-2 border-2 border-[#1E2A4A] rounded-xl text-sm font-bold text-[#1E2A4A] bg-white">Accedi</a>
          <a href="/signup" className="px-6 py-2 bg-[#FF8C42] rounded-xl text-sm font-bold text-white">Iscriviti</a>
        </div>
      </header>
      <section className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-[#FFF2C2] rounded-[28px] overflow-hidden grid md:grid-cols-2 items-center p-2 md:p-3">
          <div className="p-6 md:p-10">
            <h1 className="text-[34px] md:text-[52px] font-black leading-[0.95] text-[#1E2A4A]">Trova un nuovo amico al tuo cane</h1>
            <p className="mt-4 text-[#1E2A4A]/80 text-[14px] max-w-sm">Connettiti con altri proprietari di cani vicino a te. Incontri, passeggiate e nuove amicizie pensate per te e per il tuo cucciolo.</p>
            <a href="/signup" className="inline-block mt-6 bg-[#FF8C42] text-white rounded-xl px-8 py-3.5 font-black text-[18px]">Iscriviti</a>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[320px] md:h-[460px]">
            <img src="/dogs-hero%20(2).jpg" alt="Tre cani che giocano sul prato" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
      <Cookie />
    </main>
  )
}
