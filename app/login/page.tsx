"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMsg(error.message); setLoading(false); return; }
    router.push("/vicino");
  };

  return (
    <div style={{ maxWidth: 380, margin: "60px auto", padding: 20 }}>
      <Link href="/">← Home</Link>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 12 }}>Entra</h1>
      <p style={{ color: "#666" }}>Ti porto subito dai cani vicino a te</p>
      <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ padding: 14, borderRadius: 12, border: "1px solid #ddd" }} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={{ padding: 14, borderRadius: 12, border: "1px solid #ddd" }} />
        <button disabled={loading} style={{ padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 700 }}>{loading ? "..." : "Entra e vedi chi è vicino →"}</button>
      </form>
      {msg && <p style={{ marginTop: 12, color: "red" }}>{msg}</p>}
      <p style={{ marginTop: 20, fontSize: 14 }}>Non sei iscritto? <Link href="/iscrizione" style={{ textDecoration: "underline", fontWeight: 700 }}>Iscriviti qui</Link></p>
    </div>
  );
}
