"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

function EditableDiv({ placeholder, value, onChange, isPassword, inputMode }) {
  const ref = useRef(null);

  // Sincronizza se svuoti da fuori
  useEffect(() => {
    if (ref.current && ref.current.innerText !== value && value === "") {
      ref.current.innerText = "";
    }
  }, [value]);

  const handleInput = () => {
    if (!ref.current) return;
    // Prende solo testo puro, no a capo
    let text = ref.current.innerText.replace(/\n/g, "").replace(/\r/g, "");
    // Limita a una riga
    if (text.length > 100) {
      text = text.substring(0, 100);
      ref.current.innerText = text;
      // Riporta cursore alla fine
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    onChange(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Fa partire login
      document.getElementById("leashlove_login_btn")?.click();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");
    document.execCommand("insertText", false, text.replace(/\n/g, ""));
  };

  return (
    <>
      <style>{`
        [data-editable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
      `}</style>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-editable
        data-placeholder={placeholder}
        inputMode={inputMode}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-orange-100 bg-white outline-none focus:border-[#FF6B35] min-h-[48px] text-[16px] text-black break-all"
        style={isPassword ? { WebkitTextSecurity: "disc" } : {}}
      />
    </>
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

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-[#2D6A4F] font-semibold">Email</label>
          <EditableDiv
            placeholder="es. mario.rossi@email.com"
            value={email}
            onChange={setEmail}
            inputMode="email"
          />
        </div>

        <div>
          <label className="text-sm text-[#2D6A4F] font-semibold">Password</label>
          <EditableDiv
            placeholder="La tua password"
            value={password}
            onChange={setPassword}
            isPassword={true}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          id="leashlove_login_btn"
          onClick={handleLogin}
          disabled={loading}
          className="mt-4 w-full bg-[#FF6B35] text-white py-3 rounded-xl font-bold"
        >
          {loading ? "Accesso..." : "Accedi"}
        </button>
      </div>
    </div>
  );
}
