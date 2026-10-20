"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [dog, setDog] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase.from("dogs").select("*").eq("user_id", user.id).maybeSingle();
      setDog(data);
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 20 }}>
      <a href="/" style={{ display: "block", marginBottom: 20 }}>← Torna alla home</a>
      <h1>Ciao sei dentro! 🐶</h1>
      {dog ? <p>Il tuo cane: <b>{dog.dog_name}</b></p> : <p>Caricamento...</p>}
      <button onClick={async()=>{await supabase.auth.signOut(); router.push("/");}} style={{ marginTop: 20, textDecoration: "underline" }}>Esci</button>
    </div>
  );
}
