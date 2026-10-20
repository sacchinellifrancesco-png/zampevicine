"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Passeggiate() {
  const [walks, setWalks] = useState<any[]>([]);
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("walks").select("*, dogs(dog_name, owner_name)").order("created_at", { ascending: false });
      setWalks(data || []);
    };
    load();
  }, []);
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Link href="/">← Home</Link>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Passeggiate a Roma</h1>
        <Link href="/passeggiate/new" style={{ background: "black", color: "white", padding: "10px 16px", borderRadius: 99, fontSize: 14 }}>+ Nuova</Link>
      </div>
      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {walks.map((w: any) => (
          <div key={w.id} style={{ border: "1px solid #eee", padding: 16, borderRadius: 16 }}>
            <div style={{ fontWeight: 700 }}>{w.park_name} 📍</div>
            <div style={{ color: "#666", fontSize: 14, marginTop: 4 }}>{w.date} alle {w.time} {w.notes ? `- ${w.notes}` : ""}</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 6 }}>Organizzata da {w.dogs?.dog_name || "un amico"} ({w.dogs?.owner_name || ""})</div>
          </div>
        ))}
        {walks.length === 0 && <p style={{ color: "#666" }}>Nessuna passeggiata ancora. Creane una!</p>}
      </div>
    </div>
  );
}
