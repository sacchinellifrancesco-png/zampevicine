"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

// Componente input che NON esiste finché non ci clicchi
function NoAutofillInput({ value, onChange, placeholder, isPassword = false, inputMode = "text" }) {
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);
  // Nome casuale generato ogni volta, impossibile da salvare per Chrome
  const [fieldName] = useState(() => `leash_${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  if (!active) {
    return (
      <div
        onClick={() => setActive(true)}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-orange-100 bg-white text-left cursor-text"
      >
        {value ? (
          <span className="text-black">{isPassword ? "•".repeat(value.length) : value}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      type={isPassword ? "password" : "text"}
      inputMode={inputMode}
      name={fieldName}
      id={fieldName}
      autoComplete="off"
      data-lpignore="true"
      data-1p-ignore="true"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => { if (!value) setActive(false); }}
      placeholder={placeholder}
      className="mt-2 w-full px-4 py-3 rounded-xl border border-orange-100 bg-white outline-none focus:border-[#FF6B35] placeholder:text-gray-400 text-black"
    />
  );
}

export default function AccediPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    const { data, error: sbError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", cleanEmail)
      .eq("password", password)
      .single();

    setLoading(false);

    if (sbError || !data) {
      setError("Email o password non corretti");
      return;
    }

    localStorage.setItem("leashlove_user", JSON.stringify(data));
    router.push("/mappa");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col px-6 pt-8">
      <button onClick={() => router.push("/")} className="text-left text-[#2D6A4F] font-medium mb-6">
        &lt; Indietro
      </button>

      <h1 className="text-3xl font-bold text-[#2D6A4F] mb-2">Accedi</h1>
      <p className="text-gray-500 mb-8">Bentornato su LeashLove</p>

      {/* Niente più <form> così Chrome non lo vede come form di login */}
      <div className="flex flex-col gap-4" onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}>
        
        <div>
          <label className="text-sm text-[#2D6A4F] font-semibold">Email</label>
          <NoAutofillInput
            value={email}
            onChange={setEmail}
            placeholder="es. mario.rossi@email.com"
            inputMode="email"
          />
        </div>

        <div>
          <label className="text-sm text-[#2D6A4F] font-semibold">Password</label>
          <NoAutofillInput
            value={password}
            onChange={setPassword}
            placeholder="La tua password"
            isPassword={true}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-4 w-full bg-[#FF6B35] text-white py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "Accesso..." : "Accedi"}
        </button>
      </div>
    </div>
  );
}
