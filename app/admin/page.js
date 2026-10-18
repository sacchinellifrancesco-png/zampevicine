"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [clienti, setClienti] = useState([])

  async function carica() {
    const { data } = await supabase.from("clienti_fedelta").select("*")
    if (data) setClienti(data)
  }

  useEffect(() => { carica() }, [])

  async function aggiungi10(id, puntiAttuali) {
    const nuovi = (puntiAttuali || 0) + 10
    await supabase.from("clienti_fedelta").update({ punti: nuovi }).eq("id", id)
    carica()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin - Sei dentro ✅</h1>
      <p>Clienti: {clienti.length}</p>
      {clienti.map(c => (
        <div key={c.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <b>{c.nome}</b> - {c.telefono} - Punti: {c.punti || 0}
          <button onClick={() => aggiungi10(c.id, c.punti)} style={{ marginLeft: 10 }}>
            +10 Punti
          </button>
        </div>
      ))}
    </div>
  )
}
