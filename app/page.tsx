import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffef9]">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span>🐾</span> ZampeVicine
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 rounded-full border border-zinc-300 bg-white text-sm">
            Accedi
          </Link>
          <Link href="/iscrizione" className="px-5 py-2 rounded-full bg-[#ff6b4a] text-white text-sm font-semibold">
            Iscriviti
          </Link>
        </div>
      </header>

      {/* HERO come nello screen */}
      <section className="max-w-7xl mx-auto px-8 mt-6">
        <div className="bg-[#fef3c7]/60 rounded-[2rem] grid md:grid-cols-2 gap-10 items-center p-10 md:p-14">
          {/* SINISTRA TESTO */}
          <div>
            <h1 className="text-[2.6rem] md:text-5xl font-extrabold leading-[1.1] text-zinc-800">
              Trova un nuovo<br />amico al tuo cane
            </h1>
            <p className="mt-5 text-zinc-600 text-[15px] leading-relaxed max-w-md">
              Connettiti con altri proprietari di cani vicino a te. Incontri, passeggiate e nuove amicizie pensate per te e per il tuo cucciolo.
            </p>
            <Link href="/iscrizione" className="inline-block mt-8 px-8 py-3 bg-[#ff6b4a] text-white rounded-full font-semibold text-sm">
              Iscriviti
            </Link>
          </div>

          {/* DESTRA FOTO */}
          <div>
            <img 
              src="/dogs-hero.jpg" 
              alt="3 cani che corrono" 
              className="w-full h-[380px] object-cover rounded-[1.5rem] shadow-sm"
            />
          </div>
        </div>

        {/* BANNER COOKIE come nello screen */}
        <div className="mt-6 flex justify-between items-center text-[11px] text-zinc-500 px-2">
          <p>Usiamo solo cookie tecnico per login. Niente pubblicità. <span className="underline">Privacy</span></p>
          <button className="px-4 py-1.5 bg-[#ff6b4a]/20 text-[#ff6b4a] rounded-full text-xs">Accetta</button>
        </div>
      </section>
    </main>
  );
}
