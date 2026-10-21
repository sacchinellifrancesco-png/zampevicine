import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">🐾 ZampeVicine</h1>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 rounded-full border">Accedi</Link>
          <Link href="/iscrizione" className="px-5 py-2 rounded-full bg-amber-500 text-white">Iscriviti</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center pt-10">
        <div>
          <h2 className="text-5xl font-extrabold">Trova il<br/>compagno perfetto<br/><span className="text-amber-500">a 4 zampe</span></h2>
          <p className="mt-6 text-lg text-zinc-600">Scorri da 300 metri a 150 km. Chat solo dopo il match.</p>
          <div className="mt-8 flex gap-4">
            <Link href="/match" className="px-8 py-3 bg-zinc-900 text-white rounded-full">Inizia a scorrere</Link>
            <Link href="/vicino" className="px-8 py-3 bg-white border rounded-full">Chi è vicino</Link>
          </div>
        </div>
        <div><img src="/dogs-hero.jpg" alt="3 cani" className="rounded-[2rem] shadow-2xl w-full h-[520px] object-cover" /></div>
      </section>
    </main>
  );
}
