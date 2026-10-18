export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFBF0] text-zinc-900">
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <span className="font-black text-2xl">🐾 Zampe Vicine</span>
        <div className="flex gap-3">
          <a href="/entra" className="px-4 py-2 rounded-full border">Entra</a>
          <a href="/iscriviti" className="px-5 py-2 rounded-full bg-black text-white">Iscriviti</a>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9]">Il quartiere<br/>per il tuo cane.</h1>
          <p className="mt-6 text-xl text-zinc-600">Trova amici a 4 zampe vicino a te, organizza passeggiate, scopri i parchi dog-friendly di Roma.</p>
          <div className="mt-8 flex gap-3">
            <a href="/mappa" className="px-8 py-4 bg-[#FF6B2C] text-white rounded-full font-bold text-lg">Apri la Mappa</a>
            <a href="/iscriviti" className="px-8 py-4 bg-white border rounded-full font-bold text-lg">Crea profilo cane</a>
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border">
          <p className="font-bold">🐶 Vicino a te ora</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-2xl"><span className="text-2xl">🦮</span><div><p className="font-bold">Luna, 2 anni</p><p className="text-sm text-zinc-500">Prati - 200m - Cerca compagni di corsa</p></div></div>
            <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-2xl"><span className="text-2xl">🐕</span><div><p className="font-bold">Rocky, 4 anni</p><p className="text-sm text-zinc-500">Vaticano - 450m - Molto socievole</p></div></div>
          </div>
        </div>
      </section>
    </main>
  )
}
