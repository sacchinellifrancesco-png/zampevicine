"use client"
export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

const PASSWORD_ADMIN = "LeashLove2026"

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState("")
  const [clienti, setClienti] = useState([])
  const [search, setSearch] = useState("")
  const [nome, setNome] = useState("")
  const [telefono, setTelefono] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("leash-auth") === "ok") setAuth(true)
  }, [])

  async function carica() {
    const supabase = getSupabase()
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from("clienti_fedelta").select("*").order("punti", { ascending: false })
    if (data) setClienti(data)
    setLoading(false)
  }

  useEffect(() => { if(auth) carica() }, [auth])

  function login() {
    if (pass === PASSWORD_ADMIN) {
      sessionStorage.setItem("leash-auth", "ok")
      setAuth(true)
    } else alert("Password sbagliata!")
  }

  async function aggiungiCliente() {
    if (!nome || !telefono) return alert("Metti nome e telefono!")
    const supabase = getSupabase()
    const { error } = await supabase.from("clienti_fedelta").insert([{ nome, telefono, punti: 0 }])
    if (error) alert(error.message)
    else { setNome(""); setTelefono(""); carica() }
  }

  async function aggiornaPunti(id, delta, puntiAttuali) {
    const supabase = getSupabase()
    const nuovi = Math.max(0, (puntiAttuali || 0) + delta)
    await supabase.from("clienti_fedelta").update({ punti: nuovi }).eq("id", id)
    carica()
  }

  const filtrati = clienti.filter(c => c.nome.toLowerCase().includes(search.toLowerCase()) || c.telefono.includes(search))

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow border w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4">🐾 Leash Love - Admin</h1>
          <input type="password" placeholder="Password admin" value={pass} onChange={e=>setPass(e.target.value)} className="w-full p-3 border rounded-xl mb-3" />
          <button onClick={login} className="w-full bg-black text-white p-3 rounded-xl font-bold">Entra</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">🐾 Admin</h1>
          <button onClick={()=>{sessionStorage.removeItem("leash-auth"); setAuth(false)}} className="text-sm text-gray-500 underline">Esci</button>
        </div>
        <p className="text-gray-500 mb-6 mt-1">Clienti totali: {clienti.length}</p>
        <input placeholder="🔍 Cerca..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full p-3 rounded-xl border mb-6" />
        <div className="bg-white p-4 rounded-2xl shadow-sm border mb-6 flex flex-col md:flex-row gap-2">
          <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} className="flex-1 p-2.5 border rounded-xl" />
          <input placeholder="Telefono" value={telefono} onChange={e=>setTelefono(e.target.value)} className="flex-1 p-2.5 border rounded-xl" />
          <button onClick={aggiungiCliente} className="bg-black text-white px-6 py-2.5 rounded-xl font-bold">+ Aggiungi</button>
        </div>
        {loading ? <p>Carico...</p> : filtrati.map(c => (
          <div key={c.id} className="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center mb-3">
            <div><p className="font-bold text-black">{c.nome}</p><p className="text-gray-600 text-sm">{c.telefono} • {c.punti||0} punti</p></div>
            <div className="flex gap-2">
              <button onClick={()=>aggiornaPunti(c.id, -10, c.punti)} className="w-10 h-10 rounded-full bg-gray-100 font-bold">-10</button>
              <button onClick={()=>aggiornaPunti(c.id, 10, c.punti)} className="w-10 h-10 rounded-full bg-black text-white font-bold">+10</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
