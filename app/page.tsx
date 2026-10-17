'use client';

import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';

const Map = dynamicImport(() => import('./map'), { 
  ssr: false,
  loading: () => <div style={{height:'400px', background:'#f3f3f3', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center'}}>Caricamento mappa...</div>
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
