'use client'
import { useEffect, useState } from 'react'

export default function Mappa() {
  const [pos, setPos] = useState<{lat:number, lon:number}|null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    const p = localStorage.getItem('zampevicine_profile')
    if(p) setProfile(JSON.parse(p))

    if(!navigator.geolocation) { setErr('GPS non supportato'); return }
    navigator.geolocation.getCurrentPosition(
      (g) => setPos({lat: g.coords.latitude, lon: g.coords.longitude}),
      (e) => setErr('Devi consentire il GPS: ' + e.message),
      {enableHighAccuracy: true, timeout: 10000}
    )
  }, [])

  const bbox = pos ? `${pos.lon-0.02},${pos.lat-0.012},${pos.lon+0.02},${pos.lat+0.012}` : `12.442,41.895,12.488,41.92`
  const marker = pos ? `${pos.lat},${pos.lon}` : `41.9075,12.465`

  return (
    <main className="h-screen flex flex-col bg-white">
      <div className="p-4 flex justify-between items-center border-b">
        <a href="/" className="font-black">🐾 Zampe Vicine</a>
        <div className="text-xs text-right">
          {profile ? <><b>{profile.cane}</b> di {profile.padrone}</> : <a href="/iscriviti" className="underline">Crea profilo</a>}
        </div>
      </div>

      {pos ? (
        <div className="bg-green-50 text-green-700 text-sm p-2 text-center">📍 GPS attivo: {pos.lat.toFixed(4)}, {pos.lon.toFixed(4)} - Mappa centrata su di te</div>
      ) : (
        <div className="bg-amber-50 text-amber-800 text-sm p-2 text-center">{err || 'Cerco GPS... consenti la posizione'} - mostro Vaticano come fallback</div>
      )}

      <div className="flex-1 relative">
        <iframe key={bbox} width="100%" height="100%" style={{border:0}} src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`}></iframe>
        <div className="absolute bottom-6 left-4 right-4 bg-white rounded-[1.5rem] p-4 shadow-2xl border">
          <p className="font-black">{profile ? `Ciao ${profile.padrone} e ${profile.cane}!` : 'Sei vicino a:'} </p>
          <p className="text-sm text-zinc-500">{pos ? 'Trovato! La mappa è sulla tua posizione reale.' : 'Attiva il GPS dal browser per vederti sulla mappa'}</p>
          <div className="mt-3 flex gap-2">
            <a href="/" className="px-4 py-2 rounded-full border text-sm">Home</a>
            <button onClick={()=>{localStorage.removeItem('zampevicine_profile'); location.href='/iscriviti'}} className="px-4 py-2 rounded-full bg-black text-white text-sm">Cambia profilo</button>
          </div>
        </div>
      </div>
    </main>
  )
}
