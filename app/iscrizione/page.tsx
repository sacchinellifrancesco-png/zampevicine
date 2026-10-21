"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Iscrizione() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const classifica = () => {
    if (form.q3 === "ringhia") return "Competitivo";
    if (form.q1 === "curioso" && form.q2 === "troppa") return "Reattivo";
    if (form.q1 === "curioso" && form.q2 === "giusta") return "Equilibrato";
    if (form.q2 === "poca") return "Timoroso";
    return "Equilibrato";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.q1 || !form.q2 || !form.q3) {
      alert("Seleziona le 3 caratteristiche");
      return;
    }
    if (form.password.length < 8) {
      alert("Password minimo 8 caratteri");
      return;
    }
    setLoading(true);
    const profilo = classifica();
    const { error } = await supabase.from("profiles").insert([{
      nome: form.nome,
      nome_cane: form.nomeCane,
      taglia: form.taglia,
      citta: form.citta,
      q1: form.q1,
      q2: form.q2,
      q3: form.q3,
      profilo: profilo,
      descrizione: form.descrizione,
      email: form.email,
      proprietario: form.nome
    }]);

    setLoading(false);
    if (error) {
      alert("ERRORE SUPABASE: " + error.message);
      return;
    }
    setOk(true);
  };

  if (ok) {
    return (
      <main className="min-h-screen bg-[#fffef9] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border shadow text-center max-w-md w-full">
          <h2 className="text-xl font-bold">Fatto! LeashLove</h2>
          <p className="mt-2">{form.nomeCane} - {form.taglia} - {classifica()}</p>
          <p className="text-xs text-zinc-500 mt-1">Salvata su Supabase</p>
          <Link href="/" className="mt-6 inline-block px-8 py-3 bg-[#FF8F6B] text-white rounded-full">Vai alla Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffef9] pb-10">
      <header className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-[#4a5a8c]">🐾 LeashLove</Link>
        <Link href="/" className="text-sm">← Home</Link>
      </header>

      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#2f3a5a]">Iscriviti a LeashLove</h1>
        
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-2xl border space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Il tuo nome</label>
              <input required value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} placeholder="Es. Francesco" className="w-full mt-1 p-3 border rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold">Nome cane</label>
              <input required value={form.nomeCane} onChange={e=>setForm({...form,nomeCane:e.target.value})} placeholder="Es. Hope" className="w-full mt-1 p-3 border rounded-xl text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Taglia</label>
              <select required value={form.taglia} onChange={e=>setForm({...form,taglia:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm bg-white">
                <option value="">Seleziona</option>
                <option value="piccola">Piccola</option>
                <option value="media">Media</option>
                <option value="grande">Grande</option>
                <option value="grandissima">Grandissima</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold">Città</label>
              <input required value={form.citta} onChange={e=>setForm({...form,citta:e.target.value})} placeholder="Es. Roma" className="w-full mt-1 p-3 border rounded-xl text-sm" />
            </div>
          </div>

          <div className="pt-3 border-t">
            <p className="text-sm font-bold">Le 3 caratteristiche</p>
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
                <button type="button" onClick={()=>setForm({...form,q3:"ringhia"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q3==="ringhia"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>😬 Ringhia</button>
                <button type="button" onClick={()=>setForm({...form,q3:"lascia"})} className={`flex-1 p-2.5 text-xs rounded-xl border ${form.q3==="lascia"?"bg-[#FF8F6B] text-white":"bg-zinc-50"}`}>🤷 Lascia</button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Descrizione del cane e come interagisce con te</label>
            <textarea required value={form.descrizione} onChange={e=>setForm({...form,descrizione:e.target.value})} rows={3} placeholder="Es. Hope è dolcissima..." className="w-full mt-1 p-3 border rounded-xl text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold">Email</label><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm" /></div>
            <div><label className="text-xs font-semibold">Password (8 caratteri)</label><input required minLength={8} type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full mt-1 p-3 border rounded-xl text-sm" /></div>
          </div>

          <button disabled={loading} type="submit" className="w-full py-3 bg-[#FF8F6B] text-white rounded-full font-bold">
            {loading ? "Salvo..." : "Iscriviti a LeashLove"}
          </button>
        </form>
      </div>
    </main>
  );
}
