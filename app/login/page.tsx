"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Accedi() {
  const [email, setEmail] = useState("sacchinellifrancesco@gmail.com");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email.trim().toLowerCase())
      .single();

    setLoading(false);

    if (error || !data) {
      setMsg("Email non trovata. Iscriviti prima!");
      return;
    }

    localStorage.setItem("leashlove_user", JSON.stringify(data));
    setMsg(`Bentornato ${data.nome}! Cane: ${data.nome_cane}`);

    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#fffef9] p-6">
      <header className="flex justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-bold">🐾 LeashLove</Link>
        <Link href="/" className="text-sm">← Home</Link>
      </header>

      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl border shadow-sm">
        <h1 className="text-2xl font-bold">Accedi</h1>
        
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl outline-none"
            placeholder="sacchinellifrancesco@gmail.com"
          />
          <button
            disabled={loading}
            className="w-full py-3 bg-[#FF8F6B] text-white rounded-full font-bold disabled:opacity-50"
          >
            {loading ? "Controllo..." : "Accedi"}
          </button>
        </form>

        {msg && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center font-bold text-green-700">
            {msg}
          </div>
        )}
      </div>
    </main>
  );
}
