import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="font-bold text-xl">Zampevicine</div>
        <div className="flex gap-3">
          <Link href="/accedi" className="px-4 py-2 rounded border text-sm">
            Accedi
          </Link>
          <Link href="/iscriviti" className="px-4 py-2 rounded bg-black text-white text-sm">
            Iscriviti
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-6 mt-24">
        <h1 className="text-5xl font-bold mb-4">Trova il compagno per il tuo cane</h1>
        <p className="text-gray-600 mb-8 max-w-xl">
          La prima app di incontri per cani vicino a te.
        </p>
        <Link href="/iscriviti" className="px-8 py-4 rounded-full bg-black text-white text-lg font-semibold">
          Inizia ora - Iscriviti Gratis
        </Link>
      </main>
    </div>
  )
}
