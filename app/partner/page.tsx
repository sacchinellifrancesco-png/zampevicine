"use client"
import Link from "next/link"
import { useState } from "react"

export default function Partner(){
  const [negozio, setNegozio] = useState("")

  const handleWhatsApp = () => {
    const numero = "393755805693"
    const testo = `Ciao LeashLove! Sono ${negozio} e voglio diventare partner pilota a Roma.`
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`
    window.open(url, "_blank")
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Diventa Partner Pilota</h1>
        <p className="text-gray-600 mb-6 text-sm">Stiamo selezionando 3 negozi a Roma - gratis</p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 space-y-4">
          <input 
            value={negozio}
            onChange={(e) => setNegozio(e.target.value)}
            placeholder="Nome del tuo negozio / clinica" 
            className="w-full border rounded-full px-4 py-3 text-sm"
          />
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-black text-white px-6 py-3 rounded-full text-sm font-medium"
          >
            Contattaci su WhatsApp
          </button>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-sm underline">Torna alla Home</Link>
        </div>
      </div>
    </main>
  )
}
