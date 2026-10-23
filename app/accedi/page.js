
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Accedi() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAccedi = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('Le due password non coincidono')
      return
    }
    if (password.length < 6) {
      alert('Password minimo 6 caratteri')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .eq('password', password)
        .single()

      if (data) {
        localStorage.setItem('leashlove_user', JSON.stringify(data))
        router.push('/mappa')
      } else {
        alert('Email o password errati. Se non hai un account vai su Iscriviti')
      }
    } catch (err) {
      alert('Errore: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <p className="text-[10px] text-gray-400 mb-2">v5 - ACCEDI RIFATTA DA ZERO - 23 ott</p>
      <button onClick={()=>router.back()} className="mb-6 text-sm">{"< Indietro"}</button>
      
      <h1 className="text-3xl font-bold mb-2">Accedi</h1>
      <p className="text-sm text-gray-500 mb-8">Rifatta da zero come hai chiesto</p>

      <form onSubmit={handleAccedi} className="flex flex-col gap-5">
        <div>
          <label className="text-sm font-bold">Indirizzo Email:</label>
          <input
            name="leashlove_new_email_v5"
            autoComplete="off"
            type="text"
            required
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="es. mario@gmail.com"
            className="border-2 p-4 rounded-xl w-full mt-2 bg-white text-black"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Inserisci Password:</label>
          <input
            name="leashlove_new_pwd_v5"
            autoComplete="new-password"
            type="password"
            required
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="La tua password"
            className="border-2 p-4 rounded-xl w-full mt-2 bg-white text-black"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Conferma Password:</label>
          <input
            name="leashlove_confirm_pwd_v5"
            autoComplete="new-password"
            type="password"
            required
            value={confirmPassword}
            onChange={e=>setConfirmPassword(e.target.value)}
            placeholder="Riscrivi la password"
            className="border-2 p-4 rounded-xl w-full mt-2 bg-white text-black"
          />
        </div>

        <button disabled={loading} type="submit" className="bg-black text-white p-4 rounded-full font-bold text-lg mt-4">
          {loading ? 'Controllo...' : 'Accedi'}
        </button>

        <p className="text-center text-sm mt-2">
          Non hai account? <span onClick={()=>router.push('/iscrizione')} className="underline font-bold cursor-pointer">Iscriviti</span>
        </p>
      </form>
    </div>
  )
}
