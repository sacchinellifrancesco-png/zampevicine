'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const router=useRouter()
  const handle=async(e:React.FormEvent)=>{
    e.preventDefault(); setLoading(true); setError('')
    const {error}=await supabase.auth.signInWithPassword({email,password})
    if(error){ setError('Email o password errate'); setLoading(false)} else router.push('/vicino')
  }
  return(
    <div className="min-h-screen bg-white p-6">
      <Link href="/" className="text-sm">← Home</Link>
      <div className="max-w-md mx-auto mt-12">
        <h1 className="text-2xl font-bold">Entra</h1>
        <p className="text-sm text-gray-500">Ti porto subito dai cani vicino a te</p>
        <form onSubmit={handle} className="mt-6 flex flex-col gap-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required className="border p-3 rounded-lg bg-blue-50" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required className="border p-3 rounded-lg" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="bg-black text-white p-3 rounded-full">{loading?'Entro...':'Entra e vedi chi c’è vicino'}</button>
        </form>
        <p className="text-sm mt-4">Non sei iscritto? <Link href="/iscrizione" className="underline font-semibold">Iscriviti qui</Link></p>
      </div>
    </div>
  )
}
