"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Iscrizione() {
  const [ownerName, setOwnerName] = useState("");
  const [dogName, setDogName] = useState("");
  const [quartiere, setQuartiere] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coords, setCoords] = useState<{lat:number,lng:number}|null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(()=>{ supabase.auth.getUser().then(({data})=>{ if(data.user) router.push("/vicino"); }); },[]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      p=>{ setCoords({lat:p.coords.latitude,lng:p.coords.longitude}); setMsg("📍 Posizione ok!"); },
      ()=>setMsg("Attiva GPS dalle impostazioni")
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) { setMsg(authError.message.includes("already") ? "Sei già registrato, fai Entra" : authError.message); setLoading(false); return; }
    const userId = authData.user?.id; if(!userId){ setMsg("Controlla email per confermare"); setLoading(false); return; }
    const { error } = await supabase.from("dogs").upsert({ user_id: userId, owner_name: ownerName, dog_name: dogName, quartiere, lat: coords?.lat, lng: coords?.lng }, { onConflict: "user_id" });
    if(error){ setMsg(error.message); setLoading(false); return; }
    router.push("/vicino");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <Link href="/">← Home</Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 10 }}>Iscrivi il tuo cane</h1>
      <p style={{ color: "#666" }}>Tinder style: ti facciamo vedere chi è vicino</p>
      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        <input placeholder="Il tuo nome" value={ownerName} onChange={e=>setOwnerName(e.target.value)} required style={{ padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <input placeholder="Nome cane" value={dogName} onChange={e=>setDogName(e.target.value)} required style={{ padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <input placeholder="Quartiere (Prati, Testaccio...)" value={quartiere} onChange={e=>setQuartiere(e.target.value)} required style={{ padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <button type="button" onClick={getLocation} style={{ padding: 12, borderRadius: 10, border: coords ? "2px solid green" : "1px dashed black", background: coords ? "#e6f7e6" : "white" }}>{coords ? `✅ ${coords.lat.toFixed(4)} - Attiva` : "📍 ATTIVA GPS (fondamentale per vicini)"}</button>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <input type="password" placeholder="Password forte" value={password} onChange={e=>setPassword(e.target.value)} required style={{ padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <button disabled={loading} style={{ padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 700 }}>{loading ? "..." : "Fatti scoprire →"}</button>
      </form>
      {msg && <p style={{ marginTop: 12, color: msg.includes("📍") || msg.includes("✅") ? "green" : "red" }}>{msg}</p>}
    </div>
  );
}
