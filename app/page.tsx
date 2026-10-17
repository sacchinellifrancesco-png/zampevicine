'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('./components/Map'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 rounded-xl flex items-center justify-center">Caricamento mappa...</div>
});

export default function Home() {
  const [city, setCity] = useState('');

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Zampe Vicine 🐾</h1>
        <p className="text-gray-600 mb-6">Trova dog sitter vicino a te</p>

        <div className="mb-6 flex gap-2">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Inserisci città..."
            className="border p-3 rounded-lg flex-1"
          />
          <button className="bg-black text-white px-6 rounded-lg">
            Cerca
          </button>
        </div>

        <Map />
      </div>
    </main>
  );
}
