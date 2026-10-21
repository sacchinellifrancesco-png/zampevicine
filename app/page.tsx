import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="font-black text-xl tracking-tight">Zampevicine 🐾</div>
        <div className="flex gap-2">
          <Link href="/login" className="px-5 py-2.5 rounded-full border bg-white text-sm font-medium">Accedi</Link>
          <Link href="/iscriviti" className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium">Iscriviti</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-16 md:mt-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-black leading-[0.95]">Trova il compagno perfetto per il tuo cane.</h1>
          <p className="text-gray-600 mt-5 text-lg">La prima app di incontri per cani vicino a te a Roma. Parchi, razze, carattere.</p>
          <Link href="/iscriviti" className="inline-block mt-8 px-8 py-4 rounded-full bg-black text-white font-semibold text-lg">Inizia ora - È gratis</Link>
          <p className="text-xs text-gray-400 mt-3">Niente spam, solo code che scodinzolano.</p>
        </div>
        <div className="bg-white border rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
          <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-6xl">🐶</div>
          <div className="mt-6">
            <div className="font-bold">Luna, 2 anni - Labrador</div>
            <div className="text-sm text-gray-500">Prati • Socievole • Ama l'acqua</div>
          </div>
        </div>
      </main>
    </div>
  )
}
