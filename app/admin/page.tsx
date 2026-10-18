'use client'
import { useEffect, useState } from 'react'

type Profile = {
  proprietario: string
  email: string
  cane: string
  taglia: string
  energia: string
  indole: string
  bio: string
  fotoCane?: string
  fotoPadrone?: string
  createdAt?: string
  pagato?: boolean
}

export default function AdminPage(){
  const [pinOk, setPinOk] = useState(false)
  const [pin, setPin] = useState('')
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [q, setQ] = useState('')

  useEffect(()=>{
    const stored = localStorage.getItem('leashlove_profiles')
    if(stored){
      setProfiles(JSON.parse(stored))
    } else {
      // demo per farti vedere come appare
      setProfiles([
        {proprietario:'Marco Rossi', email:'marco@test.it', cane:'Luna', taglia:'Piccola', energia:'Vivace', indole:'Socievole', bio:'Ama Villa Borghese', createdAt: new Date().toISOString(), pagato: true, fotoCane:'', fotoPadrone:''},
        {proprietario:'Giulia B.', email:'giulia@test.it', cane:'Rocky', taglia:'Media', energia:'Tranquillo', indole:'Protettivo', bio:'Cerca compagnia la sera', createdAt: new Date(Date.now()-86400000*2).toISOString(), pagato: false, fotoCane:'', fotoPadrone:''},
        {proprietario:'Luca', email:'luca@test.it', cane:'Milo', taglia:'Grande', energia:'Esplosivo', indole:'Socievole', bio:'Corriamo tutti i giorni', createdAt: new Date().toISOString(), pagato: true, fotoCane:'', fotoPadrone:''},
      ])
    }
    const savedPin = localStorage.getItem('leashlove_admin_ok')
    if(savedPin === 'yes') setPinOk(true)
  },[])

  function checkPin(){
    if(pin === 'Leash2026'){ // cambia qui la password
      setPinOk(true)
      localStorage.setItem('leashlove_admin_ok','yes')
    } else alert('PIN errato')
  }

  const tot = profiles.length
  const oggi = profiles.filter(p=> p.createdAt && new Date(p.createdAt).toDateString() === new Date().toDateString()).length
  const settimana = profiles.filter(p=> p.createdAt && new Date(p.createdAt) > new Date(Date.now()-7*86400000)).length
  const pagati = profiles.filter(p=>p.pagato).length
  const daPagare = tot - pagati

  const filtered = profiles.filter(p=> (p.proprietario+p.cane+p.email).toLowerCase().includes(q.toLowerCase()))

  function togglePay(i:number){
    const copy = [...profiles]
    copy[i].pagato = !copy[i].pagato
    setProfiles(copy)
    localStorage.setItem('leashlove_profiles', JSON.stringify(copy))
  }

  function delProfile(i:number){
    if(!confirm('Eliminare?')) return
    const copy = profiles.filter((_,idx)=>idx!==i)
    setProfiles(copy)
    localStorage.setItem('leashlove_profiles', JSON.stringify(copy))
  }

  function exportCsv(){
    const rows = [['proprietario','email','cane','taglia','energia','indole','pagato','data']].concat(profiles.map(p=>[p.proprietario,p.email,p.cane,p.taglia,p.energia,p.indole, p.pagato?'SI':'NO', p.createdAt||'']))
    const csv = rows.map(r=>r.join(';')).join('\n')
    const blob = new Blob([csv], {type:'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download='leashlove_report.csv'; a.click()
  }

  if(!pinOk){
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="bg-white text-black rounded-[2rem] p-6 w-full max-w-[360px]">
          <h1 className="font-black text-xl">Admin Leash Love</h1>
          <p className="text-sm text-zinc-500 mt-1">Pagina riservata a te</p>
          <input value={pin} onChange={e=>setPin(e.target.value)} type="password" placeholder="Inserisci PIN" className="mt-4 w-full p-4 rounded-2xl border"/>
          <button onClick={checkPin} className="mt-3 w-full p-4 rounded-full bg-black text-white font-black">Entra</button>
          <p className="text-[11px] text-zinc-400 mt-3">PIN di default: Leash2026 - poi lo cambiamo</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] p-4 md:p-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-[28px] font-black">🐾 Admin Leash Love</h1>
          <button onClick={()=>{localStorage.removeItem('leashlove_admin_ok'); setPinOk(false)}} className="text-xs underline">Esci</button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="bg-white border rounded-[1.5rem] p-4"><p className="text-xs text-zinc-500">Totale iscritti</p><p className="text-3xl font-black">{tot}</p></div>
          <div className="bg-white border rounded-[1.5rem] p-4"><p className="text-xs text-zinc-500">Oggi</p><p className="text-3xl font-black">{oggi}</p></div>
          <div className="bg-white border rounded-[1.5rem] p-4"><p className="text-xs text-zinc-500">Settimana</p><p className="text-3xl font-black">{settimana}</p></div>
          <div className="bg-black text-white rounded-[1.5rem] p-4"><p className="text-xs opacity-70">Pagamenti</p><p className="text-xl font-black">{pagati} pagati / {daPagare} no</p></div>
        </div>

        {/* REPORT */}
        <div className="bg-white border rounded-[2rem] p-5 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="font-black">Report settimanale</h2>
            <button onClick={exportCsv} className="px-4 py-2 rounded-full bg-black text-white text-xs font-bold">Esporta CSV</button>
          </div>
          <p className="text-sm text-zinc-600 mt-2">Questa settimana: {settimana} nuovi. Conversione pagamento: {tot? Math.round(pagati/tot*100):0}%</p>
          <div className="mt-3 h-2 bg-zinc-100 rounded-full overflow-hidden"><div className="h-full bg-black" style={{width:`${tot? pagati/tot*100:0}%`}}></div></div>
        </div>

        {/* LISTA */}
        <div className="bg-white border rounded-[2rem] p-5 mt-6">
          <div className="flex gap-2">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca proprietario, cane, email" className="flex-1 p-3 rounded-full border text-sm"/>
          </div>
          <div className="mt-4 space-y-3">
            {filtered.map((p, i)=>(
              <div key={i} className="flex gap-3 items-center border rounded-[1.2rem] p-3">
                <div className="w-12 h-12 rounded-full bg-zinc-100 overflow-hidden flex items-center justify-center text-xl">{p.fotoCane ? <img src={p.fotoCane} className="w-full h-full object-cover"/> : '🐕'}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{p.cane} • {p.proprietario} <span className="font-normal text-zinc-500">({p.email})</span></p>
                  <p className="text-[11px] text-zinc-500">{p.taglia} • {p.energia} • {p.indole} • {p.createdAt? new Date(p.createdAt).toLocaleDateString() : ''}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={()=>togglePay(i)} className={`px-3 py-1 rounded-full text-[11px] font-bold ${p.pagato?'bg-green-500 text-white':'bg-red-100 text-red-700'}`}>{p.pagato?'Pagato':'Non pagato'}</button>
                  <button onClick={()=>delProfile(i)} className="text-[10px] underline text-zinc-400">Elimina</button>
                </div>
              </div>
            ))}
            {filtered.length===0 && <p className="text-sm text-zinc-400 text-center py-8">Nessun iscritto trovato</p>}
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-[1.5rem] p-4 text-xs">
          <p className="font-bold">Prossimo step: database</p>
          <p className="mt-1">Ora salva in locale. Appena mi dici ok, colleghiamo a Supabase così vedi gli iscritti veri di tutti, non solo dal tuo telefono. Ti preparo tabella: users, dogs, payments, reports.</p>
        </div>
      </div>
    </main>
  )
}
