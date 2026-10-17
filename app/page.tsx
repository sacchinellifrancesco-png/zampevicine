'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 rounded-xl flex items-center justify-center">Caricamento mappa...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Zampe Vicine 🐾</h1>
        <p className="text-gray-600 mb-6">Trova dog sitter vicino a te</p>
        <Map />
      </div>
    </main>
  );
}
