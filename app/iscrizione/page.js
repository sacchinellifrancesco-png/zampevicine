"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Iscrizione() {
  const [nomeProp, setNomeProp] = useState("");
  const [nomeCane, setNomeCane] = useState("");
  const [email, setEmail] = useState("");
  const [fileCane, setFileCane] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!fileCane || !nomeCane || !email) return alert("Foto cane + nome cane + email obbligatori");
    setLoading(true);

    const fileName = Date.now() + "-" + fileCane.name;
    const { error: upErr } = await supabase.storage.from("foto-cani").upload(fileName, fileCane);
    if (upErr) { alert(upErr.message); setLoading(false); return; }
    
    const fotoCaneUrl = supabase.storage.from("foto-cani").getPublicUrl(fileName).data.publicUrl;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      await supabase.from("profiles").insert({ nome_proprietario: nomeProp, nome_cane: nomeCane, email, foto_cane_url: fotoCaneUrl, lat, lng });
      localStorage.setItem("leashlove_email", email);
      window.location.href = "/vicino";
    }, async () => {
      await supabase.from("profiles").insert({ nome_proprietario: nomeProp, nome_cane: nomeCane, email, foto_cane_url: fotoCaneUrl });
      localStorage.setItem("leashlove_email", email);
      window.location.href = "/vicino";
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Unisciti a LeashLove</h1>
      <input autoComplete="off" value={nomeProp} onChange={e=>setNomeProp(e.target.value)} placeholder="Es. Marco" className="w-full mt-4 p-3 border rounded-xl" />
      <input autoComplete="off" value={nomeCane} onChange={e=>setNomeCane(e.target.value)} placeholder="Es. Luna" className="w-full mt-3 p-3 border rounded-xl" />
      <input autoComplete="off" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Es. esempio@leashlove.it" className="w-full mt-3 p-3 border rounded-xl" />
      <label className="block mt-4 text-sm font-bold">Foto del cane *</label>
      <input type="file" accept="image/*" onChange={e=>setFileCane(e.target.files[0])} className="w-full mt-2" />
      <button onClick={handle} disabled={loading} className="w-full mt-6 bg-[#FF8F6B] text-white p-4 rounded-2xl font-bold">{loading ? "Carico..." : "Iscriviti"}</button>
    </div>
  );
}
