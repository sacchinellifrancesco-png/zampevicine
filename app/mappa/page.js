'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Mappa() {
  const [range, setRange] = useState(10)
  const [pos, setPos] = useState(null)
  const [profiles, setProfiles] = useState([])

  useEffect(()=>{ fetchProfiles() },[])
  
  const fetchProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at',{ascending:false})
    if(data) setProfiles(data)
  }

  const getGPS = () => {
    navigator.geolocation.getCurrentPosition(p=>setPos({lat:p.coords.latitude, lng:p.coords.longitude}))
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Mappa</h1>
        <button onClick={getGPS} className="bg-black text-white px-4 py-2 rounded-full">📍 GPS</button>
      </div>
      <div className="mb-4">
        <label>Raggio: {range} km</label>
        <input type="range" min="1" max="200" value={range} onChange={e=>setRange(e.target.value)} className="w-full"/>
        <div className="flex justify-between text-xs"><span>1km</span><span>200km</span></div>
      </div>
      <div className="flex flex-col gap-3">
        {profiles.map(p=>(
          <div key={p.id} className="border p-3 rounded flex gap-3">
            <img src={p.foto_cane_url || p.photos?.[0]} className="w-16 h-16 rounded object-cover"/>
            <div><p className="font-bold">{p.nome_cane} - {p.dog_size}</p><p className="text-sm">{p.nome_proprietario} - {p.dog_temperamento} / {p.dog_socievolezza}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}
