"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [dog, setDog] = useState<any>(null);
  const [walks, setWalks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: dogData } = await supabase.from("dogs").select("*").eq("user_id", user.id).maybeSingle();
      setDog(dogData);
      const { data: walkData } = await supabase.from("walks").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setWalks(walkData || []);
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <Link href="/">← Home</Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 16 }}>Dashboard 🐶</h1>
      {dog ? (
        <div style={{ marginTop: 16, padding: 16, border: "1px solid #eee", borderRadius: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{dog.dog_name}</div>
          <div style={{ color: "#666" }}>Proprietario: {dog.owner_name}</div>
        </div>
      ) : <p>Caricamento cane...</p>}
      
      <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
        <Link href="/passeggiate/new" style={{ flex: 1, background: "black", color: "white", padding: "12px", borderRadius: 99, textAlign: "center" }}>+ Crea passeggiata</Link>
        <Link href="/passeggiate" style={{ flex: 1, border: "1px solid #ddd", padding: "12px", borderRadius: 99, textAlign: "center" }}>Vedi tutte</Link>
      </div>

      <h2 style={{ marginTop: 24, fontWeight: 700 }}>Le tue passeggiate</h2>
      <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
        {walks.map((w:any) => (
          <div key={w.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 12, fontSize: 14 }}>
            <b>{w.park_name}</b> - {w.date} {w.time}
          </div>
        ))}
        {walks.length===0 && <p style={{ fontSize: 14, color: "#666" }}>Non hai ancora creato passeggiate.</p>}
      </div>

      <button onClick={async()=>{await supabase.auth.signOut(); router.push("/");}} style={{ marginTop: 30, fontSize: 14, textDecoration: "underline" }}>Esci</button>
    </div>
  );
}
