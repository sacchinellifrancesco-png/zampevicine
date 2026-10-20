"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "white", color: "black" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #eee" }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 20 }}>LeashLove 🐶</Link>
        <Link href="/login" style={{ border: "1px solid #ddd", padding: "8px 16px", borderRadius: 99, fontSize: 14 }}>Entra</Link>
      </header>

      <main style={{ maxWidth: 600, margin: "80px auto", padding: 20, textAlign: "center" }}>
        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1 }}>Dove i cani di Roma<br/>si incontrano.</h1>
        <p style={{ color: "#666", marginTop: 16, fontSize: 18 }}>Fase pilota Roma - trova compagni di passeggiata vicino a te. 100% gratuito.</p>
        
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/iscrizione" style={{ background: "black", color: "white", padding: "16px 24px", borderRadius: 99, fontWeight: 600, textAlign: "center" }}>
            Iscrivi il tuo cane gratis
          </Link>
          <Link href="/cani" style={{ border: "1px solid #ddd", padding: "16px 24px", borderRadius: 99, fontWeight: 600, textAlign: "center" }}>
            Vedi i cani iscritti
          </Link>
        </div>

        <p style={{ marginTop: 40, fontSize: 14, color: "#999" }}>✓ No WhatsApp obbligatorio ✓ Dati al sicuro su Supabase</p>
      </main>
    </div>
  );
}
