
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Iscriviti() {
  const r = useRouter();
  const [f,setF] = useState({padrone:'',password:'',cane:'',taglia:'Media',eta:'Adulto',carattere:'Giocherellone',vaccinato:true,socievole:true,guinzaglio:true});
  const submit = (e:any)=>{e.preventDefault(); const u=JSON.parse(localStorage.getItem('zv_users')||'[]'); if(u.find((x:any)=>x.padrone===f.padrone)){alert('Username già usato');return;} u.push(f); localStorage.setItem('zv_users',JSON.stringify(u)); localStorage.setItem('zv_current',JSON.stringify(f)); r.push('/mappa');};
  return (
    <main className="min-h-screen p-6 max-w-md mx-auto bg-white">
      <h1 className="text-2xl font-bold mb-6">Iscriviti - senza razza</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input required placeholder="Nome padrone (username)" className="border p-3 rounded" value={f.padrone} onChange={e=>setF({...f,padrone:e.target.value})}/>
        <input required type="password" placeholder="Password" className="border p-3 rounded" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/>
        <input required placeholder="Nome del cane" className="border p-3 rounded" value={f.cane} onChange={e=>setF({...f,cane:e.target.value})}/>
        <select className="border p-3 rounded" value={f.taglia} onChange={e=>setF({...f,taglia:e.target.value})}><option>Piccola</option><option>Media</option><option>Grande</option></select>
        <select className="border p-3 rounded" value={f.eta} onChange={e=>setF({...f,eta:e.target.value})}><option>Cucciolo</option><option>Adulto</option><option>Anziano</option></select>
        <select className="border p-3 rounded" value={f.carattere} onChange={e=>setF({...f,carattere:e.target.value})}><option>Tranquillo</option><option>Energico</option><option>Giocherellone</option><option>Timido</option></select>
        <label className="flex gap-2"><input type="checkbox" checked={f.vaccinato} onChange={e=>setF({...f,vaccinato:e.target.checked})}/> Vaccinato</label>
        <label className="flex gap-2"><input type="checkbox" checked={f.socievole} onChange={e=>setF({...f,socievole:e.target.checked})}/> Va d'accordo con altri cani</label>
        <label className="flex gap-2"><input type="checkbox" checked={f.guinzaglio} onChange={e=>setF({...f,guinzaglio:e.target.checked})}/> Abituato al guinzaglio</label>
        <button className="bg-black text-white py-3 rounded-xl mt-4 font-bold">Crea account</button>
      </form>
    </main>
  );
}
