"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AccediForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const { data, error } = await supabase.from("profiles").select("*").eq("email", email.trim().toLowerCase()).eq("password", password).single();
    if (error || !data) { setError("Email o password errati"); return; }
    localStorage.setItem("leashlove_user", JSON.stringify(data));
    router.push("/mappa");
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-semibold text-[#2D6A4F]">Email</label>
        <input type="email" placeholder="es. mario.rossi@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full px-4 py-3 rounded-xl border border-orange-100 bg-white placeholder:text-gray-400 outline-none focus:border-[#FF6B35]" />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#2D6A4F]">Password</label>
        <input type="password" placeholder="La tua password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full px-4 py-3 rounded-xl border border-orange-100 bg-white placeholder:text-gray-400 outline-none" />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button onClick={login} className="mt-2 w-full bg-[#FF6B35] text-white py-3 rounded-xl font-bold">Accedi</button>
    </div>
  );
}
