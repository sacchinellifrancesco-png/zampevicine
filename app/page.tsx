export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-28 h-28 md:w-36 md:h-36 bg-black rounded-[2.2rem] flex items-center justify-center text-6xl md:text-7xl shadow-xl -rotate-3">🐾</div>
      <h1 className="mt-8 text-6xl font-black tracking-tight">Benvenuto</h1>
      <p className="mt-3 text-2xl font-bold">Zampe Vicine</p>
      <p className="mt-2 max-w-sm text-zinc-500">Il quartiere per il tuo cane. Trova amici vicino a te, davvero.</p>
      
      <div className="mt-10 w-full max-w-xs space-y-3">
        <a href="/iscriviti" className="block w-full p-5 rounded-full bg-black text-white font-black text-lg">Crea profilo cane + padrone</a>
        <a href="/entra" className="block w-full p-5 rounded-full bg-white border-2 border-black font-black text-lg">Entra</a>
        <a href="/mappa" className="block text-sm text-zinc-500 mt-2 underline">Guarda la mappa come ospite →</a>
      </div>
    </main>
  )
}
