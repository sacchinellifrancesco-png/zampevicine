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
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center p-6">
      <div className="bg-white border rounded-[32px] p-8 w-full max-w-md shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
        <h1 className="text-3xl font-black">Iscriviti</h1>
        <p className="text-gray-500 mt-2 text-sm">Gratis, ci metti 30 secondi.</p>
        
        <form onSubmit={handleSignup} className="mt-8 flex flex-col gap-4">
          <input 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            placeholder="Email" 
            type="email" 
            required 
            className="px-5 py-3 rounded-full border outline-none" 
          />
          <input 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            placeholder="Password (min 6)" 
            type="password" 
            required 
            className="px-5 py-3 rounded-full border outline-none" 
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            disabled={loading} 
            className="px-8 py-4 rounded-full bg-black text-white font-semibold"
          >
            {loading ? 'Creo...' : 'Crea account →'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Hai già un account? <Link href="/login" className="text-black font-semibold underline">Entra</Link>
        </p>
      </div>
    </div>
  )
}
