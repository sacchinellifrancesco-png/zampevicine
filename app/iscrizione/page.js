'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Iscrizione() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [coords, setCoords] = useState({ lat: null, lng: null })
  
  const [form, setForm] = useState({
    email: '', owner_name: '', dog_name: '', dog_breed: '', dog_age: '', dog_size: '',
    dog_temperamento: '', dog_socievolezza: '', dog_energia: '', dog_description: '',
    password: '', confirmPassword: ''
  })
  const [dogFiles, setDogFiles] = useState([null, null, null, null])
  const [ownerFile, setOwnerFile] = useState(null)

  const etaOptions = []
  for(let i=3; i<=11; i++) etaOptions.push(`${i} mesi`)
  etaOptions.push('1 anno')
  for(let i=2; i<=20; i++) etaOptions.push(`${i} anni`)

  const temperamenti = ['Dolce', 'Vivace', 'Giocoso']
  const socievolezze = ['Molto socievole', 'Socievole', 'Selettivo', 'Poco socievole']
  const energie = ['Bassa', 'Media', 'Alta', 'Molto alta']

  useEffect(()=>{
    setReadOnly(true)
    // GPS automatico nascosto, senza bottone
    navigator.geolocation.getCurrentPosition(
      p => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => console.log('GPS non ancora attivo')
    )
  }, [])

  const handleFile = (i, file) => {
    const c = [...dogFiles]; c[i]=file; setDogFiles(c)
  }

  const validatePassword = (pwd) => {
    if(pwd.length < 8) return 'La password deve avere almeno 8 caratteri'
    if(!/[A-Z]/.test(pwd)) return 'Deve contenere almeno una lettera maiuscola'
    if(!/[0-9]/.test(pwd)) return 'Deve contenere almeno un numero'
    if(!/[^A-Za-z0-9]/.test(pwd)) return 'Deve contenere almeno un carattere speciale (!@#$%)'
    return null
  }

  const uploadFile = async (file) => {
    const path = `${Date.now()}-${Math.random()}-${file.name}`
    const { error } = await supabase.storage.from('dog-photos').upload(path, file)
    if(error) throw error
    return supabase.storage.from('dog-photos').getPublicUrl(path).data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validazione password
    const pwdError = validatePassword(form.password)
    if(pwdError){ alert(pwdError); return }
    if(form.password !== form.confirmPassword){ alert('Le password non coincidono'); return }

    if(dogFiles.filter(Boolean).length < 2){ alert('Carica minimo 2 foto: Foto 1 e Foto 2 obbligatorie'); return }

    // Se GPS non preso, prova a prenderlo al momento
    let finalCoords = coords
    if(!finalCoords.lat){
      try{
        const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej))
        finalCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setCoords(finalCoords)
      }catch{
        alert('Attiva la posizione GPS del browser per iscriverti'); return
      }
    }

    setLoading(true)
    try{
      const urls = []
      for(let f of dogFiles.filter(Boolean)){ urls.push(await uploadFile(f)) }
      let ownerUrl = ownerFile ? await uploadFile(ownerFile) : null

      const { data, error } = await supabase.from('profiles').insert({
        email: form.email,
        owner_name: form.owner_name,
        dog_name: form.dog_name,
        dog_breed: form.dog_breed,
        dog_age: form.dog_age,
        dog_size: form.dog_size,
        dog_temperamento: form.dog_temperamento,
        dog_socievolezza: form.dog_socievolezza,
        dog_energia: form.dog_energia,
        dog_description: form.dog_description,
        password: form.password,
        photos: urls,
        foto_proprietario_url: ownerUrl,
        lat: finalCoords.lat,
        lng: finalCoords.lng
      }).select().single()

      if(error) throw error
      localStorage.setItem('leashlove_user', JSON.stringify(data))
      router.push('/mappa')
    }catch(err){ alert(err.message) }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <button onClick={()=>router.back()} className="mb-4 text-sm">{'< Indietro'}</button>
      <h1 className="text-2xl font-bold mb-6">Iscriviti</h1>

      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-4">
        <input type="text" style={{display:'none'}} />
        <input type="password" style={{display:'none'}} />

        <div><label className="text-sm font-semibold">Email:</label><input type="text" required value={form.email} readOnly={readOnly} onFocus={()=>setReadOnly(false)} onChange={e=>setForm({...form, email:e.target.value})} className="border p-3 rounded w-full bg-white mt-1" /></div>
        <div><label className="text-sm font-semibold">Nome proprietario:</label><input required value={form.owner_name} onChange={e=>setForm({...form, owner_name:e.target.value})} className="border p-3 rounded w-full mt-1" /></div>
        <div><label className="text-sm font-semibold">Nome cane:</label><input required value={form.dog_name} onChange={e=>setForm({...form, dog_name:e.target.value})} className="border p-3 rounded w-full mt-1" /></div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Taglia:</label>
            <select value={form.dog_size} onChange={e=>setForm({...form, dog_size:e.target.value})} className="border p-3 rounded w-full mt-1">
              <option value="">Seleziona</option><option>Piccola</option><option>Media</option><option>Grande</option><option>Gigante</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold">Età:</label>
            <select required value={form.dog_age} onChange={e=>setForm({...form, dog_age:e.target.value})} className="border p-3 rounded w-full mt-1">
              <option value="">Seleziona</option>
              {etaOptions.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div><label className="text-sm font-semibold">Temperamento:</label><div className="flex flex-wrap gap-2 mt-2">{temperamenti.map(t=><button type="button" key={t} onClick={()=>setForm({...form, dog_temperamento:t})} className={`px-3 py-2 rounded-full border text-sm ${form.dog_temperamento===t?'bg-black text-white':'bg-white'}`}>{t}</button>)}</div></div>
        <div><label className="text-sm font-semibold">Socievolezza:</label><div className="flex flex-wrap gap-2 mt-2">{socievolezze.map(s=><button type="button" key={s} onClick={()=>setForm({...form, dog_socievolezza:s})} className={`px-3 py-2 rounded-full border text-sm ${form.dog_socievolezza===s?'bg-black text-white':'bg-white'}`}>{s}</button>)}</div></div>
        <div><label className="text-sm font-semibold">Energia:</label><div className="flex flex-wrap gap-2 mt-2">{energie.map(en=><button type="button" key={en} onClick={()=>setForm({...form, dog_energia:en})} className={`px-3 py-2 rounded-full border text-sm ${form.dog_energia===en?'bg-black text-white':'bg-white'}`}>{en}</button>)}</div></div>

        <div className="border-t pt-4 flex flex-col gap-3">
          <p className="font-bold">Foto cane:</p>
          <div><label className="text-sm font-bold">Foto 1 (OBBLIGATORIA):</label><input type="file" required accept="image/*" onChange={e=>handleFile(0,e.target.files[0])} className="w-full" /></div>
          <div><label className="text-sm font-bold">Foto 2 (OBBLIGATORIA):</label><input type="file" required accept="image/*" onChange={e=>handleFile(1,e.target.files[0])} className="w-full" /></div>
          <div><label className="text-sm">Foto 3 (opzionale):</label><input type="file" accept="image/*" onChange={e=>handleFile(2,e.target.files[0])} className="w-full" /></div>
          <div><label className="text-sm">Foto 4 (opzionale):</label><input type="file" accept="image/*" onChange={e=>handleFile(3,e.target.files[0])} className="w-full" /></div>
          <div className="mt-2"><label className="text-sm font-semibold">Foto proprietario (opzionale):</label><input type="file" accept="image/*" onChange={e=>setOwnerFile(e.target.files[0])} className="w-full mt-1" /></div>
        </div>

        <div className="border-t pt-4 flex flex-col gap-3">
          <div><label className="text-sm font-semibold">Password:</label><input type="password" required value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Min 8 car, 1 Maiusc, 1 numero, 1 simbolo" className="border p-3 rounded w-full mt-1" /></div>
          <div><label className="text-sm font-semibold">Conferma Password:</label><input type="password" required value={form.confirmPassword} onChange={e=>setForm({...form, confirmPassword:e.target.value})} className="border p-3 rounded w-full mt-1" /></div>
          <p className="text-xs text-gray-500">La password deve avere: 8 caratteri, almeno 1 maiuscola, 1 numero e 1 carattere speciale.</p>
        </div>

        <button disabled={loading} className="bg-black text-white p-4 rounded-full font-bold mt-4">{loading?'Carico...':'Crea profilo'}</button>
        {coords.lat && <p className="text-xs text-green-600 text-center">GPS rilevato ✓</p>}
      </form>
    </div>
  )
}
