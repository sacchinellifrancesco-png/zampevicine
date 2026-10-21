import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf3]">
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="font-bold text-lg">ZampeVicine</span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 rounded-full border bg-white text-sm">Accedi</Link>
          <Link href="/iscrizione" className="px-5 py-2 rounded-full bg-amber-500 text-white text-sm font-semibold">Iscriviti</Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 text-center pt-4">
        <img src="/dogs-hero.jpg" alt="3 cani" className="w-full h-[580px] object-cover rounded-[2.5rem] shadow-xl" />
        
        <div className="mt-10">
          <Link href="/iscrizione" className="inline-block px-12 py-4 bg-zinc-900 text-white rounded-full font-bold text-lg">
            Iscriviti
          </Link>
          <p className="mt-3 text-xs text-zinc-500">Iscrivendoti accetti privacy e termini</p>
        </div>
      </section>
    </main>
  );
}
