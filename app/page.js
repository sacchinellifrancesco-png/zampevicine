import Link from "next/link"
export default function Home(){
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-5xl font-black mb-2">🐾 Leash Love</h1>
      <p className="text-gray-500 mb-10">Programma fedeltà</p>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Link href="/cliente" className="bg-black text-white p-4 rounded-2xl text-center font-bold">Sono un cliente → Vedi punti</Link>
        <Link href="/admin" className="bg-white border p-4 rounded-2xl text-center font-bold">Sono staff → Admin</Link>
      </div>
      <div className="mt-12 flex gap-4 text-xs text-gray-400">
        <Link href="/privacy">Privacy</Link><Link href="/termini">Termini</Link><Link href="/cookie">Cookie</Link>
      </div>
    </div>
  )
}
