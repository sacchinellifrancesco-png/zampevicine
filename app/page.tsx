'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function IscrivitiRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/iscrizione')
  }, [router])
  return <p style={{textAlign:'center', marginTop:'50px'}}>Reindirizzamento in corso...</p>
}
