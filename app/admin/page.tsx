'use client'
import { useEffect, useState } from 'react'

export default function AdminPage(){
  const [ok, setOk] = useState(false)
  const [pin, setPin] = useState('')
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(()=>{
    if(localStorage.getItem('leashlove_admin_ok')==='yes') setOk(true)
    const s = localStorage.getItem('leashlove_profiles')
    if(s) setProfiles(JSON.parse(s))
  },[])

  function entra(){
    const p = pin.toLowerCase().trim()
    if(p === 'leash2026' || p === 'opsedici'){
      setOk(true)
      localStorage.setItem('leashlove_admin_ok','yes')
    } else {
      alert('PIN errato')
    }
  }

  if(!ok){
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-white rounded-[2rem] p-6 w-full max-w-[340px]">
          <h1 className="font-black text-xl">Admin Leash Love</h1>
          <p className="text-[11px] text-zinc-400 mt-1">Accesso riservato</p>
          
          <input 
            value={pin} 
            onChange={e=>setPin(e.target.value)} 
            type="password"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder=""
            className="mt-6 w-full p-4 rounded-2xl border bg-white text-black outline-none"
          />
          <button onClick={entra} className="mt-4 w-full p-4 rounded-full bg-black text-white font-black">Entra</button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] p-6">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-black text-2xl">Admin - Sei dentro ✅</h1>
        <button onClick={()=>{localStorage.removeItem('leashlove_admin_ok'); setOk(false)}} className="underline text-xs mt-2">Esci</button>
        <div className="mt-6 bg-white border rounded-2xl p-4">
          <p>Iscrizioni: {profiles.length}</p>
        </div>
      </div>
    </main>
  )
}
