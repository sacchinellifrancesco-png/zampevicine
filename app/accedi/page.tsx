"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Accedi() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").eq("email", email).single();
    setLoading(false);
    if (!data) { alert("Email non trovata, iscriviti prima!"); return; }
    localStorage.setItem("leashlove_user", JSON.stringify(data));
    alert(`Bentornato ${data.nome}! Cane: ${data.nome_cane}`);
    router.push("/");
  };
  return (
    <main className="min-h-screen bg-[#fffef9] p-6">
      <header className="flex justify-between max-w-7xl mx-auto"><Link href="/" className="font-bold">🐾 LeashLove</Link><Link href="/" className="text-sm">← Home</Link></header>
      <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl border">
        <h1 className="text-2xl font-bold">Accedi</h1>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="sacchinellifrancesco@gmail.com" className="w-full p-3 border rounded-xl" />
          <button disabled={loading} className="w-full py-3 bg-[#FF8F6B] text-white rounded-full font-bold">{loading ? "Controllo..." : "Accedi"}</button>
        </form>
      </div>
    </main>
  );
}
