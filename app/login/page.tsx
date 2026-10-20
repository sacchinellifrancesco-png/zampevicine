"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMsg(error.message); return; }
    router.push("/dashboard");
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 20 }}>
      <a href="/" style={{ display: "block", marginBottom: 20 }}>← Torna alla home</a>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Entra</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <button style={{ padding: 14, borderRadius: 99, background: "black", color: "white" }}>Entra</button>
      </form>
      {msg && <p style={{ marginTop: 15, color: "red" }}>{msg}</p>}
    </div>
  );
}
