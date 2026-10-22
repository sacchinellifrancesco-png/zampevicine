"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function IscrizioneLeashLove() {
  const [nomeProp, setNomeProp] = useState("");
  const [nomeCane, setNomeCane] = useState("");
  const [email, setEmail] = useState("");
  const [fileCane, setFileCane] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIscrizione = async () => {
    if (!fileCane || !nomeCane || !email) return alert("Foto cane + nome cane + email obbligatori");
    setLoading(true);

    // 1. Upload foto cane - QUESTA SARA' L'AVATAR
    const fileName = `${Date.now()}-${fileCane.name}`;
    const { data: uploadData } = await supabase.storage.from('foto-cani').upload(fileName, fileCane);
    const fotoCaneUrl = supabase.storage.from('foto-cani').getPublicUrl(fileName).data.publicUrl;

    // 2. GPS Live - chiedo posizione ora
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { error } = await supabase.from('profiles').insert({
        nome_proprietario: nomeProp,
        nome_cane: nomeCane,
        email: email,
        foto_cane_url: fotoCaneUrl,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        last_seen: new Date()
      });
      setLoading(false);
      if (error) alert(error.message);
      else window.location.href = "/vicino"; // NON torna a home, va a mappa + GPS
    }, async () => {
      // se nega GPS, iscrivo comunque senza lat/lng
      await supabase.from('profiles').insert({ nome_proprietario: nomeProp, nome_cane: nomeCane, email, foto_cane_url: fotoCaneUrl });
      setLoading(false);
      window.location.href = "/vicino";
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Unisciti a LeashLove</h1>
      
      {/* PLACEHOLDER FINTI, MAI DATI REALI */}
      <input autoComplete="off" value={nomeProp} onChange={e=>setNomeProp(e.target.value)} placeholder="Es. Marco" className="w-full mt-4 p-3 border rounded-xl" />
      <input autoComplete="off" value={nomeCane} onChange={e=>setNomeCane(e.target.value)} placeholder="Es. Luna" className="w-full mt-3 p-3 border rounded-xl" />
      <input autoComplete="off" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Es. esempio@leashlove.it" className="w-full mt-3 p-3 border rounded-xl" />
      
      <label className="block mt-4 text-sm font-bold">Foto del cane * (sarà il suo avatar)</label>
      <input type="file" accept="image/*" onChange={e=>setFileCane(e.target.files?.[0] || null)} className="w-full mt-2" />

      <button onClick={handleIscrizione} disabled={loading} className="w-full mt-6 bg-[#FF8F6B] text-white p-4 rounded-2xl font-bold">
        {loading ? "Carico..." : "Iscriviti e trova cani vicino"}
      </button>
    </div>
  );
}
