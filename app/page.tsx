'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-4xl font-bold mb-2">Zampe Vicine 🐾</h1>
      <p className="text-gray-600 mb-10">Trova dog sitter vicino a te</p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/entra" className="bg-black text-white text-center py-4 rounded-xl font-bold">Entra</Link>
        <Link href="/iscriviti" className="border-2 border-black text-center py-4 rounded-xl font-bold">Iscriviti</Link>
      </div>
    </main>
  );
}
