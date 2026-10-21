'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AccediPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col">
      <header className="p-6 max-w-6xl mx-auto w-full flex justify-between">
        <Link href="/" className="font-black">Zampevicine</Link>
        <Link href="/iscriviti" className="text-sm underline">Non hai account? Iscriviti</Link>
      </header>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border rounded-[24px] p-8 shadow-sm">
          <h1 className="text-3xl font-black text-center">Bentornato</h1>
          <form onSubmit={(e)=>e.preventDefault()} className="space-y-4 mt-6">
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="tu@email.com" className="w-full border rounded-full px-5 py-3.5" required />
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" className="w-full border rounded-full px-5 py-3.5" required />
            <button className="w-full bg-black text-white rounded-full py-3.5 font-semibold">Accedi</button>
          </form>
        </div>
      </div>
    </div>
  )
}
