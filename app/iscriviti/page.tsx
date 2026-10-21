'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function IscrivitiPage() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // qui dopo colleghiamo Supabase / backend
    console.log({ nome, email, password })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto w-full">
        <Link href="/" className="font-bold text-xl">Zampevicine</Link>
        <Link href="/accedi" className="text-sm">Hai già un account? Accedi</Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md border rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-center">Crea il tuo account</h1>
          <p className="text-center text-gray-500 mt-2 mb-6">Unisciti alla community di Zampevicine</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Fido"
                className="mt-1 w-full border rounded-lg px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="mt-1 w-full border rounded-lg px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <button type="submit" className="w-full bg-black text-white rounded-full py-3 font-semibold mt-2">
              Iscriviti gratis
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
