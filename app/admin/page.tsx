'use client'
import { useEffect, useState } from 'react'

export default function AdminPage(){
  const [pinOk, setPinOk] = useState(false)
  const [pin, setPin] = useState('')
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(()=>{
    if(localStorage.getItem('leashlove_admin_ok')==='yes') setPinOk(true)
    const stored = localStorage.getItem('leashlove_profiles')
    if(stored) setProfiles(JSON.parse(stored))
  },[])

  if(!pinOk){
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-white rounded-[2rem] p-6 w-full max-w-[360px]">
          <h1 className="font-black text-xl">Admin Leash Love</h1>
          <p className="text-xs text-red-600 font-bold mt-1">Accesso riservato solo al proprietario</p>
          <input value={pin} onChange={e=>setPin(e.target.value)} type="password" placeholder="PIN proprietario" className="mt-4 w-full p-4 rounded-2xl border"/>
          <button onClick={()=>{
            if(pin==='Leash2026'){ setPinOk(true); localStorage.setItem('leashlove_admin_ok','yes') } 
            else alert('PIN errato - accesso negato')
          }} className="mt-3 w-full p-4 rounded-full bg-black text-white font-black">Entra</button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] p-6">
      <div className="max-w-[900px] mx-auto">
        <div className="flex justify-between"><h1 className="font-black text-2xl">Admin - Solo Tu</h1><button onClick={()=>{localStorage.removeItem('leashlove_admin_ok'); setPinOk(false)}} className="underline text-xs">Esci</button></div>
        <p className="text-sm mt-2">Iscritti di prova sul tuo device: {profiles.length}</p>
        <div className="mt-4 space-y-2">
          {profiles.map((p,i)=><div key={i} className="bg-white border rounded-xl p-3 text-sm"><b>{p.cane}</b> - {p.proprietario} ({p.email})</div>)}
        </div>
        <p className="text-[11px] text-zinc-500 mt-6">Per vedere gli iscritti veri di tutti gli utenti, prossimo step Supabase. Nessun nuovo iscritto può entrare qui senza PIN.</p>
      </div>
    </main>
  )
}
