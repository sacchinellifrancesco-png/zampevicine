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
    <div style={{ position: "fixed", bottom: 12, left: 12, right: 12, background: "black", color: "white", borderRadius: 16, padding: 14, display: "flex", gap: 12, alignItems: "center", zIndex: 9999, fontSize: 13 }}>
      <div style={{ flex: 1 }}>Usiamo solo cookie tecnici per login. Niente pubblicità. <Link href="/privacy" style={{ color: "white", textDecoration: "underline" }}>Privacy</Link></div>
      <button onClick={ok} style={{ background: "white", color: "black", border: "none", borderRadius: 99, padding: "8px 16px", fontWeight: 700 }}>Ok</button>
    </div>
  );
}
