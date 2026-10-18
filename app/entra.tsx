'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Entra(){
  const [p,setP]=useState(''); const [pw,setPw]=useState(''); const r=useRouter();
  const login=(e:any)=>{e.preventDefault(); const u=JSON.parse(localStorage.getItem('zv_users')||'[]'); const f=u.find((x:any)=>x.padrone===p && x.password===pw); if(!f){alert('Dati errati');return;} localStorage.setItem('zv_current',JSON.stringify(f)); r.push('/mappa');};
  return (
    <main className="min-h-screen p-6 max-w-md mx-auto bg-white">
      <h1 className="text-2xl font-bold mb-6">Entra</h1>
      <form onSubmit={login} className="flex flex-col gap-4">
        <input required placeholder="Nome padrone" className="border p-3 rounded" value={p} onChange={e=>setP(e.target.value)}/>
        <input required type="password" placeholder="Password" className="border p-3 rounded" value={pw} onChange={e=>setPw(e.target.value)}/>
        <button className="bg-black text-white py-3 rounded-xl font-bold">Entra</button>
      </form>
    </main>
  );
}
