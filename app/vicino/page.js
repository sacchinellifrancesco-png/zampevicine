"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

function distanzaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export default function VicinoPage(){
  const [cani,setCani]=useState([]);
  const [raggio,setRaggio]=useState(5);
  const [caricamento,setCaricamento]=useState(true);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async (p)=>{
      const lat=p.coords.latitude; const lng=p.coords.longitude;
      const myEmail=localStorage.getItem("leashlove_email");
      const {data}=await supabase.from("profiles").select("*").not("lat","is",null);
      const conDist=(data||[]).filter(c=>c.email!==myEmail).map(c=>({...c, dist:distanzaKm(lat,lng,c.lat,c.lng)})).sort((a,b)=>a.dist-b.dist);
      setCani(conDist);
      setCaricamento(false);
    }, ()=>{ setCaricamento(false); alert("Devi dare il permesso GPS al browser"); });
  },[]);

  const filtrati=cani.filter(c=>c.dist<=raggio);

  return(
    <div className="p-4 max-w-3xl mx-auto pb-20">
      <h1 className="text-2xl font-bold">Trova cani vicini</h1>
      <div className="bg-white p-4 rounded-2xl border mt-4">
        <p className="text-sm font-bold text-center">Entro <span className="text-[#FF8F6B]">{raggio} km</span> - Trovati {filtrati.length}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs">1km</span>
          <input type="range" min={1} max={200} value={raggio} onChange={e=>setRaggio(Number(e.target.value))} className="flex-1 accent-[#FF8F6B]" />
          <span className="text-xs">200km</span>
          <input type="number" min={1} max={200} value={raggio} onChange={e=>setRaggio(Math.min(200,Math.max(1,Number(e.target.value)||1)))} className="w-16 p-2 border rounded-xl text-center font-bold" />
        </div>
      </div>

      <div className="mt-6">
        {caricamento && <p>Sto cercando la tua posizione GPS...</p>}
        {!caricamento && filtrati.length===0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl text-center">
            <p className="text-3xl">🐾</p>
            <p className="font-bold mt-2">Nessun cane nelle vicinanze entro {raggio} km</p>
            <p className="text-sm text-gray-600 mt-1">Sei l'unico iscritto al momento. Prova ad allargare a 200km con la barra qui sopra.</p>
            <Link href="/mappa" className="inline-block mt-4 underline">Vedi mappa live</Link>
          </div>
        )}
        {filtrati.map(c=>(
          <div key={c.id} className="bg-white p-3 rounded-xl border mt-3 flex gap-3 items-center">
            <img src={c.foto_cane_url} className="w-14 h-14 rounded-full object-cover" />
            <div><p className="font-bold">{c.nome_cane}</p><p className="text-sm text-gray-500">{c.dist.toFixed(1)} km da te</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}
