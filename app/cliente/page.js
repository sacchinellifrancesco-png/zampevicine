"use client"
export const dynamic = 'force-dynamic'

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export default function ClientePage() {
  const [telefono, setTelefono] = useState("")
  const [cliente, setCliente] = useState(null)
  const [errore, setErrore] = useState("")
  const [loading, setLoading] = useState(false)

  async function cerca() {
    const supabase = getSupabase()
    if (!supabase) { setErrore("Config mancante: chiedi allo staff"); return }
    setLoading(true); setErrore(""); setCliente(null)
    const { data } = await supabase.from("clienti_fedelta").select("*").eq("telefono", telefono).single()
    if (!data) setErrore("Nessun cliente trovato con questo numero. Chiedi in negozio!")
    else setCliente(data)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="max-w-md w-full mt-10">
        <Link href="/" className="text-sm text-gray-600 underline">← Torna alla home</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">🐾 I tuoi punti</h1>
        <p className="text-gray-600 mb-6">Inserisci il tuo numero per vedere i punti Leash Love</p>
        <div className="bg-white p-6 rounded-2xl shadow border">
          <input placeholder="Il tuo telefono es. 3331234567" value={telefono} onChange={e=>setTelefono(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl mb-3 text-black" />
          <button onClick={cerca} disabled={loading} className="w-full bg-black text-white p-3 rounded-xl font-bold">{loading ? "..." : "Vedi i miei punti"}</button>
        </div>
        {errore && <p className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl mt-4 text-center text-sm font-bold">{errore}</p>}
        {cliente && (
          <div className="bg-white p-6 rounded-2xl shadow border mt-6 text-center">
            <p className="text-black font-bold text-lg">Ciao {cliente.nome}!</p>
            <p className="text-7xl font-black my-4 text-black">{cliente.punti || 0}</p>
            <p className="font-black tracking-widest text-black">PUNTI LEASH LOVE</p>
            <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-xl text-sm font-bold text-black">
              {cliente.punti >= 100 ? "🎉 Hai un premio! Passa in negozio!" : `Ti mancano ${100 - (cliente.punti||0)} punti al premio`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
