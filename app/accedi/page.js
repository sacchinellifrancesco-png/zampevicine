'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Accedi() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conferma, setConferma] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAccedi = async (e) => {
    e.preventDefault()
    if (password !== conferma) {
      alert('Le due password non sono uguali')
      return
    }
    setLoading(true)
    const { data } = await supabase.from('profiles').select('*').eq('email', email.trim().toLowerCase()).eq('password', password).single()
    if (data) {
      localStorage.setItem('leashlove_user', JSON.stringify(data))
      router.push('/mappa')
    } else {
      alert('Email o password errati')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <p className="text-[10px] text-gray-400 mb-2">v7 - RIFATTA DA ZERO - accedi pulita</p>
      <button onClick={()=>router.back()} className="mb-6">{"< Indietro"}</button>
      <h1 className="text-3xl font-bold mb-6">Accedi</h1>

      <form onSubmit={handleAccedi} className="flex flex-col gap-4">
        <input autoComplete="off" name="leash_v7_email" type="text" placeholder="Email" required value={email} onChange={e=>setEmail(e.target.value)} className="border-2 p-4 rounded-xl w-full bg-white text-black" />
        <input autoComplete="new-password" name="leash_v7_pwd" type="password" placeholder="Password" required value={password} onChange={e=>setPassword(e.target.value)} className="border-2 p-4 rounded-xl w-full bg-white text-black" />
        <input autoComplete="new-password" name="leash_v7_conf" type="password" placeholder="Conferma Password" required value={conferma} onChange={e=>setConferma(e.target.value)} className="border-2 p-4 rounded-xl w-full bg-white text-black" />
        <button type="submit" disabled={loading} className="bg-black text-white p-4 rounded-full font-bold mt-2">
          {loading ? '...' : 'Accedi'}
        </button>
      </form>
    </div>
  )
}
