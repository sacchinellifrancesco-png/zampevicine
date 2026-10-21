'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function IscrivitiPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tuoNome, setTuoNome] = useState('')
  const [nomeCane, setNomeCane] = useState('')
  const [razza, setRazza] = useState('')
  const [zona, setZona] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <Link href="/" className="text-sm">← Home</Link>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold">Iscriviti</h1>
        <form onSubmit={handle} className="mt-6 flex flex-col gap-3">
          <input value={tuoNome} onChange={e=>setTuoNome(e.target.value)} placeholder="Tuo nome" className="border p-3 rounded-lg" />
          <input value={nomeCane} onChange={e=>setNomeCane(e.target.value)} placeholder="Nome cane" className="border p-3 rounded-lg" />
          <input value={razza} onChange={e=>setRazza(e.target.value)} placeholder="Razza" className="border p-3 rounded-lg" />
          <input value={zona} onChange={e=>setZona(e.target.value)} placeholder="Quartiere" className="border p-3 rounded-lg" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required className="border p-3 rounded-lg" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required className="border p-3 rounded-lg" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button disabled={loading} className="bg-black text-white p-3 rounded-full">{loading?'...':'Iscriviti →'}</button>
        </form>
      </div>
    </div>
  )
}
