
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Cani() {
  const [dogs, setDogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("dogs").select("*").order("created_at", { ascending: false });
      setDogs(data || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Link href="/">← Torna alla home</Link>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16 }}>Cani di Roma 🐕</h1>
      <p style={{ color: "#666" }}>{dogs.length} cani iscritti</p>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {loading && <p>Caricamento...</p>}
        {dogs.map((d: any) => (
          <div key={d.id} style={{ border: "1px solid #eee", padding: 16, borderRadius: 16, display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{d.dog_name}</div>
              <div style={{ color: "#666", fontSize: 14 }}>di {d.owner_name}</div>
            </div>
            <div style={{ fontSize: 24 }}>🐶</div>
          </div>
        ))}
        {!loading && dogs.length === 0 && <p>Nessun cane ancora. Sei il primo!</p>}
      </div>

      <Link href="/iscrizione" style={{ display: "block", marginTop: 24, background: "black", color: "white", padding: "14px", borderRadius: 99, textAlign: "center" }}>
        Iscrivi anche il tuo
      </Link>
    </div>
  );
}
