'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Accedi() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conferma, setConferma] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (password !== conferma) {
      alert('Le password non coincidono')
      return
    }

    if (password.length < 3) {
      alert('Password troppo corta')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.toLowerCase().trim())
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
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#faf8f5]">
      <div className="w-full max-w-md bg-white p-8 rounded-[24px] shadow-sm border">
        <h1 className="text-3xl font-black mb-2 text-center">Accedi - v10 NUOVA</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Bentornato su LeashLove</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold ml-1">Email</label>
            <input
              type="email"
              placeholder="es. mario@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-black/10 p-4 rounded-xl w-full bg-white text-black outline-none focus:border-black mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-bold ml-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-black/10 p-4 rounded-xl w-full bg-white text-black outline-none focus:border-black mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-bold ml-1">Conferma Password</label>
            <input
              type="password"
              placeholder="Ripeti password"
              required
              value={conferma}
              onChange={(e) => setConferma(e.target.value)}
              className="border-2 border-black/10 p-4 rounded-xl w-full bg-white text-black outline-none focus:border-black mt-1"
            />
          </div>

          <button
            disabled={loading}
            className="bg-black text-white p-4 rounded-full font-bold mt-4 disabled:opacity-50"
          >
            {loading ? 'Caricamento...' : 'Entra'}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Non hai un account? <Link href="/iscrizione" className="font-bold underline">Iscriviti</Link>
        </p>
      </div>
    </div>
  )
}
