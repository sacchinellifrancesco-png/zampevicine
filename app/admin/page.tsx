'use client'
import { useEffect, useState } from 'react'

// --- CREDENZIALI IMPOSTATE DA TE ---
const ADMIN_EMAILS = ['francesco.sacchinelli@gmail.com', 'sacchinelli.francesco@gmail.com']
const ADMIN_PINS = ['Leash2026', 'opsedici', 'Opsedici', 'OPSEDICI']
// -----------------------------------

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
    const emailOk = ADMIN_EMAILS.map(e=>e.toLowerCase()).includes(email.toLowerCase().trim())
    const pinOkCheck = ADMIN_PINS.map(p=>p.toLowerCase()).includes(pin.toLowerCase().trim())
    if(emailOk && pinOkCheck){
      setPinOk(true)
      localStorage.setItem('leashlove_admin_ok','yes')
    } else {
      alert('Accesso negato: email o PIN errati')
    }
  }

  const tot = profiles.length
  const oggi = profiles.filter(p=> p.createdAt && new Date(p.createdAt).toDateString() === new Date().toDateString()).length
  const settimana = profiles.filter(p=> p.createdAt && new Date(p.createdAt) > new Date(Date.now()-7*86400000)).length
  const pagati = profiles.filter(p=>p.pagato).length
  const filtered = profiles.filter(p=> (p.proprietario+p.cane+p.email).toLowerCase().includes(q.toLowerCase()))

  if(!pinOk){
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-white rounded-[2rem] p-6 w-full max-w-[380px]">
          <h1 className="font-black text-xl">Admin Leash Love</h1>
          <p className="text-xs text-red-600 font-bold mt-1">Accesso riservato proprietario</p>
          <p className="mt-4 text-xs font-bold">Email amministratore</p>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="tua email" className="mt-1 w-full p-4 rounded-2xl border"/>
          <p className="mt-3 text-xs font-bold">PIN amministratore</p>
          <input value={pin} onChange={e=>setPin(e.target.value)} type="password" placeholder="PIN" className="mt-1 w-full p-4 rounded-2xl border"/>
          <button onClick={checkAccess} className="mt-4 w-full p-4 rounded-full bg-black text-white font-black">Entra come admin</button>
          <p className="text-[10px] text-zinc-400 mt-3 text-center">francesco.sacchinelli@gmail.com + Leash2026 / opsedici</p>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="bg-white border rounded-[1.5rem] p-4"><p className="text-xs text-zinc-500">Totale</p><p className="text-2xl font-black">{tot}</p></div>
          <div className="bg-white border rounded-[1.5rem] p-4"><p className="text-xs text-zinc-500">Oggi</p><p className="text-2xl font-black">{oggi}</p></div>
          <div className="bg-white border rounded-[1.5rem] p-4"><p className="text-xs text-zinc-500">Settimana</p><p className="text-2xl font-black">{settimana}</p></div>
          <div className="bg-black text-white rounded-[1.5rem] p-4"><p className="text-xs opacity-70">Pagati</p><p className="text-lg font-black">{pagati} / {tot-pagati}</p></div>
        </div>

        <div className="bg-white border rounded-[2rem] p-4 mt-6">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca cane, proprietario, email" className="w-full p-3 rounded-full border text-sm"/>
          <div className="mt-4 space-y-2">
            {filtered.map((p:any,i:number)=><div key={i} className="border rounded-xl p-3 text-sm flex justify-between"><span><b>{p.cane}</b> - {p.proprietario} ({p.email})</span><span className={`text-[11px] font-bold ${p.pagato?'text-green-600':'text-red-500'}`}>{p.pagato?'PAGATO':'NO'}</span></div>)}
            {filtered.length===0 && <p className="text-sm text-zinc-400 text-center py-6">Nessun iscritto su questo device - dopo colleghiamo Supabase per vedere tutti</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
