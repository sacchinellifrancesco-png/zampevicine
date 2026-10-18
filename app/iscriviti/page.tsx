'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreaProfilo() {
  const router = useRouter()
  const [foto, setFoto] = useState('')
  const [form, setForm] = useState({
    padrone: '', email: '', cane: '', razza: '', bio: ''
  })

  function onFoto(e: any) {
    const file = e.target.files[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => setFoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  function salva(e: any) {
    e.preventDefault()
    if(!form.padrone || !form.cane) return alert('Inserisci nome padrone e nome cane')
    const profile = {...form, foto, createdAt: new Date().toISOString()}
    localStorage.setItem('zampevicine_profile', JSON.stringify(profile))
    router.push('/mappa')
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] p-6 flex justify-center">
      <form onSubmit={salva} className="w-full max-w-[420px] bg-white rounded-[2rem] p-6 shadow-sm border">
        <a href="/" className="font-black">🐾 Zampa Vicine</a>
        <h1 className="text-[28px] font-black mt-4 leading-tight">Crea profilo<br/>cane + padrone</h1>

        <div className="mt-6 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-zinc-100 overflow-hidden flex items-center justify-center border">
            {foto ? <img src={foto} className="w-full h-full object-cover" /> : <span className="text-2xl">🐶</span>}
          </div>
          <label className="px-4 py-2 rounded-full border text-sm font-bold cursor-pointer">
            Carica foto
            <input type="file" accept="image/*" className="hidden" onChange={onFoto} />
          </label>
        </div>

        <p className="mt-8 font-bold text-sm">Tu (padrone)</p>
        <input value={form.padrone} onChange={e=>setForm({...form, padrone:e.target.value})} className="mt-2 w-full p-4 rounded-2xl border bg-white" />

        <p className="mt-4 font-bold text-sm">Email</p>
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} type="email" className="mt-2 w-full p-4 rounded-2xl border bg-white" />

        <p className="mt-6 font-bold text-sm">Nome cane</p>
        <input value={form.cane} onChange={e=>setForm({...form, cane:e.target.value})} className="mt-2 w-full p-4 rounded-2xl border bg-white" />

        <p className="mt-4 font-bold text-sm">Razza</p>
        <input value={form.razza} onChange={e=>setForm({...form, razza:e.target.value})} className="mt-2 w-full p-4 rounded-2xl border bg-white" />

        <p className="mt-4 font-bold text-sm">Note</p>
        <textarea value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} rows={3} className="mt-2 w-full p-4 rounded-2xl border bg-white"></textarea>

        <button className="mt-8 w-full p-4 rounded-full bg-black text-white font-black">Salva e vai alla Mappa con GPS</button>
      </form>
    </main>
  )
}
