"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AccediPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", cleanEmail)
      .eq("password", password)
      .single();

    setLoading(false);

    if (error || !data) {
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

      <form onSubmit={handleLogin} autoComplete="off" data-lpignore="true" data-form-type="other" className="flex flex-col gap-4">
        
        {/* CAMPI FIN TI PER FREGARE CHROME */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
          <input type="text" name="prevent_autofill_username" autoComplete="username" tabIndex={-1} />
          <input type="password" name="prevent_autofill_password" autoComplete="new-password" tabIndex={-1} />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-[#2D6A4F] font-semibold">Email</label>
          <input
            type="text"
            inputMode="email"
            id="leashlove_login_field_e_xyz92"
            name="leashlove_login_field_e_xyz92"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
            readOnly
            onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
            placeholder="es. mario.rossi@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full px-4 py-3 rounded-xl border border-orange-100 bg-white outline-none focus:border-[#FF6B35] placeholder:text-gray-400 placeholder:opacity-100"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-[#2D6A4F] font-semibold">Password</label>
          <input
            type="password"
            id="leashlove_login_field_p_xyz92"
            name="leashlove_login_field_p_xyz92"
            autoComplete="new-password"
            data-lpignore="true"
            data-1p-ignore="true"
            readOnly
            onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
            placeholder="La tua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full px-4 py-3 rounded-xl border border-orange-100 bg-white outline-none focus:border-[#FF6B35] placeholder:text-gray-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-[#FF6B35] text-white py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "Accesso..." : "Accedi"}
        </button>
      </form>
    </div>
  );
}
