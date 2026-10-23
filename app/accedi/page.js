'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Accedi() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)

  useEffect(() => {
    setEmail('')
    setReadOnly(true)
  }, [])

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
      <h1 className="text-2xl font-bold mb-2">Accedi</h1>
      <p className="mb-4 text-sm">Inserisci la tua email</p>
      
      <form onSubmit={handleLogin} autoComplete="off" className="flex flex-col gap-3">
        {/* campi finti per fregare Edge */}
        <input type="text" style={{display:'none'}} tabIndex={-1} />
        <input type="password" style={{display:'none'}} tabIndex={-1} />

        <input 
          type="text"
          inputMode="email"
          placeholder=""
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          name="search_query"
          readOnly={readOnly}
          onFocus={()=>setReadOnly(false)}
          required 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          className="border p-3 rounded w-full bg-white"
        />
        <button disabled={loading} className="bg-black text-white p-3 rounded">
          {loading?'...':'Entra'}
        </button>
      </form>
    </div>
  )
}
