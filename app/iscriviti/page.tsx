'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function IscrivitiPage() {
  const router = useRouter()
  const [foto, setFoto] = useState('')
  const [form, setForm] = useState({ 
    proprietario: '', email: '', cane: '', 
    password: '', conferma: '',
    bio: '', taglia: '', energia: '', indole: '' 
  })
  const [check, setCheck] = useState({ privacy: false, termini: false, resp: false })

  function onFoto(e:any){ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>setFoto(r.result as string); r.readAsDataURL(f) }

  function salva(e:any){
    e.preventDefault()
    if(!form.proprietario || !form.cane) return alert('Nome proprietario e cane obbligatori')
    if(!form.password || form.password.length < 8) return alert('Password minimo 8 caratteri')
    if(form.password !== form.conferma) return alert('Le password non coincidono')
    if(!form.taglia || !form.energia || !form.indole) return alert('Seleziona le 3 caratteristiche')
    if(!check.privacy || !check.termini || !check.resp) return alert('Devi accettare le 3 spunte')
    // in beta salviamo in locale
    localStorage.setItem('zampevicine_profile', JSON.stringify({...form, foto}))
    router.push('/mappa')
  }

  const Pill = ({g,v}:any)=>{ const sel=(form as any)[g]===v; return <button type="button" onClick={()=>setForm({...form,[g]:v})} className={`px-4 py-2 rounded-full text-sm font-bold border ${sel?'bg-black text-white border-black':'bg-white text-zinc-600'}`}>{v}</button> }

  return (
    <main className="min-h-screen bg-[#FFFBF0] p-6 flex justify-center">
      <form onSubmit={salva} className="w-full max-w-[420px] bg-white rounded-[2rem] p-6 border">
        <a href="/" className="font-black">🐾 Zampe Vicine</a>
        <h1 className="text-[26px] font-black mt-4 leading-tight">Crea profilo cane + padrone</h1>

        <div className="mt-5 flex gap-3 items-center">
          <div className="w-16 h-16 rounded-full bg-zinc-100 border overflow-hidden flex items-center justify-center">{foto ? <img src={foto} className="w-full h-full object-cover"/> : <>🐶</>}</div>
          <label className="px-4 py-2 rounded-full bg-black text-white text-sm font-bold cursor-pointer">Carica foto<input type="file" accept="image/*" className="hidden" onChange={onFoto}/></label>
        </div>

        <p className="mt-5 font-bold text-sm">Nome proprietario</p>
        <input value={form.proprietario} onChange={e=>setForm({...form,proprietario:e.target.value})} placeholder="Es. Marco Rossi" className="mt-1 w-full p-4 rounded-2xl border"/>

        <p className="mt-3 font-bold text-sm">Email</p>
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" placeholder="marco@email.com" className="mt-1 w-full p-4 rounded-2xl border"/>

        <p className="mt-3 font-bold text-sm">Nome cane</p>
        <input value={form.cane} onChange={e=>setForm({...form,cane:e.target.value})} placeholder="Es. Luna" className="mt-1 w-full p-4 rounded-2xl border"/>

        <p className="mt-3 font-bold text-sm">Inserisci password</p>
        <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Min. 8 caratteri" className="mt-1 w-full p-4 rounded-2xl border"/>

        <p className="mt-3 font-bold text-sm">Conferma password</p>
        <input value={form.conferma} onChange={e=>setForm({...form,conferma:e.target.value})} type="password" placeholder="Ripeti password" className="mt-1 w-full p-4 rounded-2xl border"/>

        <p className="mt-4 font-bold text-sm">3 caratteristiche (al posto della razza)</p>
        <div className="mt-2 flex gap-2">{['Piccola','Media','Grande'].map(v=><Pill key={v} g="taglia" v={v}/>)}</div>
        <div className="mt-2 flex gap-2">{['Tranquillo','Vivace','Esplosivo'].map(v=><Pill key={v} g="energia" v={v}/>)}</div>
        <div className="mt-2 flex gap-2">{['Socievole','Riservato','Protettivo'].map(v=><Pill key={v} g="indole" v={v}/>)}</div>

        <p className="mt-3 font-bold text-sm">Breve descrizione</p>
        <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} rows={2} placeholder="Es. ama correre al parco..." className="mt-1 w-full p-4 rounded-2xl border"></textarea>

        <div className="mt-6 space-y-3 text-[12px] leading-tight bg-zinc-50 p-4 rounded-2xl border">
          <label className="flex gap-2"><input type="checkbox" checked={check.resp} onChange={e=>setCheck({...check,resp:e.target.checked})}/> Dichiaro di essere maggiorenne, proprietario del cane e responsabile ex art.2052 c.c.</label>
          <label className="flex gap-2"><input type="checkbox" checked={check.privacy} onChange={e=>setCheck({...check,privacy:e.target.checked})}/> Ho letto e accetto <a href="/privacy" className="underline font-bold">Privacy GDPR</a></label>
          <label className="flex gap-2"><input type="checkbox" checked={check.termini} onChange={e=>setCheck({...check,termini:e.target.checked})}/> Ho letto e accetto <a href="/termini" className="underline font-bold">Termini ed Esonero totale</a></label>
        </div>

        <button disabled={!check.privacy || !check.termini || !check.resp} className="mt-4 w-full p-4 rounded-full bg-black text-white font-black disabled:opacity-30">Salva e vai alla Mappa</button>
      </form>
    </main>
  )
}
