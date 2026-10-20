"use client";
import Link from "next/link";

export default function Passeggiate() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Link href="/">← Torna alla home</Link>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16 }}>Passeggiate</h1>
      <p style={{ color: "#666", marginTop: 8 }}>Presto qui potrai creare e unirti a passeggiate nei parchi di Roma.</p>
      <div style={{ marginTop: 24, padding: 16, background: "#f5f5f5", borderRadius: 12 }}>
        <p>🚧 Funzione in arrivo - Punto 4</p>
        <p style={{ fontSize: 14, color: "#666" }}>Stiamo costruendo la mappa parchi + creazione passeggiata.</p>
      </div>
      <Link href="/dashboard" style={{ display: "block", marginTop: 20, textDecoration: "underline" }}>Vai alla tua dashboard →</Link>
    </div>
  );
}
