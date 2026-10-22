"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AccediPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const entra = async (e) => {
    e.preventDefault();
    setMsg("Controllo...");
    const { data } = await supabase.from("profiles").select("email").eq("email", email).maybeSingle();
    
    if (!data) {
      setMsg("Email non trovata. Vai su Iscriviti prima.");
      return;
    }
    // Salva email e vai in mappa
    localStorage.setItem("leashlove_email", email);
    setMsg("Ok! Ti porto in mappa...");
    router.push("/mappa");
  };

  return (
    <div className="p-6 max-w-md mx-auto pb-20">
      <h1 className="text-2xl font-bold">Accedi a LeashLove</h1>
      <p className="text-sm text-gray-500 mt-1">Metti la mail con cui ti sei iscritto</p>
      <form onSubmit={entra} className="mt-6">
        <input 
          value={email} 
          onChange={e=>setEmail(e.target.value)}
          placeholder="tua@email.com" 
          className="w-full p-3 border rounded-xl"
          required
        />
        <button className="w-full mt-4 p-3 bg-[#FF8F6B] text-white rounded-xl font-bold">
          Entra e trova cani vicini
        </button>
      </form>
      <p className="mt-4 text-sm font-bold">{msg}</p>
    </div>
  );
}
