'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Vicino() {
  const [range, setRange] = useState(10)
  const [profiles, setProfiles] = useState([])

  useEffect(()=>{ fetchProfiles() },[])

  const fetchProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at',{ascending:false})
    if(data) setProfiles(data)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Vicino a te</h1>
      <div className="mb-4">
        <label>Raggio: {range} km</label>
        <input type="range" min="1" max="200" value={range} onChange={e=>setRange(e.target.value)} className="w-full"/>
        <div className="flex justify-between text-xs"><span>1km</span><span>200km</span></div>
      </div>
      <div className="grid gap-3">
        {profiles.map(p=>(
          <div key={p.id} className="border p-3 rounded">
            <img src={p.photos?.[0] || p.foto_cane_url} className="w-full h-48 object-cover rounded mb-2"/>
            <p className="font-bold">{p.nome_cane} ({p.eta_cane} anni) - {p.dog_size}</p>
            <p className="text-sm">{p.dog_temperamento} • {p.dog_socievolezza} • {p.dog_energia}</p>
            <p className="text-sm mt-1">{p.descrizione}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
