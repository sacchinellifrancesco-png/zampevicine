"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PARCHI = ["Villa Borghese", "Villa Pamphilj", "Villa Ada", "Parco del Pineto", "Parco degli Acquedotti", "Villa Torlonia", "Colle Oppio"];

export default function NewWalk() {
  const [park, setPark] = useState(PARCHI[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createWalk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { error } = await supabase.from("walks").insert({ user_id: user.id, park_name: park, date, time, notes });
    if (!error) router.push("/passeggiate");
    else alert(error.message);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <Link href="/passeggiate">← Torna alle passeggiate</Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 16 }}>Crea passeggiata</h1>
      <form onSubmit={createWalk} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        <label>Parco</label>
        <select value={park} onChange={e=>setPark(e.target.value)} style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }}>
          {PARCHI.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Note (es. cerchiamo cuccioli tranquilli)" value={notes} onChange={e=>setNotes(e.target.value)} style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <button disabled={loading} style={{ padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 600, marginTop: 10 }}>{loading ? "Creo..." : "Crea passeggiata"}</button>
      </form>
    </div>
  );
}
