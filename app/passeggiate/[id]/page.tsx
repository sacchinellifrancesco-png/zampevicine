"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DogDetail(){
  const { id } = useParams();
  const [d, setD] = useState<any>(null);

  useEffect(()=>{
    const load = async () => {
      const { data } = await supabase.from("dogs").select("*").eq("id", id).single();
      setD(data);
    };
    if(id) load();
  },[id]);

  if(!d) return <div style={{ padding: 40, textAlign: "center" }}>Caricamento profilo...</div>;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20, background: "#fafafa", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/cani">← Lista</Link>
        <Link href="/vicino" style={{ fontSize: 14 }}>Tinder →</Link>
      </div>

      <img src={d.photo_together_url} alt={d.dog_name} style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 20, marginTop: 14 }} />
      
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 14 }}>{d.dog_name} <span style={{ fontWeight: 400, fontSize: 16, color: "#666" }}>{d.breed} • {d.age}</span></h1>
      <p style={{ color: "#333", marginTop: 4, fontSize: 15 }}>di {d.owner_name} • 📍 {d.quartiere} • {d.size}</p>
      <div style={{ marginTop: 10, display: "inline-block", background: "white", border: "1px solid #eee", padding: "8px 12px", borderRadius: 99, fontSize: 13 }}>{d.character_tags}</div>
      {d.description && <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.4, color: "#444" }}>{d.description}</p>}

      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Altre foto verificate:</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <img src={d.photo_dog_url} alt="cane" style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12 }} />
            <div style={{ fontSize: 11, color: "#666", marginTop: 4, textAlign: "center" }}>Foto cane</div>
          </div>
          <div>
            <img src={d.photo_owner_url} alt="padrone" style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12 }} />
            <div style={{ fontSize: 11, color: "#666", marginTop: 4, textAlign: "center" }}>Foto padrone</div>
          </div>
        </div>
      </div>

      <Link href="/vicino" style={{ display: "block", marginTop: 24, background: "black", color: "white", textAlign: "center", padding: 16, borderRadius: 99, fontWeight: 700, textDecoration: "none" }}>
        Torna a swipe ♥
      </Link>
    </div>
  );
}
