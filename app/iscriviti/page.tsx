'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function IscrivitiPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col">
      <header className="p-6 max-w-6xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="font-black text-xl">Zampevicine</Link>
        <Link href="/accedi" className="text-sm underline">Hai già un account? Accedi</Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border rounded-[24px] p-8 shadow-sm">
          <h1 className="text-3xl font-black text-center">Crea account</h1>
          <p className="text-center text-gray-500 mt-2 mb-6 text-sm">Entra in Zampevicine in 30 secondi</p>
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input 
              value={nome} 
              onChange={e=>setNome(e.target.value)} 
              placeholder="Nome del tuo cane" 
              className="w-full border rounded-full px-5 py-3.5" 
              required 
            />
            <input 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              type="email" 
              placeholder="tu@email.com" 
              className="w-full border rounded-full px-5 py-3.5" 
              required 
            />
            <input 
              value={pass} 
              onChange={e=>setPass(e.target.value)} 
              type="password" 
              placeholder="Password" 
              className="w-full border rounded-full px-5 py-3.5" 
              required 
            />
            <button className="w-full bg-black text-white rounded-full py-3.5 font-semibold mt-2">
              Iscriviti gratis
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
