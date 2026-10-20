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
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-50">
      <div className="flex gap-3">
        <div className="text-2xl">🍪</div>
        <div>
          <p className="font-bold text-zinc-900 text-sm">Solo cookie tecnici</p>
          <p className="text-zinc-600 text-xs md:text-sm mt-0.5">
            Usiamo solo cookie per farti fare login. Niente pubblicità, niente tracciamento. <a href="/privacy" className="underline">Privacy</a>
          </p>
        </div>
      </div>
      <button onClick={() => setVisible(false)} className="bg-zinc-900 text-white rounded-full px-6 py-2.5 font-bold text-sm whitespace-nowrap">
        Ok, ho capito
      </button>
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
      {/* HEADER - SOLO ACCEDI IN ALTO A DX */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐾</span>
          <span className="font-black text-[26px] tracking-tight text-zinc-900">LeashLove</span>
        </div>
        <a href="/login" className="text-sm font-bold px-6 py-2.5 border border-zinc-300 rounded-full bg-white">
          Accedi
        </a>
      </nav>

      {/* HERO IDENTICA A QUELLA CHE HAI LINKATO - MA CON ISCRIVITI ARANCIONE */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl md:text-[64px] font-black leading-[0.9] text-zinc-900 tracking-tight">
            Trova un nuovo<br/>amico al tuo cane
          </h1>
          <p className="mt-6 text-zinc-600 text-lg max-w-md">
            Connetti il tuo cane con nuovi amici nella tua zona. Passeggiate, parchi e incontri pensati per voi.
          </p>
          <a href="/signup" className="inline-block mt-8 bg-[#FF7A2E] text-white rounded-full px-10 py-4 font-black text-lg shadow-lg">
            Iscriviti
          </a>
        </div>

        <div className="rounded-[32px] overflow-hidden shadow-2xl bg-white">
          <img 
            src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=1000&auto=format&fit=crop"
            alt="Tre cani reali sul prato verde"
            className="w-full h-[420px] md:h-[520px] object-cover"
          />
        </div>
      </section>

      <CookieBanner />
    </main>
  )
}
