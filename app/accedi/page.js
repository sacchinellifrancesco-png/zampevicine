'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Accedi() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data } = await supabase.from('profiles').select('*').eq('email', email).single()
    if (data) { 
      localStorage.setItem('leashlove_user', JSON.stringify(data))
      router.push('/mappa') 
    } else { 
      alert('Email non trovata') 
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <button onClick={()=>router.back()} className="mb-4">{'< Indietro'}</button>
      <h1 className="text-2xl font-bold mb-4">Accedi</h1>
      <form onSubmit={handleLogin} autoComplete="off" className="flex flex-col gap-3">
        <input 
          type="email" 
          placeholder="test1@gmail.com"
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-lpignore="true"
          data-form-type="other"
          name="leashlove_login_field_xyz"
          required 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          className="border p-3 rounded w-full"
        />
        <button disabled={loading} className="bg-black text-white p-3 rounded">
          {loading?'...':'Entra'}
        </button>
      </form>
    </div>
  )
}
