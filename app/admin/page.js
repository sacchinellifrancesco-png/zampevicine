"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLeashLove() {
  const [clienti, setClienti] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('profiles').select('*').order('nome_proprietario', { ascending: true });
      setClienti(data || []);
    };
    load();
  }, []);

  const filtrati = clienti.filter(c => 
    c.nome_proprietario?.toLowerCase().includes(search.toLowerCase()) ||
    c.nome_cane?.toLowerCase().includes(search.toLowerCase()) ||
    (c.telefono && c.telefono.includes(search))
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold">Admin LeashLove - Clienti totali: {clienti.length}</h1>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cerca nome, cane o telefono..." className="w-full mt-4 p-3 border rounded-xl" />
      <div className="mt-6 space-y-2">
        {filtrati.map(c => (
          <div key={c.id} className="flex items-center gap-3 p-3 border rounded-xl">
            <img src={c.foto_cane_url} className="w-12 h-12 rounded-full object-cover" alt="" />
            <div>
              <p className="font-bold">{c.nome_proprietario} - {c.nome_cane}</p>
              <p className="text-xs text-zinc-500">{c.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
