'use client'
import { useEffect, useState } from 'react'

type Pos = { lat: number, lon: number, acc: number }

export default function Mappa() {
  const [pos, setPos] = useState<Pos | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const p = localStorage.getItem('zampevicine_profile')
    if(p) setProfile(JSON.parse(p))
    chiediGPS()
  }, [])

  function chiediGPS() {
    setLoading(true)
    setErr('')
    if(!navigator.geolocation) {
      setErr('GPS non supportato da questo browser')
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (g) => {
        setPos({ lat: g.coords.latitude, lon: g.coords.longitude, acc: g.coords.accuracy })
        setLoading(false)
      },
      (e) => {
        if(e.code === 1) setErr('Permesso negato. Devi cliccare Consenti alla posizione e ricaricare.')
        else if(e.code === 2) setErr('Posizione non disponibile. Attiva il GPS del telefono.')
        else setErr('Timeout GPS. Riprova all\'aperto. ' + e.message)
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    )
  }

  const delta = 0.015 // ~1.5km
  const bbox = pos ? `${pos.lon - delta},${pos.lat - delta},${pos.lon + delta},${pos.lat + delta}` : `12.442,41.895,12.488,41.92`
  const marker = pos ? `${pos.lat},${pos.lon}` : `41.9075,12.465`
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`

  return (
    <main className="h-[100dvh] flex flex-col bg-[#FFFBF0]">
      {/* HEADER */}
      <div className="p-4 bg-white border-b flex justify-between items-center">
        <a href="/" className="font-black">🐾 Zampe Vicine</a>
        <div className="flex items-center gap-2">
          <button onClick={chiediGPS} className="text-xs px-3 py-1.5 rounded-full border font-bold bg-zinc-50">📍 Aggiorna GPS</button>
          <a href="/iscriviti" className="text-xs underline">Profilo</a>
        </div>
      </div>

      {/* STATUS GPS */}
      <div className={`text-[13px] p-2.5 text-center font-medium ${err ? 'bg-red-50 text-red-700' : pos ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
        {loading && '🔍 Cerco la tua posizione... consenti quando te lo chiede il telefono'}
        {err && `⚠️ ${err}`}
        {pos && !loading && !err && `✅ GPS attivo - ${pos.lat.toFixed(5)}, ${pos.lon.toFixed(5)} - precisione ${Math.round(pos.acc)}m`}
      </div>

      {/* MAPPA */}
      <div className="flex-1 relative bg-zinc-100">
        <iframe key={mapSrc} width="100%" height="100%" style={{border:0}} src={mapSrc} loading="lazy" />
        
        {/* CARD BOTTOM */}
        <div className="absolute bottom-3 left-3 right-3 bg-white rounded-[1.6rem] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.2)] border">
          {profile ? (
            <div className="flex gap-3 items-center">
              {profile.foto && <img src={profile.foto} className="w-14 h-14 rounded-full object-cover border" />}
              <div className="flex-1">
                <p className="font-black leading-tight">{profile.cane} <span className="font-normal text-zinc-500">di {profile.padrone}</span></p>
                <p className="text-xs text-zinc-500 mt-0.5">{[profile.taglia, profile.energia, profile.indole].filter(Boolean).join(' • ')} {profile.bio ? `— ${profile.bio}` : ''}</p>
                <p className="text-[11px] text-zinc-400 mt-1">Posizione usata solo per la mappa, non salvata sul server. Vedi privacy.</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-black">Sei vicino a Villa Borghese?</p>
                <p className="text-xs text-zinc-500">Attiva GPS per vedere i cani davvero vicino a te</p>
              </div>
              <a href="/iscriviti" className="px-4 py-2 rounded-full bg-black text-white text-sm font-bold">Crea profilo</a>
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-zinc-50 border text-xs"><b>🐕 Luna</b> - 180m da te • Socievole</div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border text-xs"><b>🦮 Rocky</b> - 420m da te • Vivace</div>
          </div>
        </div>
      </div>
    </main>
  )
}
