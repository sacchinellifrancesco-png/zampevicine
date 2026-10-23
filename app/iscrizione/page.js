'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Iscrizione() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome_proprietario: '', nome_cane: '', email: '', eta_proprietario: '', eta_cane: '',
    dog_size: 'media', dog_temperamento: 'giocherellone', dog_socievolezza: 'socievole', dog_energia: 'media',
    descrizione: ''
  })
  const [fotos, setFotos] = useState([null,null,null,null])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const filledFotos = fotos.filter(Boolean)
    if (filledFotos.length < 2) { alert('Carica almeno 2 foto'); return }
    setLoading(true)
    try {
      const urls = []
      for (let f of filledFotos) {
        const name = `${Date.now()}-${f.name}`
        const { error } = await supabase.storage.from('leashlove').upload(name, f)
        if (error) throw error
        const { data } = supabase.storage.from('leashlove').getPublicUrl(name)
        urls.push(data.publicUrl)
      }
      const { error } = await supabase.from('profiles').insert([{
        ...form,
        eta_proprietario: parseInt(form.eta_proprietario),
        eta_cane: parseInt(form.eta_cane),
        foto_cane_url: urls[0],
        photos: urls
      }])
      if (error) throw error
      router.push('/mappa')
    } catch (err) { alert(err.message) }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <button onClick={()=>router.back()} className="mb-4">{'< Indietro'}</button>
      <h1 className="text-2xl font-bold mb-4">Iscrizione LeashLove</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input placeholder="Nome proprietario" required value={form.nome_proprietario} onChange={e=>setForm({...form, nome_proprietario:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Nome cane" required value={form.nome_cane} onChange={e=>setForm({...form, nome_cane:e.target.value})} className="border p-2 rounded"/>
        <input type="email" placeholder="test1@gmail.com" autoComplete="off" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="border p-2 rounded"/>
        <div className="flex gap-2">
          <input placeholder="Età proprietario" type="number" required value={form.eta_proprietario} onChange={e=>setForm({...form, eta_proprietario:e.target.value})} className="border p-2 rounded w-1/2"/>
          <input placeholder="Età cane" type="number" required value={form.eta_cane} onChange={e=>setForm({...form, eta_cane:e.target.value})} className="border p-2 rounded w-1/2"/>
        </div>
        <select value={form.dog_size} onChange={e=>setForm({...form, dog_size:e.target.value})} className="border p-2 rounded">
          <option value="piccola">Piccola</option><option value="media">Media</option><option value="grande">Grande</option>
        </select>
        <select value={form.dog_temperamento} onChange={e=>setForm({...form, dog_temperamento:e.target.value})} className="border p-2 rounded">
          <option value="calmo">Calmo</option><option value="giocherellone">Giocherellone</option>
        </select>
        <select value={form.dog_socievolezza} onChange={e=>setForm({...form, dog_socievolezza:e.target.value})} className="border p-2 rounded">
          <option value="socievole">Socievole</option><option value="timido">Timido</option><option value="selettivo">Selettivo</option>
        </select>
        <select value={form.dog_energia} onChange={e=>setForm({...form, dog_energia:e.target.value})} className="border p-2 rounded">
          <option value="bassa">Energia bassa</option><option value="media">Energia media</option><option value="alta">Energia alta</option>
        </select>
        <textarea placeholder="Descrizione" value={form.descrizione} onChange={e=>setForm({...form, descrizione:e.target.value})} className="border p-2 rounded"/>
        <p className="text-sm">Carica 4 foto (minimo 2 obbligatorie)</p>
        <div className="grid grid-cols-2 gap-2">
          {[0,1,2,3].map(i=> <input key={i} type="file" accept="image/*" onChange={e=>{ const n=[...fotos]; n[i]=e.target.files[0]; setFotos(n)}} className="border p-1"/>)}
        </div>
        <button disabled={loading} className="bg-black text-white p-3 rounded">{loading?'Carico...':'Iscriviti'}</button>
      </form>
    </div>
  )
}
