import Link from "next/link"
import PartnerBanner from "./components/PartnerBanner"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">LeashLove 🐾</h1>
        <div className="flex gap-3">
          <Link href="/login" className="text-sm px-4 py-2">Entra</Link>
          <Link href="/register" className="text-sm bg-black text-white px-5 py-2 rounded-full">Iscriviti</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="text-center px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Dove i cani di Roma si incontrano.
        </h2>
        <p className="text-gray-600 mb-8">
          Progetto pilota gratuito per far socializzare il tuo cane nel tuo quartiere.
        </p>
        <Link href="/register" className="bg-black text-white px-8 py-4 rounded-full font-medium inline-block">
          Iscrivi il tuo cane gratis
        </Link>
        <p className="text-xs text-gray-400 mt-3">Fase pilota - 100% gratuito</p>
      </section>

      {/* BANNER PARTNER - QUI APPARE */}
      <PartnerBanner />

      {/* FOOTER */}
      <footer className="text-center py-10 text-sm text-gray-400">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/privacy" className="underline">Privacy</Link>
          <Link href="/termini" className="underline">Termini</Link>
        </div>
        <p>LeashLove - Progetto Pilota Roma 2026 - CF: SCCFNC82H29L117G</p>
      </footer>
    </main>
  )
}
