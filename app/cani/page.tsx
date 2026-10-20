"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CaniLista() {
  const [dogs, setDogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const load = async () => {
      const { data } = await supabase.from("dogs")
        .select("*")
        .eq("privacy_accepted", true)
        .not("photo_together_url","is",null)
        .order("created_at", { ascending: false });
      setDogs(data||[]);
      setLoading(false);
    };
    load();
  },[]);

  if(loading) return <div style={{ padding: 40, textAlign: "center" }}>Carico cani...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/">← Home</Link>
        <Link href="/vicino" style={{ background: "black", color: "white", padding: "8px 14px", borderRadius: 99, fontSize: 14, textDecoration: "none" }}>Tinder vicino →</Link>
      </div>
      <h1 style={{ fontWeight: 800, fontSize: 24, marginTop: 16 }}>Cani a Roma ({dogs.length})</h1>
      <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>Solo profili completi con foto insieme padrone+cane</p>
      {dogs.length===0 ? (
        <div style={{ marginTop: 40, textAlign: "center", color: "#666" }}>Nessun cane completo ancora.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
          {dogs.map(d=>(
            <Link key={d.id} href={`/cani/${d.id}`} style={{ border: "1px solid #eee", borderRadius: 16, overflow: "hidden", textDecoration: "none", color: "black", background: "white" }}>
              <img src={d.photo_together_url} alt={d.dog_name} style={{ width: "100%", height: 170, objectFit: "cover" }} />
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{d.dog_name} • {d.breed}</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>di {d.owner_name}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>📍 {d.quartiere} • {d.size}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
