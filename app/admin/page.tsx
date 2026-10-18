'use client'
import { useEffect, useState } from 'react'

// --- CREDENZIALI CORRETTE SENZA PUNTO ---
const ADMIN_EMAIL = 'sacchinellifrancesco@gmail.com'
const ADMIN_PINS = ['leash2026', 'opsedici']
// ----------------------------------------

export default function AdminPage(){
  const [pinOk, setPinOk] = useState(false)
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [profiles, setProfiles] = useState<any[]>([])
  const [q, setQ] = useState('')

  useEffect(()=>{
    if(localStorage.getItem('leashlove_admin_ok')==='yes') setPinOk(true)
    const stored = localStorage.getItem('leashlove_profiles')
    if(stored) setProfiles(JSON.parse(stored))
  },[])

  function checkAccess(){
    const emailInput = email.toLowerCase().trim()
    const pinInput = pin.toLowerCase().trim()
    if(emailInput === ADMIN_EMAIL && ADMIN_PINS.includes(pinInput)){
      setPinOk(true)
      localStorage.setItem('leashlove_admin_ok','yes')
    } else {
      alert('Accesso negato: controlla email e PIN')
    }
  }

  const filtered = profiles.filter(p=> (p.proprietario+p.cane+p.email).toLowerCase().includes(q.toLowerCase()))

  if(!pinOk){
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-white rounded-[2rem] p-6 w-full max-w-[380px]">
          <h1 className="font-black text-xl">Admin Leash Love</h1>
          <p className="text-xs text-red-600 font-bold mt-1">Accesso riservato proprietario</p>
          <p className="mt-4 text-xs font-bold">Email</p>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="sacchinellifrancesco@gmail.com" className="mt-1 w-full p-4 rounded-2xl border"/>
          <p className="mt-3 text-xs font-bold">PIN</p>
          <input value={pin} onChange={e=>setPin(e.target.value)} type="password" placeholder="Leash2026 o opsedici" className="mt-1 w-full p-4 rounded-2xl border"/>
          <button onClick={checkAccess} className="mt-4 w-full p-4 rounded-full bg-black text-white font-black">Entra come admin</button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] p-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-black text-2xl">Admin - Solo Francesco</h1>
          <button onClick={()=>{localStorage.removeItem('leashlove_admin_ok'); setPinOk(false)}} className="underline text-xs">Esci</button>
        </div>
        <div className="bg-white border rounded-[2rem] p-4 mt-6">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca" className="w-full p-3 rounded-full border text-sm"/>
          <div className="mt-4 space-y-2">
            {filtered.map((p:any,i:number)=><div key={i} className="border rounded-xl p-3 text-sm"><b>{p.cane}</b> - {p.proprietario} ({p.email})</div>)}
            {filtered.length===0 && <p className="text-sm text-zinc-400 text-center py-6">Nessun iscritto su questo device</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
