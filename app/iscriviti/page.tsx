'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function IscrivitiPage() {
  const router = useRouter()
  const [fotoCane, setFotoCane] = useState('')
  const [fotoPadrone, setFotoPadrone] = useState('')
  const [form, setForm] = useState({ proprietario: '', email: '', cane: '', password: '', conferma: '', bio: '', taglia: '', energia: '', indole: '' })
  const [check, setCheck] = useState({ privacy: false, termini: false, resp: false })

  function onFoto(setter:any){ return (e:any)=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>setter(r.result as string); r.readAsDataURL(f) } }

  function salva(e:any){
    e.preventDefault()
    if(!form.proprietario || !form.cane) return alert('Nome proprietario e cane obbligatori')
    if(form.password !== form.conferma) return alert('Password non coincidono')
    if(!check.privacy || !check.termini || !check.resp) return alert('Accetta le 3 spunte')
    localStorage.setItem('leashlove_profile', JSON.stringify({...form, fotoCane, fotoPadrone}))
    router.push('/mappa')
  }

  const Pill = ({g,v}:any)=>{ const sel=(form as any)[g]===v; return <button type="button" onClick={()=>setForm({...form,[g]:v})} className={`px-4 py-2 rounded-full text-sm font-bold border ${sel?'bg-black text-white border-black':'bg-white text-zinc-600'}`}>{v}</button>}

  return (
    <main className="min-h-screen bg-[#FFFBF0] p-6 flex justify-center">
      <form onSubmit={salva} className="w-full max-w-[420px] bg-white rounded-[2rem] p-6 border">
        <a href="/" className="font-black">🐾 Leash Love</a>
        <h1 className="text-[28px] font-black mt-4">Crea profilo</h1>

        {/* DUE FOTO SEPARATE COME CHIESTO */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="border rounded-[1.5rem] p-3 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#FFE8CC] border overflow-hidden flex items-center justify-center">{fotoCane ? <img src={fotoCane} className="w-full h-full object-cover"/> : <>🐕</>}</div>
            <p className="font-bold text-xs mt-2">Cane</p>
            <label className="mt-2 px-3 py-2 rounded-full bg-black text-white text-[11px] font-bold cursor-pointer">Carica foto per cane<input type="file" accept="image/*" className="hidden" onChange={onFoto(setFotoCane)}/></label>
          </div>
          <div className="border rounded-[1.5rem] p-3 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-zinc-100 border overflow-hidden flex items-center justify-center">{fotoPadrone ? <img src={fotoPadrone} className="w-full h-full object-cover"/> : <>🙂</>}</div>
            <p className="font-bold text-xs mt-2">Padrone</p>
            <label className="mt-2 px-3 py-2 rounded-full bg-white border text-[11px] font-bold cursor-pointer">Carica foto per padrone<input type="file" accept="image/*" className="hidden" onChange={onFoto(setFotoPadrone)}/></label>
          </div>
        </div>

        <p className="mt-5 font-bold text-sm">Nome proprietario</p><input value={form.proprietario} onChange={e=>setForm({...form,proprietario:e.target.value})} className="mt-1 w-full p-4 rounded-2xl border"/>
        <p className="mt-3 font-bold text-sm">Nome cane</p><input value={form.cane} onChange={e=>setForm({...form,cane:e.target.value})} className="mt-1 w-full p-4 rounded-2xl border"/>

        <p className="mt-4 font-bold text-sm">3 caratteristiche</p>
        <div className="mt-2 flex gap-2">{['Piccola','Media','Grande'].map(v=><Pill key={v} g="taglia" v={v}/>)}</div>
        <div className="mt-2 flex gap-2">{['Tranquillo','Vivace','Esplosivo'].map(v=><Pill key={v} g="energia" v={v}/>)}</div>
        <div className="mt-2 flex gap-2">{['Socievole','Riservato','Protettivo'].map(v=><Pill key={v} g="indole" v={v}/>)}</div>

        <div className="mt-6 space-y-3 text-[11px] bg-zinc-50 p-4 rounded-2xl border">
          <label className="flex gap-2"><input type="checkbox" checked={check.resp} onChange={e=>setCheck({...check,resp:e.target.checked})}/> Dichiaro maggiorenne e responsabile art.2052 c.c.</label>
          <label className="flex gap-2"><input type="checkbox" checked={check.privacy} onChange={e=>setCheck({...check,privacy:e.target.checked})}/> Accetto <a href="/privacy" className="underline font-bold">Privacy</a></label>
          <label className="flex gap-2"><input type="checkbox" checked={check.termini} onChange={e=>setCheck({...check,termini:e.target.checked})}/> Accetto <a href="/termini" className="underline font-bold">Termini</a></label>
        </div>

        <button disabled={!check.privacy || !check.termini || !check.resp} className="mt-4 w-full p-4 rounded-full bg-black text-white font-black disabled:opacity-30">Salva</button>
      </form>
    </main>
  )
}
