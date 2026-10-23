'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Accedi() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data } = await supabase.from('profiles').select('*').eq('email', email.trim()).eq('password', password).single()
    if(data){
      localStorage.setItem('leashlove_user', JSON.stringify(data))
      router.push('/mappa')
    } else {
      alert('Email o password errati')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <p className="text-[10px] text-gray-300 mb-2">v4 - con password</p>
      <button onClick={()=>router.back()} className="mb-6 text-sm">{'< Indietro'}</button>
      <h1 className="text-2xl font-bold mb-6">Accedi</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          name="leashlove_email_no_autofill"
          autoComplete="off"
          type="text"
          inputMode="email"
          placeholder="Email vuota - scrivila tu"
          required
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="border p-3 rounded-xl w-full bg-white"
        />
        <input
          name="leashlove_pwd_no_autofill"
          autoComplete="new-password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e=>setPassword(e.target.value)}
          className="border p-3 rounded-xl w-full bg-white"
        />
        <button disabled={loading} className="bg-black text-white p-4 rounded-full font-bold">
          {loading?'Controllo...':'Entra'}
        </button>
      </form>
    </div>
  )
}
