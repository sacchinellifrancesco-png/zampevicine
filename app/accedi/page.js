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
    // Forza campo vuoto e in sola lettura all'avvio così il browser non lo riempie
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
      <h1 className="text-2xl font-bold mb-4">Accedi</h1>
      
      <form onSubmit={handleLogin} autoComplete="off" className="flex flex-col gap-3">
        {/* Campi finti per fregare Edge/Chrome */}
        <input type="text" name="fake-email" autoComplete="off" style={{display:'none'}} tabIndex={-1} />
        <input type="password" name="fake-password" autoComplete="off" style={{display:'none'}} tabIndex={-1} />

        <input 
          type="text"
          inputMode="email"
          placeholder="test1@gmail.com"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-lpignore="true"
          data-form-type="other"
          name="leashlove_search_query_not_email"
          readOnly={readOnly}
          onFocus={()=>setReadOnly(false)}
          onBlur={()=>{ if(!email) setReadOnly(true) }}
          required 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          className="border p-3 rounded w-full"
        />
        <button disabled={loading} className="bg-black text-white p-3 rounded">
          {loading?'...':'Entra'}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-4">
        Se vedi ancora la tua mail, è Edge che l'ha salvata. Vai su Edge -&gt; Impostazioni -&gt; Informazioni personali -&gt; disattiva "Salva e compila informazioni di base"
      </p>
    </div>
  )
}
