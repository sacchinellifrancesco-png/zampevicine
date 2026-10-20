"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "white", color: "black", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #eee" }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 20 }}>LeashLove 🐶</Link>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/cani" style={{ padding: "8px 16px", fontSize: 14 }}>Cani</Link>
          <Link href="/passeggiate" style={{ padding: "8px 16px", fontSize: 14 }}>Passeggiate</Link>
          <Link href="/login" style={{ border: "1px solid #ddd", padding: "8px 16px", borderRadius: 99, fontSize: 14 }}>Entra</Link>
        </div>
      </header>

      <main style={{ maxWidth: 600, margin: "80px auto", padding: 20, textAlign: "center", flex: 1 }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.1 }}>Dove i cani di Roma<br/>si incontrano.</h1>
        <p style={{ color: "#666", marginTop: 16, fontSize: 18 }}>Fase pilota Roma - trova compagni di passeggiata vicino a te.</p>
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/iscrizione" style={{ background: "black", color: "white", padding: "16px 24px", borderRadius: 99, fontWeight: 600 }}>Iscrivi il tuo cane gratis</Link>
          <Link href="/passeggiate" style={{ border: "1px solid #ddd", padding: "16px 24px", borderRadius: 99, fontWeight: 600 }}>Vedi passeggiate in programma</Link>
        </div>
      </main>

      <footer style={{ padding: 20, textAlign: "center", fontSize: 12, color: "#999", borderTop: "1px solid #eee" }}>
        LeashLove © 2025 - Fase pilota Roma - leashlove.it
      </footer>
    </div>
  );
}
