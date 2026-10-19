"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function CookieBanner(){
  const [show, setShow] = useState(false)
  useEffect(()=>{ if(typeof window !== "undefined" && !localStorage.getItem("leash-cookie")) setShow(true) },[])
  function accetta(){ localStorage.setItem("leash-cookie","ok"); setShow(false) }
  if(!show) return null
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 text-sm flex flex-col md:flex-row justify-between items-center gap-3 z-50">
      <p className="text-center md:text-left">Usiamo solo cookie tecnici per i punti. <Link href="/privacy" className="underline">Privacy</Link> e <Link href="/cookie" className="underline">Cookie</Link></p>
      <button onClick={accetta} className="bg-white text-black px-6 py-2 rounded-full font-bold">Accetta</button>
    </div>
  )
}
