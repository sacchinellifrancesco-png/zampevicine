import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fefefe", color: "#111" }}>
      {/* HEADER */}
      <header style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>LeashLove 🐾</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/cani" style={{ fontSize: 14, textDecoration: "none", color: "#333" }}>Cani</Link>
          <Link href="/login" style={{ fontSize: 14, textDecoration: "none", color: "#333" }}>Accedi</Link>
          <Link href="/iscrizione" style={{ background: "black", color: "white", padding: "8px 16px", borderRadius: 99, fontSize: 14, textDecoration: "none", fontWeight: 700 }}>Iscriviti</Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px 20px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 30, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-block", background: "#f3f3f3", padding: "6px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, marginBottom: 16 }}>📍 Solo Roma • Profili verificati con foto insieme</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 0.95, letterSpacing: -1.5, margin: 0 }}>
            Il tuo cane<br/>trova nuovi<br/>amici vicino a te
          </h1>
          <p style={{ fontSize: 16, color: "#555", marginTop: 16, lineHeight: 1.5, maxWidth: 420 }}>
            Iscrivi te e il tuo cane con 3 foto reali. Scorri i cani vicini a te, metti like e sblocca la chat solo se c&apos;è match.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <Link href="/iscrizione" style={{ background: "black", color: "white", padding: "14px 22px", borderRadius: 99, textDecoration: "none", fontWeight: 800, fontSize: 15 }}>Inizia gratis →</Link>
            <Link href="/vicino" style={{ background: "white", border: "1px solid #ddd", color: "#111", padding: "14px 22px", borderRadius: 99, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>Vedi cani vicino</Link>
          </div>
          <div style={{ marginTop: 18, fontSize: 12, color: "#888" }}>✔ Solo profili completi con foto insieme • ✔ Privacy prima di tutto</div>
        </div>

        <div style={{ position: "relative", height: 420, background: "#fff", borderRadius: 24, border: "1px solid #eee", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}>
          <img src="https://images.unsplash.com/photo-1558788353-6fc6f73e2834?w=800" alt="cane con padrone" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, background: "white", borderRadius: 16, padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Luna • Labrador • Trastevere</div>
              <div style={{ fontSize: 12, color: "#666" }}>0.8 km da te • Socievole</div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "black", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>♥</div>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <div style={{ background: "white", border: "1px solid #eee", borderRadius: 18, padding: 18 }}>
            <div style={{ fontSize: 24 }}>📸</div>
            <div style={{ fontWeight: 800, marginTop: 8, fontSize: 15 }}>1. Iscrivi con 3 foto</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4, lineHeight: 1.4 }}>Cane, padrone e insieme. Niente profili finti.</div>
          </div>
          <div style={{ background: "white", border: "1px solid #eee", borderRadius: 18, padding: 18 }}>
            <div style={{ fontSize: 24 }}>📍</div>
            <div style={{ fontWeight: 800, marginTop: 8, fontSize: 15 }}>2. Scorri vicino a te</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4, lineHeight: 1.4 }}>Solo cani entro pochi km, ordinati per distanza.</div>
          </div>
          <div style={{ background: "white", border: "1px solid #eee", borderRadius: 18, padding: 18 }}>
            <div style={{ fontSize: 24 }}>💬</div>
            <div style={{ fontWeight: 800, marginTop: 8, fontSize: 15 }}>3. Match = chat</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4, lineHeight: 1.4 }}>Chat sbloccata solo se vi piacete a vicenda.</div>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "20px", fontSize: 12, color: "#999", borderTop: "1px solid #eee" }}>
        LeashLove • Roma • Solo incontri tra cani • Privacy • Termini
      </footer>
    </div>
  );
}
