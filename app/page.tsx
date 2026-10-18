export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-black">🐾 Leash Love</h1>
      <p className="mt-2 text-zinc-600">Incontri per cani vicini a Roma</p>
      <div className="mt-8 flex flex-col gap-3 w-full max-w-[320px]">
        <a href="/iscriviti" className="p-4 rounded-full bg-black text-white font-black text-center">Iscriviti</a>
        <a href="/entra" className="p-4 rounded-full bg-white border font-black text-center">Entra</a>
      </div>
      <div className="mt-8 flex gap-4 text-xs underline text-zinc-500">
        <a href="/privacy">Privacy</a>
        <a href="/termini">Termini</a>
      </div>
    </main>
  )
}
