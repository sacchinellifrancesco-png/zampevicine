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
    const { data, error } = await supabase.from("profiles").select("*").eq("email", email).single();
    
    setLoading(false);
    if (error || !data) {
      alert("Email non trovata. Iscriviti prima!");
      return;
    }
    // Salva utente
    localStorage.setItem("leashlove_user", JSON.stringify(data));
    alert(`Bentornato ${data.nome}! Cane: ${data.nome_cane}`);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#fffef9] p-6">
      <header className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-[#4a5a8c]">🐾 LeashLove</Link>
        <Link href="/" className="text-sm">← Home</Link>
      </header>

      <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl border">
        <h1 className="text-2xl font-bold text-[#2f3a5a]">Accedi</h1>
        <p className="text-sm text-zinc-500 mt-1">Usa la stessa email dell'iscrizione</p>
        
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold">Email</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="francesco@gmail.com" className="w-full mt-1 p-3 border rounded-xl text-sm" />
          </div>
          <button disabled={loading} type="submit" className="w-full py-3 bg-[#FF8F6B] text-white rounded-full font-bold">
            {loading ? "Controllo..." : "Accedi"}
          </button>
        </form>

        <p className="text-xs mt-4 text-center">Non hai un account? <Link href="/iscrizione" className="text-[#FF8F6B] font-bold">Iscriviti</Link></p>
      </div>
    </main>
  );
}
