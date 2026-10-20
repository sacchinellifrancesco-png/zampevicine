import Link from "next/link";

const VETS: Record<string, { name: string; address: string; code: string }> = {
  prati: { name: "Clinica Vet Prati", address: "Via Cola di Rienzo 100, Roma", code: "VET-PRATI-10" },
  trastevere: { name: "Ambulatorio Trastevere", address: "Viale Trastevere 120, Roma", code: "VET-TRAS-10" },
  parioli: { name: "Vet Parioli", address: "Viale Parioli 10, Roma", code: "VET-PAR-10" },
  monti: { name: "Vet Monti", address: "Via Nazionale, Roma", code: "VET-MONTI-10" },
};

export default function VetPage({ params }: { params: { slug: string } }) {
  const vet = VETS[params.slug] || { name: `Partner ${params.slug}`, address: "Roma", code: `WELCOME-${params.slug.toUpperCase()}` };
  
  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 24, textAlign: "center", fontFamily: "system-ui" }}>
      <div style={{ background: "#FFFBF5", borderRadius: 24, padding: 24, border: "1px solid #eee" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#999", fontWeight: 700 }}>PARTNER UFFICIALE</div>
        <h1 style={{ fontWeight: 900, margin: "12px 0 4px", fontSize: 22 }}>{vet.name}</h1>
        <p style={{ color: "#666", fontSize: 13, margin: 0 }}>{vet.address}</p>
        
        <div style={{ background: "white", borderRadius: 16, padding: 20, marginTop: 20, border: "1px dashed #FF6B35" }}>
          <div style={{ fontWeight: 800, fontSize: 13 }}>IL TUO CODICE INVITO:</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#FF6B35", marginTop: 8, letterSpacing: 1 }}>{vet.code}</div>
          <p style={{ fontSize: 11, color: "#666", marginTop: 8 }}>Mostra questo in clinica → 1 mese Premium gratis</p>
        </div>

        <Link href="/iscrizione" style={{ display: "block", marginTop: 20, background: "black", color: "white", padding: 16, borderRadius: 99, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
          Iscriviti con questo codice →
        </Link>
        
        <p style={{ fontSize: 10, color: "#AAA", marginTop: 16 }}>QR valido per zona: {params.slug} - tracciato per vet</p>
      </div>
    </div>
  );
}
