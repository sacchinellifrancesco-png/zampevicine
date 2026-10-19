"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function ClientePage() {
  const [telefono, setTelefono] = useState("")
  const [cliente, setCliente] = useState(null)
  const [errore, setErrore] = useState("")
  const [loading, setLoading] = useState(false)

  async function cerca() {
    setLoading(true); setErrore(""); setCliente(null)
    const { data, error } = await supabase.from("clienti_fedelta").select("*").eq("telefono", telefono).single()
    if (error || !data) setErrore("Nessun cliente trovato con questo numero. Chiedi in negozio!")
    else setCliente(data)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="max-w-md w-full mt-10">
        <Link href="/" className="text-sm text-gray-500">← Torna alla home</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">🐾 I tuoi punti</h1>
        <p className="text-gray-500 mb-6">Inserisci il tuo numero per vedere i punti Leash Love</p>
        
        <div className="bg-white p-6 rounded-2xl shadow border">
          <input placeholder="Il tuo telefono es. 3331234567" value={telefono} onChange={e=>setTelefono(e.target.value)} className="w-full p-3 border rounded-xl mb-3" />
          <button onClick={cerca} disabled={loading} className="w-full bg-black text-white p-3 rounded-xl font-bold">{loading ? "..." : "Vedi i miei punti"}</button>
        </div>

        {errore && <p className="bg-red-50 text-red-600 p-4 rounded-xl mt-4 text-center">{errore}</p>}

        {cliente && (
          <div className="bg-white p-6 rounded-2xl shadow border mt-6 text-center">
            <p className="text-gray-500">Ciao {cliente.nome}!</p>
            <p className="text-6xl font-black my-4">{cliente.punti || 0}</p>
            <p className="font-bold">PUNTI LEASH LOVE</p>
            <div className="mt-6 p-3 bg-yellow-50 rounded-xl text-sm">
              {cliente.punti >= 100 ? "🎉 Hai un premio! Passa in negozio!" : `Ti mancano ${100 - (cliente.punti||0)} punti al premio`}
            </div>
            <div className="mt-6 border-t pt-4 text-xs text-gray-400">
              Spazio offerte partner - qui in futuro puoi mettere pubblicità/sponsor
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
