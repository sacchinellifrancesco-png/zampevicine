"use client"
import { useState, useEffect } from "react"

function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDAB9] to-[#FF8C42]">
      <div className="flex flex-col items-center animate-pulse">
        <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🐾</span>
        </div>
        <h1 className="text-5xl font-black text-white">LeashLove</h1>
        <p className="text-white/90 mt-3 font-medium">Trova un nuovo amico al tuo cane</p>
        <div className="flex gap-2 mt-12">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <SplashScreen />

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-[#FFEDD5] to-[#FFD8B5]">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="font-bold text-xl">🐾 LeashLove</div>
        <div className="flex gap-3 items-center">
          <a href="/login" className="text-sm font-semibold px-4 py-2">Accedi</a>
          <a href="/signup" className="text-sm font-semibold px-5 py-2.5 bg-zinc-900 text-white rounded-full">Iscriviti</a>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-20">
        <h1 className="text-5xl md:text-7xl font-black leading-[0.9] text-zinc-900">
          Trova un nuovo<br/>amico al tuo cane
        </h1>
        <p className="mt-6 text-zinc-600 text-lg max-w-lg">
          Connetti il tuo cane con nuovi amici nella tua zona.
        </p>
        <div className="mt-8">
          <a href="/signup" className="inline-block bg-zinc-900 text-white rounded-full px-10 py-4 font-bold text-lg">
            Inizia gratis
          </a>
        </div>
      </section>
    </main>
  )
}
