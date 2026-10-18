'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CARATTERISTICHE = {
  taglia: ['Piccola', 'Media', 'Grande'],
  energia: ['Tranquillo', 'Vivace', 'Esplosivo'],
  indole: ['Socievole', 'Riservato', 'Protettivo'],
}

export default function CreaProfilo() {
  const router = useRouter()
  const [foto, setFoto] = useState('')
  const [form, setForm] = useState({
    padrone: '', email: '', cane: '', bio: '',
    taglia: '', energia: '', indole: ''
  })

  function onFoto(e: any) {
    const file = e.target.files?.[0]
    if(!file) return
    const r = new FileReader()
    r.onload = () => setFoto(r.result as string)
    r.readAsDataURL(file)
  }

  function salva(e: any) {
    e.preventDefault()
    if(!form.padrone || !form.cane) return alert('Inserisci nome padrone e nome cane')
    if(!form.taglia || !form.energia || !form.indole) return alert('Seleziona le 3 caratteristiche')
    const profile = {...form, foto, createdAt: new Date().toISOString()}
    localStorage.setItem('zampevicine_profile', JSON.stringify(profile))
    router.push('/mappa')
  }

  const Pill = ({group, value}: any) => {
    const selected = (form as any)[group] === value
    return (
      <button type="button" onClick={()=>setForm({...form, [group]: value})}
        className={`px-4 py-2 rounded-full text-sm font-bold border transition ${selected ? 'bg-black text-white border-black' : 'bg-white text-zinc-600 border-zinc-200'}`}>
        {value}
      </button>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] p-6 flex justify-center">
      <form onSubmit={salva} className="w-full max-w-[420px] bg-white rounded-[2rem] p-6 shadow-sm border">
        <a href="/" className="font-black">🐾 Zampa Vicine</a>
        <h1 className="text-[28px] font-black mt-4 leading-tight">Crea profilo<br/>cane + padrone</h1>

        {/* FOTO - da telefono / FB / IG */}
        <div className="mt-6">
          <p className="font-bold text-sm">Foto del cane</p>
          <div className="mt-2 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-zinc-100 overflow-hidden flex items-center justify-center border">
              {foto ? <img src={foto} className="w-full h-full object-cover" /> : <span className="text-2xl">🐶</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="px-4 py-2 rounded-full bg-black text-white text-sm font-bold cursor-pointer text-center">
                Carica da cellulare
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onFoto} />
              </label>
              <div className="flex gap-2">
                <label className="px-3 py-1.5 rounded-full border text-xs font-bold cursor-pointer">
                  Da Facebook
                  <input type="file" accept="image/*" className="hidden" onChange={onFoto} />
                </label>
                <label className="px-3 py-1.5 rounded-full border text-xs font-bold cursor-pointer">
                  Da Instagram
                  <input type="file" accept="image/*" className="hidden" onChange={onFoto} />
                </label>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 mt-2">Sul telefono si aprirà fotocamera o galleria. Facebook/Instagram per ora usa la galleria, poi lo colleghiamo diretto.</p>
        </div>

        <p className="mt-8 font-bold text-sm">Tu (padrone)</p>
        <input value={form.padrone} onChange={e=>setForm({...form, padrone:e.target.value})} className="mt-2 w-full p-4 rounded-2xl border bg-white" />
        <p className="mt-4 font-bold text-sm">Email</p>
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} type="email" className="mt-2 w-full p-4 rounded-2xl border bg-white" />

        <p className="mt-6 font-bold text-sm">Nome cane</p>
        <input value={form.cane} onChange={e=>setForm({...form, cane:e.target.value})} className="mt-2 w-full p-4 rounded-2xl border bg-white" />

        {/* 3 CARATTERISTICHE AL POSTO DI RAZZA - i 3 pallini */}
        <p className="mt-6 font-bold text-sm">3 caratteristiche</p>
        
        <p className="text-xs text-zinc-500 mt-3">Taglia</p>
        <div className="flex gap-2 mt-1">{CARATTERISTICHE.taglia.map(v=> <Pill key={v} group="taglia" value={v} />)}</div>

        <p className="text-xs text-zinc-500 mt-3">Energia</p>
        <div className="flex gap-2 mt-1">{CARATTERISTICHE.energia.map(v=> <Pill key={v} group="energia" value={v} />)}</div>

        <p className="text-xs text-zinc-500 mt-3">Indole</p>
        <div className="flex gap-2 mt-1">{CARATTERISTICHE.indole.map(v=> <Pill key={v} group="indole" value={v} />)}</div>

        <p className="mt-6 font-bold text-sm">Breve descrizione</p>
        <textarea value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} rows={3} className="mt-2 w-full p-4 rounded-2xl border bg-white"></textarea>

        <button className="mt-8 w-full p-4 rounded-full bg-black text-white font-black">Salva e vai alla Mappa</button>
      </form>
    </main>
  )
}
