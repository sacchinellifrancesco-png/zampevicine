"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function distanzaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

export default function Vicino() {
  const [raggio, setRaggio] = useState(5);
  const [cani, setCani] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stato, setStato] = useState("Cerco la tua posizione...");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (p) => {
      const lat = p.coords.latitude;
      const lng = p.coords.longitude;
      setStato(`Sei qui: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      const email = localStorage.getItem("leashlove_email");
      if (email) await supabase.from("profiles").update({ lat, lng, last_seen: new Date() }).eq("email", email);
      const { data } = await supabase.from("profiles").select("*").not("lat","is",null);
      const conDist = (data || []).filter(c=>c.email !== email).map(c=>({...c, dist: distanzaKm(lat,lng,c.lat,c.lng)})).sort((a,b)=>a.dist-b.dist);
      setCani(conDist);
      setLoading(false);
    }, () => { setStato("Attiva il GPS per vedere cani vicino"); setLoading(false); });
  }, []);

  const handleZampara = async (altro) => {
    const myEmail = localStorage.getItem("leashlove_email");
    if (!myEmail) return alert("Devi accedere prima");
    const { data: esistente } = await supabase.from("matches").select("*").or(`and(user1_email.eq.${myEmail},user2_email.eq.${altro.email}),and(user1_email.eq.${altro.email},user2_email.eq.${myEmail})`).limit(1).single();
    if (esistente) { window.location.href = `/chat/${esistente.id}`; return; }
    const { data: nuovo } = await supabase.from("matches").insert({ user1_email: myEmail, user2_email: altro.email }).select().single();
    await supabase.from("messages").insert({ match_id: nuovo.id, sender_email: myEmail, text: `Ciao! Sono ${altro.nome_cane} 🐾 facciamo una zampata?` });
    window.location.href = `/chat/${nuovo.id}`;
  };

  const filtrati = cani.filter(c=>c.dist <= raggio);

  return (
    <div className="p-4 max-w-xl mx-auto pb-20">
      <h1 className="text-2xl font-bold">LeashLove - Vicino a te</h1>
      <p className="text-sm text-zinc-500">{stato}</p>
      <div className="bg-white p-4 rounded-2xl border mt-5">
        <p className="text-sm font-bold text-center mb-3">Mostro cani entro <span className="text-[#FF8F6B]">{raggio} km</span></p>
        <div className="flex items-center gap-3">
          <input type="range" min={1} max={200} value={raggio} onChange={e=>setRaggio(Number(e.target.value))} className="flex-1 accent-[#FF8F6B]" />
          <input type="number" min={1} max={200} value={raggio} onChange={e=>setRaggio(Math.min(200,Math.max(1,Number(e.target.value)||1)))} className="w-20 p-2 border rounded-xl text-center font-bold" />
          <span className="text-sm">km</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {loading ? <p className="text-center mt-10">Carico cani vicino...</p> : filtrati.map(c=>(
          <div key={c.id} className="flex gap-3 p-3 border rounded-2xl bg-white">
            <img src={c.foto_cane_url} className="w-20 h-20 rounded-2xl object-cover" alt="" />
            <div className="flex-1">
              <p className="font-bold">{c.nome_cane} <span className="text-sm text-[#FF8F6B]">{c.dist.toFixed(1)} km</span></p>
              <p className="text-sm text-zinc-600">{c.nome_proprietario}</p>
              <button onClick={()=>handleZampara(c)} className="mt-2 bg-[#FF8F6B] text-white px-5 py-2 rounded-full text-sm font-bold">Zampara 🐾</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
