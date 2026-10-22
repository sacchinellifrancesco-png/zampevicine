"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Accedi() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").eq("email", email).single();
    if (!data) { alert("Email non trovata, iscriviti prima"); setLoading(false); return; }
    localStorage.setItem("leashlove_email", email);
    window.location.href = "/vicino";
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Accedi a LeashLove</h1>
      <input autoComplete="off" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Es. esempio@leashlove.it" className="w-full mt-6 p-3 border rounded-xl" />
      <button onClick={handle} disabled={loading} className="w-full mt-6 bg-black text-white p-4 rounded-2xl font-bold">{loading ? "..." : "Accedi e vedi cani vicino"}</button>
    </div>
  );
}
