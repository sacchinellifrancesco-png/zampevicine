'use client';
import Link from 'next/link';
export default function Home(){
 return <main style={{minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16}}>
  <h1>Zampe Vicine 🐾</h1>
  <Link href="/entra" style={{background:'black', color:'white', padding:'14px 40px', borderRadius:12, textDecoration:'none'}}>Entra</Link>
  <Link href="/iscriviti" style={{border:'2px solid black', padding:'14px 40px', borderRadius:12, textDecoration:'none', color:'black'}}>Iscriviti</Link>
 </main>;
}
