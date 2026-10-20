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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) { setMsg(authError.message); setLoading(false); return; }
    const userId = authData.user?.id;
    if (!userId) { setMsg("Controlla email per confermare, poi fai login."); setLoading(false); return; }
    const { error: dogError } = await supabase.from("dogs").insert({ user_id: userId, owner_name: ownerName, dog_name: dogName });
    if (dogError) { setMsg("Errore: " + dogError.message); setLoading(false); return; }
    router.push("/dashboard");
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 20 }}>
      <a href="/" style={{ display: "block", marginBottom: 20 }}>← Torna alla home</a>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Iscrivi il tuo cane gratis</h1>
      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        <input placeholder="Il tuo nome" value={ownerName} onChange={e=>setOwnerName(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Nome del tuo cane" value={dogName} onChange={e=>setDogName(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Password (min 6)" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <button disabled={loading} style={{ padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 600, marginTop: 10 }}>{loading ? "Sto creando..." : "Iscriviti gratis"}</button>
      </form>
      {msg && <p style={{ marginTop: 15, color: "red" }}>{msg}</p>}
    </div>
  );
}
