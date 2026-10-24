"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

// Input invisibile a Chrome - vive dentro Shadow DOM
function ShadowField({ value, onValueChange, placeholder, type = "text", inputMode }) {
  const hostRef = useRef(null);
  const inputRef = useRef(null);
  const callbackRef = useRef(onValueChange);
  
  useEffect(() => { callbackRef.current = onValueChange; }, [onValueChange]);

  useEffect(() => {
    if (!hostRef.current) return;
    if (hostRef.current.shadowRoot) return;

    const shadow = hostRef.current.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      input {
        width: 100%;
        padding: 12px 16px;
        border-radius: 12px;
        border: 1px solid #FFEDD5;
        background: white;
        outline: none;
        font-size: 16px;
        font-family: ui-sans-serif, system-ui;
        box-sizing: border-box;
      }
      input:focus { border-color: #FF6B35; }
      input::placeholder { color: #9CA3AF; opacity: 1; }
    `;

    const input = document.createElement("input");
    input.type = type;
    if (inputMode) input.inputMode = inputMode;
    input.placeholder = placeholder;
    input.autocomplete = "off";
    input.setAttribute("data-lpignore", "true");
    input.setAttribute("data-1p-ignore", "true");
    input.name = `leash_${Math.random().toString(36).slice(2, 9)}`;
    input.value = value || "";

    input.addEventListener("input", (e) => {
      callbackRef.current(e.target.value);
    });

    shadow.appendChild(style);
    shadow.appendChild(input);
    inputRef.current = input;
  }, []);

  // Sincronizza se cambi value da fuori
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return <div ref={hostRef} className="mt-2 w-full" />;
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

      <div className="flex flex-col gap-4" onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}>
        <div>
          <label className="text-sm text-[#2D6A4F] font-semibold">Email</label>
          <ShadowField
            value={email}
            onValueChange={setEmail}
            placeholder="es. mario.rossi@email.com"
            type="text"
            inputMode="email"
          />
        </div>

        <div>
          <label className="text-sm text-[#2D6A4F] font-semibold">Password</label>
          <ShadowField
            value={password}
            onValueChange={setPassword}
            placeholder="La tua password"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button onClick={handleLogin} disabled={loading} className="mt-4 w-full bg-[#FF6B35] text-white py-3 rounded-xl font-bold">
          {loading ? "Accesso..." : "Accedi"}
        </button>
      </div>
    </div>
  );
}
