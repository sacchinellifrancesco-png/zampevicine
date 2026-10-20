import Link from "next/link"

function PartnerBanner() {
  return (
    <section className="w-full bg-yellow-50 border-y border-yellow-200 py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
          I nostri partner - Fase Pilota Roma
        </p>
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left">
            <h3 className="font-bold text-lg">Il tuo negozio / clinica qui?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Stiamo selezionando 3 partner a Roma per la fase pilota gratuita.
            </p>
          </div>
          <Link 
            href="/partner"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap"
          >
            Diventa Partner
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">LeashLove 🐾</h1>
        <div className="flex gap-3">
          <Link href="/login" className="text-sm px-4 py-2">Entra</Link>
          <Link href="/register" className="text-sm bg-black text-white px-5 py-2 rounded-full">Iscriviti</Link>
        </div>
      </header>

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

      <PartnerBanner />

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
