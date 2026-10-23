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

  const handleFile = (index, file) => {
    const copy = [...dogFiles]
    copy[index] = file
    setDogFiles(copy)
  }

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      pos => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert('Attiva GPS per continuare')
    )
  }

  const uploadFile = async (file) => {
    const path = `${Date.now()}-${Math.random()}-${file.name}`
    const { error } = await supabase.storage.from('dog-photos').upload(path, file)
    if (error) throw error
    const { data } = supabase.storage.from('dog-photos').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const filledPhotos = dogFiles.filter(Boolean)
    if (filledPhotos.length < 2) {
      alert('Devi caricare minimo 2 foto del cane (Foto 1 e Foto 2 obbligatorie)')
      return
    }
    if (!coords.lat) {
      alert('Clicca su "Usa la mia posizione" per farti trovare sulla mappa')
      return
    }
    setLoading(true)
    try {
      const photoUrls = []
      for (let f of filledPhotos) {
        const url = await uploadFile(f)
        photoUrls.push(url)
      }
      let ownerUrl = null
      if (ownerFile) ownerUrl = await uploadFile(ownerFile)

      const { data, error } = await supabase.from('profiles').insert({
        ...form,
        photos: photoUrls,
        foto_proprietario_url: ownerUrl,
        lat: coords.lat,
        lng: coords.lng
      }).select().single()

      if (error) throw error
      localStorage.setItem('leashlove_user', JSON.stringify(data))
      router.push('/mappa')
    } catch (err) {
      alert('Errore: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <button onClick={()=>router.back()} className="mb-4 text-sm">{'< Indietro'}</button>
      <h1 className="text-2xl font-bold mb-6">Iscriviti a LeashLove</h1>

      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-5">
        <input type="text" style={{display:'none'}} />
        <input type="password" style={{display:'none'}} />

        <div>
          <label className="text-sm font-semibold">Email:</label>
          <input type="text" inputMode="email" required value={form.email}
            readOnly={readOnly} onFocus={()=>setReadOnly(false)}
            onChange={e=>setForm({...form, email: e.target.value})}
            placeholder="" autoComplete="off" className="border p-3 rounded w-full mt-1 bg-white" />
        </div>

        <div>
          <label className="text-sm font-semibold">Nome proprietario:</label>
          <input required value={form.owner_name} onChange={e=>setForm({...form, owner_name: e.target.value})} className="border p-3 rounded w-full mt-1" />
        </div>

        <div>
          <label className="text-sm font-semibold">Nome cane:</label>
          <input required value={form.dog_name} onChange={e=>setForm({...form, dog_name: e.target.value})} className="border p-3 rounded w-full mt-1" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Razza:</label>
            <input value={form.dog_breed} onChange={e=>setForm({...form, dog_breed: e.target.value})} className="border p-3 rounded w-full mt-1" />
          </div>
          <div>
            <label className="text-sm font-semibold">Età:</label>
            <select value={form.dog_age} onChange={e=>setForm({...form, dog_age: e.target.value})} className="border p-3 rounded w-full mt-1">
              <option value="">Seleziona</option>
              <option>Cucciolo 0-1</option>
              <option>Giovane 1-3</option>
              <option>Adulto 3-8</option>
              <option>Senior 8+</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Taglia:</label>
          <select value={form.dog_size} onChange={e=>setForm({...form, dog_size: e.target.value})} className="border p-3 rounded w-full mt-1">
            <option value="">Seleziona</option>
            <option>Piccola</option>
            <option>Media</option>
            <option>Grande</option>
            <option>Gigante</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">Temperamento:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {temperamenti.map(t=>(
              <button type="button" key={t} onClick={()=>setForm({...form, dog_temperamento: t})}
                className={`px-3 py-2 rounded-full border text-sm ${form.dog_temperamento===t?'bg-black text-white':'bg-white'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Socievolezza:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {socievolezze.map(s=>(
              <button type="button" key={s} onClick={()=>setForm({...form, dog_socievolezza: s})}
                className={`px-3 py-2 rounded-full border text-sm ${form.dog_socievolezza===s?'bg-black text-white':'bg-white'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Energia:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {energie.map(en=>(
              <button type="button" key={en} onClick={()=>setForm({...form, dog_energia: en})}
                className={`px-3 py-2 rounded-full border text-sm ${form.dog_energia===en?'bg-black text-white':'bg-white'}`}>{en}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Descrizione:</label>
          <textarea value={form.dog_description} onChange={e=>setForm({...form, dog_description: e.target.value})} className="border p-3 rounded w-full mt-1 h-24" placeholder="Racconta del tuo cane..." />
        </div>

        <div className="border-t pt-4">
          <p className="font-bold mb-2">Foto cane:</p>
          <label className="text-sm">Foto 1 (obbligatoria):</label>
          <input type="file" required accept="image/*" onChange={e=>handleFile(0, e.target.files[0])} className="w-full mt-1 mb-3" />
          <label className="text-sm">Foto 2 (obbligatoria):</label>
          <input type="file" required accept="image/*" onChange={e=>handleFile(1, e.target.files[0])} className="w-full mt-1 mb-3" />
          <label className="text-sm">Foto 3 (opzionale):</label>
          <input type="file" accept="image/*" onChange={e=>handleFile(2, e.target.files[0])} className="w-full mt-1 mb-3" />
          <label className="text-sm">Foto 4 (opzionale):</label>
          <input type="file" accept="image/*" onChange={e=>handleFile(3, e.target.files[0])} className="w-full mt-1" />
        </div>

        <div className="border-t pt-4">
          <label className="text-sm font-semibold">Foto proprietario (opzionale):</label>
          <input type="file" accept="image/*" onChange={e=>setOwnerFile(e.target.files[0])} className="w-full mt-1" />
        </div>

        <div className="border-t pt-4">
          <button type="button" onClick={getPosition} className="w-full border p-3 rounded bg-gray-100">
            {coords.lat ? `Posizione salvata: ${coords.lat.toFixed(3)}` : 'Usa la mia posizione GPS'}
          </button>
        </div>

        <button disabled={loading} className="bg-black text-white p-4 rounded-full font-bold mt-4">
          {loading ? 'Caricamento...' : 'Crea profilo'}
        </button>
      </form>
    </div>
  )
}
