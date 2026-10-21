'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Accedi</h1>
      <input 
        className="border p-3 w-full mb-3 rounded" 
        placeholder="Email" 
        onChange={e=>setEmail(e.target.value)} 
      />
      <input 
        className="border p-3 w-full mb-6 rounded" 
        type="password" 
        placeholder="Password" 
        onChange={e=>setPassword(e.target.value)} 
      />
      <button className="bg-black text-white p-3 w-full rounded" onClick={handleLogin}>
        Accedi
      </button>
      <p className="mt-4 text-center">
        Non hai account? <Link href="/iscriviti" className="underline">Iscriviti</Link>
      </p>
    </div>
  )
}
