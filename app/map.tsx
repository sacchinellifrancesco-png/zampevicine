'use client';
import dynamicImport from 'next/dynamic';
import { useEffect, useState } from 'react';
const Map = dynamicImport(()=>import('../map'),{ssr:false});
export default function Mappa(){
  const [c,setC]=useState<any>(null);
  useEffect(()=>{ const s=localStorage.getItem('zv_current'); if(s) setC(JSON.parse(s)); },[]);
  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto bg-white">
      <h1 className="text-xl font-bold">Ciao {c?.padrone} e {c?.cane} 🐾</h1>
      <p className="text-sm text-gray-600 mb-4">{c?`${c.taglia} • ${c.eta} • ${c.carattere}`:'...'}</p>
      <Map />
    </main>
  );
}
