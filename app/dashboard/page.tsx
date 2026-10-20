"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard(){ const r=useRouter(); useEffect(()=>{r.replace("/vicino")},[]); return <div style={{ padding: 20 }}>Ti porto dai vicini...</div>; }
