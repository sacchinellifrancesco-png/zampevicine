"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function AdminPage() {
  const [users, setUsers] = useState([])

  async function carica() {
    const { data } = await supabase.from("users").select("*")
    if (data) setUsers(data)
  }

  useEffect(() => { carica() }, [])

  async function aggiungi10(utente) {
    await supabase.from("users").update({ points: utente.points + 10 }).eq("id", utente.id)
    carica()
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Admin - Sei dentro ✅</h1>
      <h2>Utenti: {users.length}</h2>
      {users.map(u => (
        <div key={u.id} style={{ border: "2px solid #333", padding: 15, margin: 10, borderRadius: 10 }}>
          <b>{u.name}</b> - {u.points} punti<br/>
          <button onClick={() => aggiungi10(u)} style={{ marginTop: 8, padding: "8px 15px", background: "green", color: "white", borderRadius: 8, border: 0 }}>
            +10 Punti
          </button>
        </div>
      ))}
    </div>
  )
}
