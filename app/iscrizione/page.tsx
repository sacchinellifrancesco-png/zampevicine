"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (p) => { setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }); setMsg("📍 Posizione presa!"); },
      () => setMsg("Attiva GPS per farti trovare dai vicini")
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) { setMsg(authError.message); setLoading(false); return; }
    const userId = authData.user?.id;
    if (!userId) { setMsg("Controlla email per confermare"); setLoading(false); return; }
    const { error } = await supabase.from("dogs").insert({ 
      user_id: userId, 
      owner_name: ownerName, 
      dog_name: dogName, 
      quartiere,
      lat: coords?.lat, 
      lng: coords?.lng 
    });
    if (error) { setMsg(error.message); setLoading(false); return; }
    router.push("/vicino");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <a href="/">← Home</a>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 10 }}>Iscrivi te e il tuo cane</h1>
      <p style={{ color: "#666" }}>Ti facciamo vedere i proprietari vicino a te a Roma</p>
      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        <input placeholder="Il tuo nome" value={ownerName} onChange={e=>setOwnerName(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Nome cane" value={dogName} onChange={e=>setDogName(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Quartiere (es. Prati, Testaccio)" value={quartiere} onChange={e=>setQuartiere(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <button type="button" onClick={getLocation} style={{ padding: 12, borderRadius: 8, border: "1px dashed black" }}>{coords ? `✅ Posizione: ${coords.lat.toFixed(3)}` : "📍 Prendi la mia posizione (fondamentale)"}</button>
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <button disabled={loading} style={{ padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 600 }}>{loading ? "..." : "Fatti scoprire dai vicini →"}</button>
      </form>
      {msg && <p style={{ marginTop: 12, color: msg.includes("📍") ? "green" : "red" }}>{msg}</p>}
    </div>
  );
}
