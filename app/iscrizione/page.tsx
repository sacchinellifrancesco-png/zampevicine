'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Iscriviti() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert(error.message)
    } else {
      alert('Account creato! Controlla la email e poi fai login.')
      router.push('/login')
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crea account</h1>
      <input 
        className="border p-3 w-full mb-3 rounded" 
        placeholder="Email" 
        onChange={e=>setEmail(e.target.value)} 
      />
      <input 
        className="border p-3 w-full mb-6 rounded" 
        type="password" 
        placeholder="Password (min 6 caratteri)" 
        onChange={e=>setPassword(e.target.value)} 
      />
      <button className="bg-black text-white p-3 w-full rounded" onClick={handleSignup}>
        Iscriviti
      </button>
      <p className="mt-4 text-center">
        Hai già account? <Link href="/login" className="underline">Accedi</Link>
      </p>
    </div>
  )
}
