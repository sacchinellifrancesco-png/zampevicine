"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Iscrizione() {
  const router = useRouter();
  const [step, setStep] = useState("auth");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) setStep("dog");
  };

  const doSignup = async () => {
    setLoading(true);
    setMsg("");
    if (!email || !pass) { setMsg("Metti email e password"); setLoading(false); return; }
    const { data, error } = await supabase.auth.signUp({ email: email, password: pass });
    if (error) { setMsg(error.message); setLoading(false); return; }
    if (data.user) {
      setMsg("Account creato! Ora compila il profilo cane sotto");
      setStep("dog");
    } else {
      setMsg("Controlla email per confermare, poi torna su Entra");
    }
    setLoading(false);
  };

  const doDog = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) { setMsg("Devi fare iscrizione email prima"); setLoading(false); return; }

    const dog = {
      user_id: u.user.id,
      owner_name: fd.get("owner_name"),
      dog_name: fd.get("dog_name"),
      breed: fd.get("breed"),
      age: fd.get("age"),
      size: fd.get("size"),
      character_tags: fd.get("character_tags"),
      quartiere: fd.get("quartiere"),
      description: fd.get("description"),
      lat: 41.9028,
      lng: 12.4964,
      photo_dog_url: fd.get("photo_dog_url") || "https://images.unsplash.com/photo-1552053831-71594a27632d",
      photo_owner_url: fd.get("photo_owner_url") || "https://images.unsplash.com/photo-1552053831-71594a27632d",
      photo_together_url: fd.get("photo_together_url") || "https://images.unsplash.com/photo-1552053831-71594a27632d",
      privacy_accepted: true,
    };

    const ins = await supabase.from("dogs").insert(dog);
    if (ins.error) { setMsg(ins.error.message); setLoading(false); return; }
    router.push("/vicino");
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 20 }}>
      <Link href="/" style={{ textDecoration: "none", color: "#111" }}>← Home</Link>
      <h1 style={{ fontWeight: 900, marginTop: 12 }}>Iscrizione</h1>
      <p style={{ fontSize: 13, color: "#666" }}>Prima crea account, poi profilo cane</p>

      {step==="auth" && (
        <div style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 16, marginTop: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>1. Crea account</div>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10 }} />
          <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="password (min 6)" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10 }} />
          <button onClick={doSignup} disabled={loading} style={{ width: "100%", padding: 12, borderRadius: 99, background: "black", color: "white", border: "none", fontWeight: 700 }}>{loading ? "..." : "Crea account →"}</button>
          {msg && <div style={{ marginTop: 10, fontSize: 12, color: msg.indexOf("creato")>-1 ? "green" : "red" }}>{msg}</div>}
          <div style={{ marginTop: 12, fontSize: 12 }}>Hai già account? <Link href="/login">Entra</Link></div>
        </div>
      )}

      {step==="dog" && (
        <form onSubmit={doDog} style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 16, marginTop: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>2. Profilo cane (veloce per test)</div>
          <input name="owner_name" placeholder="Tuo nome" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 8 }} />
          <input name="dog_name" placeholder="Nome cane" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 8 }} />
          <input name="breed" placeholder="Razza" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 8 }} />
          <input name="quartiere" placeholder="Quartiere es. Trastevere" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 8 }} />
          <input name="photo_together_url" placeholder="Link foto INSIEME (per test incolla qualsiasi link)" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 8 }} />
          <button disabled={loading} style={{ width: "100%", padding: 12, borderRadius: 99, background: "black", color: "white", border: "none", fontWeight: 700, marginTop: 8 }}>{loading ? "..." : "Salva e vai a Vicino →"}</button>
          {msg && <div style={{ marginTop: 10, fontSize: 12, color: "red" }}>{msg}</div>}
        </form>
      )}
    </div>
  );
}
