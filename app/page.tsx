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

function CookieBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-50">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">🍪</div>
        <div>
          <p className="font-black text-zinc-900 text-[16px]">Utilizziamo i cookie</p>
          <p className="text-zinc-600 text-[13px] mt-1 max-w-xl leading-snug">
            Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico. Puoi gestire le preferenze o accettare tutti i cookie.
          </p>
        </div>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <button onClick={() => setVisible(false)} className="flex-1 md:flex-none px-6 py-3 rounded-full border border-zinc-200 font-bold text-sm bg-zinc-50">
          Impostazioni
        </button>
        <button onClick={() => setVisible(false)} className="flex-1 md:flex-none px-8 py-3 rounded-full bg-[#FF7A2E] text-white font-black text-sm shadow-lg">
          Accetta
        </button>
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
    <main className="min-h-screen bg-[#FFF8EC]">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐾</span>
          <span className="font-black text-[26px] tracking-tight text-zinc-900">LeashLove</span>
        </div>
        <a href="/login" className="text-sm font-bold px-6 py-2.5 border border-zinc-300 rounded-full bg-white">
          Accedi
        </a>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-32 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl md:text-[64px] font-black leading-[0.9] text-zinc-900 tracking-tight">
            Trova un nuovo<br/>amico al tuo cane
          </h1>
          <p className="mt-6 text-zinc-600 text-lg max-w-md">
            Connetti il tuo cane con nuovi amici nella tua zona.
          </p>
          <a href="/signup" className="inline-block mt-8 bg-[#FF7A2E] text-white rounded-full px-10 py-4 font-black text-lg shadow-lg">
            Iscriviti
          </a>
        </div>
        <div className="rounded-[32px] overflow-hidden shadow-2xl bg-white">
          <img src="/dogs-hero.jpg" alt="Tre cani felici" className="w-full h-[420px] md:h-[520px] object-cover" />
        </div>
      </section>

      <CookieBanner />
    </main>
  )
}
