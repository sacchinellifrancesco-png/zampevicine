'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Accedi() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [showPwd, setShowPwd] = useState(false)

  useEffect(()=>{ setReadOnly(true) },[])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.trim())
        .eq('password', password)
        .single()

      if (error || !data) {
        alert('Email o password errati')
        setLoading(false)
        return
      }

      localStorage.setItem('leashlove_user', JSON.stringify(data))
      router.push('/mappa')
    } catch (err) {
      alert('Errore: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <button onClick={()=>router.back()} className="mb-6 text-sm">{'< Indietro'}</button>
      <h1 className="text-2xl font-bold mb-1">Accedi</h1>
      <p className="text-sm text-gray-500 mb-6">Bentornato su LeashLove</p>

      <form onSubmit={handleLogin} autoComplete="off" className="flex flex-col gap-4">
        {/* trucco anti-autofill Edge */}
        <input type="text" style={{display:'none'}} />
        <input type="password" style={{display:'none'}} />

        <div>
          <label className="text-sm font-semibold">Email:</label>
          <input
            type="text"
            required
            value={email}
            readOnly={readOnly}
            onFocus={()=>setReadOnly(false)}
            onChange={e=>setEmail(e.target.value)}
            className="border p-3 rounded-xl w-full mt-1 bg-white"
            placeholder="tua@email.it"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Password:</label>
          <div className="relative mt-1">
            <input
              type={showPwd ? "text" : "password"}
              required
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="border p-3 rounded-xl w-full bg-white pr-12"
              placeholder="La tua password"
            />
            <button
              type="button"
              onClick={()=>setShowPwd(!showPwd)}
              className="absolute right-3 top-3 text-sm text-gray-500"
            >
              {showPwd ? 'Nascondi' : 'Mostra'}
            </button>
          </div>
        </div>

        <button disabled={loading} className="bg-black text-white p-4 rounded-full font-bold mt-4">
          {loading ? 'Controllo...' : 'Entra'}
        </button>

        <p className="text-xs text-center text-gray-500 mt-2">
          Non hai un account? <span onClick={()=>router.push('/iscrizione')} className="underline font-bold cursor-pointer">Iscriviti</span>
        </p>
      </form>
    </div>
  )
}
