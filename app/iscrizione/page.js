'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const temperamenti = ['Dolce', 'Vivace', 'Calmo', 'Protettivo', 'Giocoso', 'Timido']
const socievolezze = ['Molto socievole', 'Socievole', 'Selettivo', 'Poco socievole']
const energie = ['Bassa', 'Media', 'Alta', 'Molto alta']

export default function Iscrizione() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [form, setForm] = useState({
    email: '', owner_name: '', dog_name: '', dog_breed: '', dog_age: '', dog_size: '',
    dog_temperamento: '', dog_socievolezza: '', dog_energia: '', dog_description: ''
  })
  const [dogFiles, setDogFiles] = useState([null, null, null, null])
  const [ownerFile, setOwnerFile] = useState(null)
  const [coords, setCoords] = useState({ lat: null, lng: null })

  useEffect(()=>{ setReadOnly(true) }, [])

  const handleFile = (i, file) => {
    const c = [...dogFiles]; c[i]=file; setDogFiles(c)
  }
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      p => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => alert('Attiva GPS')
    )
  }
  const uploadFile = async (file) => {
    const path = `${Date.now()}-${Math.random()}-${file.name}`
    const { error } = await supabase.storage.from('dog-photos').upload(path, file)
    if(error) throw error
    return supabase.storage.from('dog-photos').getPublicUrl(path).data.publicUrl
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(dogFiles.filter(Boolean).length < 2){ alert('MINIMO 2 FOTO: Foto 1 e Foto 2 obbligatorie'); return }
    if(!coords.lat){ alert('Devi cliccare GPS'); return }
    setLoading(true)
    try{
      const urls = []
      for(let f of dogFiles.filter(Boolean)){ urls.push(await uploadFile(f)) }
      let ownerUrl = ownerFile ? await uploadFile(ownerFile) : null
      const { data, error } = await supabase.from('profiles').insert({
        ...form, photos: urls, foto_proprietario_url: ownerUrl, lat: coords.lat, lng: coords.lng
      }).select().single()
      if(error) throw error
      localStorage.setItem('leashlove_user', JSON.stringify(data))
      router.push('/mappa')
    }catch(err){ alert(err.message) }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <div className="bg-green-600 text-white p-3 text-center font-bold mb-4 rounded">NUOVA VERSIONE 2.0 - SE VEDI QUESTO IL FILE SI E' AGGIORNATO</div>
      <button onClick={()=>router.back()} className="mb-4">{'< Indietro'}</button>
      <h1 className="text-2xl font-bold mb-6">Iscriviti</h1>
      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-4">
        <div><label className="text-sm font-semibold">Email:</label><input type="text" required value={form.email} readOnly={readOnly} onFocus={()=>setReadOnly(false)} onChange={e=>setForm({...form, email:e.target.value})} className="border p-3 rounded w-full bg-white" /></div>
        <div><label className="text-sm font-semibold">Nome proprietario:</label><input required value={form.owner_name} onChange={e=>setForm({...form, owner_name:e.target.value})} className="border p-3 rounded w-full" /></div>
        <div><label className="text-sm font-semibold">Nome cane:</label><input required value={form.dog_name} onChange={e=>setForm({...form, dog_name:e.target.value})} className="border p-3 rounded w-full" /></div>
        <div className="grid grid-cols-2 gap-2">
          <div><label className="text-sm font-semibold">Taglia:</label><select value={form.dog_size} onChange={e=>setForm({...form, dog_size:e.target.value})} className="border p-3 rounded w-full"><option value="">Seleziona</option><option>Piccola</option><option>Media</option><option>Grande</option></select></div>
          <div><label className="text-sm font-semibold">Età:</label><select value={form.dog_age} onChange={e=>setForm({...form, dog_age:e.target.value})} className="border p-3 rounded w-full"><option value="">Seleziona</option><option>Cucciolo</option><option>Adulto</option><option>Senior</option></select></div>
        </div>
        <div><label className="text-sm font-semibold">Temperamento:</label><div className="flex flex-wrap gap-2 mt-2">{temperamenti.map(t=><button type="button" key={t} onClick={()=>setForm({...form, dog_temperamento:t})} className={`px-3 py-2 rounded-full border text-sm ${form.dog_temperamento===t?'bg-black text-white':'bg-white'}`}>{t}</button>)}</div></div>
        <div><label className="text-sm font-semibold">Socievolezza:</label><div className="flex flex-wrap gap-2 mt-2">{socievolezze.map(s=><button type="button" key={s} onClick={()=>setForm({...form, dog_socievolezza:s})} className={`px-3 py-2 rounded-full border text-sm ${form.dog_socievolezza===s?'bg-black text-white':'bg-white'}`}>{s}</button>)}</div></div>
        <div><label className="text-sm font-semibold">Energia:</label><div className="flex flex-wrap gap-2 mt-2">{energie.map(en=><button type="button" key={en} onClick={()=>setForm({...form, dog_energia:en})} className={`px-3 py-2 rounded-full border text-sm ${form.dog_energia===en?'bg-black text-white':'bg-white'}`}>{en}</button>)}</div></div>
        <div className="border-t pt-4">
          <p className="font-bold">Foto cane:</p>
          <label className="text-sm font-bold text-red-600">Foto 1 (OBBLIGATORIA):</label><input type="file" required accept="image/*" onChange={e=>handleFile(0,e.target.files[0])} className="w-full mb-3" />
          <label className="text-sm font-bold text-red-600">Foto 2 (OBBLIGATORIA):</label><input type="file" required accept="image/*" onChange={e=>handleFile(1,e.target.files[0])} className="w-full mb-3" />
          <label className="text-sm">Foto 3 (opzionale):</label><input type="file" accept="image/*" onChange={e=>handleFile(2,e.target.files[0])} className="w-full mb-3" />
          <label className="text-sm">Foto 4 (opzionale):</label><input type="file" accept="image/*" onChange={e=>handleFile(3,e.target.files[0])} className="w-full" />
        </div>
        <div><label className="text-sm font-semibold">Foto proprietario (opzionale):</label><input type="file" accept="image/*" onChange={e=>setOwnerFile(e.target.files[0])} className="w-full mt-1" /></div>
        <button type="button" onClick={getPosition} className="w-full border p-3 rounded bg-yellow-100 font-bold">{coords.lat ? `GPS OK: ${coords.lat.toFixed(2)}` : 'CLICCA QUI - GPS OBBLIGATORIO'}</button>
        <button disabled={loading} className="bg-black text-white p-4 rounded-full font-bold">{loading?'Carico...':'Crea profilo'}</button>
      </form>
    </div>
  )
}
