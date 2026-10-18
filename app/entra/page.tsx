export default function Entra() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <a href="/" className="font-black text-xl">🐾 Zampe Vicine</a>
        <h1 className="text-3xl font-black mt-8">Bentornato!</h1>
        <input placeholder="Email" className="mt-6 w-full p-4 rounded-2xl border bg-zinc-50" />
        <input placeholder="Password" type="password" className="mt-3 w-full p-4 rounded-2xl border bg-zinc-50" />
        <a href="/mappa" className="mt-4 block w-full text-center p-4 rounded-2xl bg-black text-white font-bold">Entra e vai alla Mappa</a>
        <p className="mt-4 text-center text-sm">Non hai account? <a href="/iscriviti" className="underline font-bold">Iscriviti</a></p>
      </div>
    </main>
  )
}
