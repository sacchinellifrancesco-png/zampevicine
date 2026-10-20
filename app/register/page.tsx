"use client"
import Link from "next/link"
import { useState } from "react"

export default function Register(){
  const [nome, setNome] = useState("")
  const [cane, setCane] = useState("")

  const handleWhatsApp = () => {
    const numero = "393755805693"
    const testo = `Ciao LeashLove! Voglio iscrivermi al pilota. Io sono ${nome} e il mio cane è ${cane}.`
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`
    window.open(url, "_blank")
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">Iscrivi il tuo cane gratis</h1>
        <p className="text-gray-600 mb-6 text-center text-sm">Fase pilota Roma - 100% gratuito</p>
        
        <div className="bg-gray-50 border rounded-2xl p-6 space-y-4">
          <input 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Il tuo nome" 
            className="w-full border rounded-full px-4 py-3 text-sm"
          />
          <input 
            value={cane}
            onChange={(e) => setCane(e.target.value)}
            placeholder="Nome del tuo cane" 
            className="w-full border rounded-full px-4 py-3 text-sm"
          />
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-black text-white px-6 py-3 rounded-full text-sm font-medium"
          >
            Iscriviti via WhatsApp
          </button>
          <p className="text-xs text-gray-400 text-center">Apre direttamente WhatsApp</p>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm underline">Torna alla Home</Link>
        </div>
      </div>
    </main>
  )
}
