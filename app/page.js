import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-black">LeashLove 🐾</h1>
      <p className="mt-3 text-zinc-500">Trova cani vicino a te con GPS live</p>
      <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
        <Link href="/iscrizione" className="bg-[#FF8F6B] text-white p-4 rounded-2xl font-bold text-center">Iscriviti</Link>
        <Link href="/accedi" className="bg-white border p-4 rounded-2xl font-bold text-center">Accedi</Link>
        <Link href="/vicino" className="bg-black text-white p-4 rounded-2xl font-bold text-center">Vedi cani vicino</Link>
        <Link href="/admin" className="text-sm text-zinc-400 mt-4">Admin</Link>
      </div>
    </div>
  );
}
