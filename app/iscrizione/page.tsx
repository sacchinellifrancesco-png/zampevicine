"use client";
import { useState } from "react";
import Link from "next/link";

export default function IscrizioneLeashLove() {
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    nomeCane: "",
    taglia: "",
    citta: "",
    q1: "",
    q2: "",
    q3: "",
    descrizione: "",
    email: "",
    password: ""
  });

  function classifica() {
    if (form.q3 === "ringhia") return "Competitivo";
    if (form.q1 === "curioso" && form.q2 === "troppa") return "Reattivo";
    if (form.q1 === "curioso" && form.q2 === "giusta") return "Equilibrato";
    if (form.q2 === "poca" && form.q1 === "curioso") return "Indipendente";
    if (form.q1 === "spaventa" && form.q2 === "poca") return "Timoroso";
    if (form.q1 === "spaventa") return "Insicuro";
    return "Equilibrato";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.q1 || !form.q2 || !form.q3) { alert("Seleziona le 3 caratteristiche del cane"); return; }
    if (form.password.length < 8) { alert("Password minimo 8 caratteri"); return; }
    setOk(true);
  };

  if (ok) {
    const profilo = classifica();
    return (
      <main className="min-h-screen bg-[#fffef9] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border shadow max-w-md w-full text-center">
          <h2 className="text-xl font-bold">Fatto! LeashLove</h2>
          <p className="mt-2 text-sm">{form.nomeCane} - {form.taglia} - {profilo}</p>
          <p className="mt-1 text-xs text-zinc-500">{form.citta} • {form.descrizione.slice(0,80)}...</p>
          <Link href="/" className="inline-block mt-6 px-8 py-3 bg-[#FF8F6B] text-white rounded-full">Vai alla Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffef9] pb-10">
      <header className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-[#4a5a8c]">🐾 LeashLove</Link>
      </header>

      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#2f3a5a]">Iscriviti a LeashLove</h1>

        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-2xl border space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold">Il tuo nome</label><input required value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm" placeholder="Es. Marco" /></div>
            <div><label className="text-xs font-semibold">Nome cane</label><input required value={form.nomeCane} onChange={e=>setForm({...form,nomeCane:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm" placeholder="Es. Luna" /></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Taglia</label>
              <select required value={form.taglia} onChange={e=>setForm({...form,taglia:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm bg-white">
                <option value="">Seleziona</option><option value="piccola">Piccola</option><option value="media">Media</option><option value="grande">Grande</option><option value="grandissima">Grandissima</option>
              </select>
            </div>
            <div><label className="text-xs font-semibold">Città in cui abiti</label><input required value={form.citta} onChange={e=>setForm({...form,citta:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm" placeholder="Es. Roma" /></div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm font-bold">Le 3 caratteristiche del cane</p>
            
            <div className="mt-3">
              <label className="text-xs">1. Come reagisce alle novità?</label>
              <div className="flex gap-2 mt-1">
                <button type="button" onClick={()=>setForm({...form,q1:"curioso"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q1==="curioso"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>👀 Si incuriosisce</button>
                <button type="button" onClick={()=>setForm({...form,q1:"spaventa"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q1==="spaventa"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>😨 Si spaventa</button>
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs">2. Quanta energia ha al parco?</label>
              <div className="flex gap-2 mt-1">
                <button type="button" onClick={()=>setForm({...form,q2:"troppa"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q2==="troppa"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>⚡️ Troppa</button>
                <button type="button" onClick={()=>setForm({...form,q2:"giusta"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q2==="giusta"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>✅ Giusta</button>
                <button type="button" onClick={()=>setForm({...form,q2:"poca"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q2==="poca"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>🐢 Poca</button>
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs">3. Se gli togli gioco / ciotola?</label>
              <div className="flex gap-2 mt-1">
                <button type="button" onClick={()=>setForm({...form,q3:"ringhia"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q3==="ringhia"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>😬 Ringhia / si irrigidisce</button>
                <button type="button" onClick={()=>setForm({...form,q3:"lascia"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q3==="lascia"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>🤷 Lascia perdere</button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Descrizione del cane e come interagisce con te</label>
            <textarea required value={form.descrizione} onChange={e=>setForm({...form,descrizione:e.target.value})} rows={4} placeholder="Es. Luna è dolcissima, mi segue ovunque in casa, adora i bambini, tira un po' al guinzaglio ma..." className="w-full mt-1 p-3 border rounded-xl text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold">Email</label><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm" /></div>
            <div><label className="text-xs font-semibold">Password (8 caratteri)</label><input required minLength={8} type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm" /></div>
          </div>

          <button type="submit" className="w-full py-3 bg-[#FF8F6B] text-white rounded-full font-bold">Iscriviti a LeashLove</button>
        </form>
      </div>
    </main>
  );
}
