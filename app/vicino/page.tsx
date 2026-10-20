"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function distance(lat1:number, lon1:number, lat2:number, lon2:number) {
  const R=6371; const dLat=(lat2-lat1)*Math.PI/180; const dLon=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

export default function Vicino() {
  const [myPos, setMyPos] = useState<{lat:number,lng:number}|null>(null);
  const [dogs, setDogs] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p)=>setMyPos({lat:p.coords.latitude,lng:p.coords.longitude}));
  }, []);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("dogs").select("*");
      let list = data || [];
      if (myPos) {
        list = list.map((d:any)=>({...d, dist: d.lat && d.lng ? distance(myPos.lat, myPos.lng, d.lat, d.lng) : 999}))
                   .sort((a:any,b:any)=>a.dist-b.dist);
      }
      setDogs(list);
    };
    load();
  }, [myPos]);

  const filtered = dogs.filter((d:any)=>!filter || d.quartiere?.toLowerCase().includes(filter.toLowerCase()) || d.dog_name?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Link href="/">← Home</Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 10 }}>Cani vicino a te 🐕</h1>
      <p style={{ color: "#666", fontSize: 14 }}>{myPos ? "📍 Posizione attiva - ordino per distanza" : "Attiva GPS per vedere distanze"}</p>
      
      <input placeholder="Filtra per quartiere o nome cane" value={filter} onChange={e=>setFilter(e.target.value)} style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 99, border: "1px solid #ddd" }} />

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {filtered.map((d:any)=>(
          <div key={d.id} style={{ border: "1px solid #eee", padding: 16, borderRadius: 16, display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{d.dog_name} {d.dist && d.dist<999 ? <span style={{ fontWeight:400, fontSize:12, color:"green" }}>• {d.dist.toFixed(1)} km da te</span> : null}</div>
              <div style={{ fontSize: 14, color: "#666" }}>di {d.owner_name} - {d.quartiere || "Roma"}</div>
            </div>
            <Link href={`/cani/${d.id}`} style={{ fontSize: 12, textDecoration: "underline" }}>Vedi profilo →</Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
        <Link href="/dashboard" style={{ flex:1, border:"1px solid #ddd", padding:12, borderRadius:99, textAlign:"center" }}>Dashboard</Link>
        <Link href="/passeggiate" style={{ flex:1, background:"black", color:"white", padding:12, borderRadius:99, textAlign:"center" }}>Passeggiate (extra)</Link>
      </div>
    </div>
  );
}
