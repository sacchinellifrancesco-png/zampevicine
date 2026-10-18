'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Iscriviti() {
  const router = useRouter()
  const [form, setForm] = useState({ padrone: '', email: '', cane: '', razza: '' })

  function salva(e: any) {
    e.preventDefault()
    if(!form.padrone || !form.cane) return alert('Metti nome tuo e del cane')
    localStorage.setItem('zampevicine_profile', JSON.stringify(form))
    router.push('/mappa')
  }

  return (
    <main className="min-h-screen bg-white p-6 flex justify-center">
      <form onSubmit={salva} className="w-full max-w-sm">
        <a href="/" className="font-black text-xl">🐾 Zampe Vicine</a>
        <h1 className="text-3xl font-black mt-6">Crea profilo</h1>
        <p className="text-zinc-500 text-sm mt-1">Salviamo tutto sul telefono per ora, poi lo mettiamo online.</p>
        
        <label className="block mt-6 font-bold text-sm">Tu (padrone)</label>
        <input value={form.padrone} onChange={e=>setForm({...form, padrone: e.target.value})} placeholder="Francesco" className="w-full p-4 rounded-2xl border bg-zinc-50 mt-1" />
        
        <label className="block mt-3 font-bold text-sm">Email</label>
        <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="tu@email.com" className="w-full p-4 rounded-2xl border bg-zinc-50 mt-1" />
        
        <label className="block mt-3 font-bold text-sm">Nome cane</label>
        <input value={form.cane} onChange={e=>setForm({...form, cane: e.target.value})} placeholder="Luna" className="w-full p-4 rounded-2xl border bg-zinc-50 mt-1" />
        
        <label className="block mt-3 font-bold text-sm">Razza / età</label>
        <input value={form.razza} onChange={e=>setForm({...form, razza: e.target.value})} placeholder="Labrador, 2 anni" className="w-full p-4 rounded-2xl border bg-zinc-50 mt-1" />

        <button className="mt-6 w-full p-4 rounded-2xl bg-black text-white font-black">Salva e vai alla Mappa con GPS</button>
        <p className="text-center mt-3 text-sm"><a href="/entra" className="underline">Hai già un profilo? Entra</a></p>
      </form>
    </main>
  )
}
