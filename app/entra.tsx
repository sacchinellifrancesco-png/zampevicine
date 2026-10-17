import { useRouter } from 'expo-router';

export default function Entra() {
  const router = useRouter();
  const onSubmit = (e:any) => {
    e.preventDefault();
    const em = String(new FormData(e.target).get('email') || '').trim().toLowerCase();
    if (!em.includes('@')) return;
    try {
      const utenti = JSON.parse(localStorage.getItem('utenti') || '[]');
      const trovato = utenti.find((u:any) => u.email.toLowerCase() === em);
      if (!trovato) { alert('Non trovato, iscriviti prima'); router.push('/intro'); return; }
      localStorage.setItem('mioCane', JSON.stringify(trovato));
    } catch {}
    router.replace('/(tabs)');
  };
  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FFF8F0', padding:24, display:'flex', justifyContent:'center', paddingTop:60}}>
      <form onSubmit={onSubmit} style={{maxWidth:400, width:'100%', margin:'0 auto'}}>
        <h1 style={{fontSize:28, fontWeight:800}}>Entra</h1>
        <input name="email" defaultValue="sacchinellifrancesco@gmail.com" required style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:20, width:'100%', fontSize:16}} />
        <button type="submit" style={{backgroundColor:'#000', color:'#fff', fontWeight:800, padding:16, borderRadius:12, border:'none', width:'100%', marginTop:20, cursor:'pointer'}}>Entra</button>
      </form>
    </div>
  );
}
