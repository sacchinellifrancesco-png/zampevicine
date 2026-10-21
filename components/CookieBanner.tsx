"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const c = localStorage.getItem("zv_cookie_ok");
    if (!c) setShow(true);
  }, []);
  if (!show) return null;
  const ok = () => {
    localStorage.setItem("zv_cookie_ok", "1");
    setShow(false);
  };
  return (
    <div style={{ position: "fixed", bottom: 16, left: 16, right: 16, background: "#FFF2C2", color: "#333", borderRadius: 16, padding: 16, display: "flex", gap: 12, alignItems: "center", zIndex: 9999, fontSize: 13, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", border: "1px solid #FFE9A0" }}>
      <div style={{ flex: 1 }}>Usiamo solo cookie tecnici per login. Niente pubblicità. <Link href="/privacy" style={{ color: "#333", textDecoration: "underline", fontWeight: 600 }}>Privacy</Link></div>
      <button onClick={ok} style={{ background: "#FF8C42", color: "white", border: "none", borderRadius: 99, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Accetta</button>
    </div>
  );
}
