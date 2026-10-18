"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [clienti, setClienti] = useState([])
  const [search, setSearch] = useState("")
  const [nome, setNome] = useState("")
  const [telefono, setTelefono] = useState("")
  const [loading, setLoading] = useState(true)

  async function carica() {
    setLoading(true)
    const { data } = await supabase.from("clienti_fedelta").select("*").order("punti", { ascending: false })
    if (data) setClienti(data)
    setLoading(false)
  }

  useEffect(() => { carica() }, [])

  async function aggiungiCliente() {
    if (!nome || !telefono) return alert("Metti nome e telefono!")
    const { error } = await supabase.from("clienti_fedelta").insert([{ nome, telefono, punti: 0 }])
    if (error) alert(error.message)
    else {
      setNome(""); setTelefono(""); carica()
    }
  }

  async function aggiornaPunti(id, delta, puntiAttuali) {
    const nuovi = Math.max(0, (puntiAttuali || 0) + delta)
    await supabase.from("clienti_fedelta").update({ punti: nuovi }).eq("id", id)
    carica()
  }

  const filtrati = clienti.filter(c => 
    c.nome.toLowerCase().includes(search.toLowerCase()) || 
    c.telefono.includes(search)
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">🐾 Leash Love - Admin</h1>
        <p className="text-gray-500 mb-6">Clienti: {clienti.length} | Punti totali: {clienti.reduce((a,b)=>a+(b.punti||0),0)}</p>

        <input 
          placeholder="🔍 Cerca per nome o telefono..." 
          value={search} onChange={e=>setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200 mb-6 shadow-sm"
        />

        <div className="bg-white p-4 rounded-2xl shadow-sm border mb-6 flex flex-col md:flex-row gap-2">
          <input placeholder="Nome nuovo cliente" value={nome} onChange={e=>setNome(e.target.value)} className="flex-1 p-2.5 border rounded-xl" />
          <input placeholder="Telefono" value={telefono} onChange={e=>setTelefono(e.target.value)} className="flex-1 p-2.5 border rounded-xl" />
          <button onClick={aggiungiCliente} className="bg-black text-white px-6 py-2.5 rounded-xl font-bold">+ Aggiungi</button>
        </div>

        {loading ? <p>Carico...</p> : filtrati.map(c => (
          <div key={c.id} className="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center mb-3">
            <div>
              <p className="font-bold text-lg">{c.nome}</p>
              <p className="text-gray-500 text-sm">{c.telefono} • <span className="font-bold text-black">{c.punti || 0} punti</span></p>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>aggiornaPunti(c.id, -10, c.punti)} className="w-10 h-10 rounded-full bg-gray-100 font-bold">-10</button>
              <button onClick={()=>aggiornaPunti(c.id, 10, c.punti)} className="w-10 h-10 rounded-full bg-black text-white font-bold">+10</button>
            </div>
          </div>
        ))}

        {filtrati.length === 0 && !loading && <p className="text-center text-gray-400 mt-10">Nessun cliente trovato</p>}
      </div>
    </div>
  )
}
