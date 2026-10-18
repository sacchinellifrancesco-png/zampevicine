"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function AdminPage() {
  const [users, setUsers] = useState([])

  async function loadUsers() {
    const { data } = await supabase.from("users").select("*")
    if (data) setUsers(data)
  }

  useEffect(() => { loadUsers() }, [])

  async function addPoints(user) {
    await supabase.from("users").update({ points: user.points + 10 }).eq("id", user.id)
    loadUsers()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🐾 Zampe Vicine - Admin</h1>
      {users.map(u => (
        <div key={u.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10, borderRadius: 10 }}>
          <b>{u.name}</b> - {u.points} punti<br/>
          <button onClick={() => addPoints(u)} style={{ marginTop: 5, padding: "5px 10px", background: "green", color: "white", borderRadius: 5 }}>
            +10 Punti
          </button>
        </div>
      ))}
    </div>
  )
}
