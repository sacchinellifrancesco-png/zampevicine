"use client"
import { useState, useEffect } from "react"
import SplashScreen from "./components/SplashScreen"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <SplashScreen />

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF7ED] to-[#FFEDD5]">
      {/* HEADER SISTEMATO - SOLO 2 BOTTONI */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="font-bold text-xl">🐾 LeashLove</div>
        <div className="flex gap-3 items-center">
          <a href="/login" className="text-sm font-semibold px-4 py-2">Accedi</a>
          <a href="/signup" className="text-sm font-semibold px-5 py-2.5 bg-zinc-900 text-white rounded-full">Iscriviti</a>
        </div>
      </nav>

      {/* HERO - SENZA DOPPI BOTTONI */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <h1 className="text-5xl md:text-7xl font-black leading-[0.9]">
          Trova un nuovo<br/>amico al tuo cane
        </h1>
        <div className="mt-8">
          <a href="/signup" className="inline-block bg-zinc-900 text-white rounded-full px-10 py-4 font-bold text-lg">
            Inizia gratis
          </a>
        </div>
      </section>
    </main>
  )
}
