import { useRouter } from 'expo-router';

export default function Intro() {
  const router = useRouter();

  const onSubmit = (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const n = String(fd.get('nome') || '').trim();
    const c = String(fd.get('cane') || '').trim();
    const em = String(fd.get('email') || '').trim();

    if (n.length < 2) { alert('Nome vuoto, letto: ['+n+']'); return; }
    if (c.length < 1) { alert('Cane vuoto, letto: ['+c+']'); return; }
    if (!em.includes('@')) { alert('Email senza @, letto: ['+em+']'); return; }

    try {
      const nuovo = { nome: n, nomeCane: c, email: em, eta: '2 anni', sesso: 'Maschio', sicurezza: 'bianco' };
      const vecchi = JSON.parse(localStorage.getItem('utenti') || '[]');
      const filtrati = vecchi.filter((u:any) => u.email.toLowerCase() !== em.toLowerCase());
      filtrati.push(nuovo);
      localStorage.setItem('utenti', JSON.stringify(filtrati));
      localStorage.setItem('mioCane', JSON.stringify(nuovo));
    } catch {}

    router.replace('/(tabs)');
  };

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FFF8F0', padding:24, display:'flex', justifyContent:'center'}}>
      <form onSubmit={onSubmit} style={{maxWidth:400, width:'100%', margin:'0 auto'}}>
        <h1 style={{fontSize:28, fontWeight:800, margin:0}}>Crea account</h1>
        <p style={{color:'#666', marginTop:4}}>LeashLove</p>

        <label style={{fontWeight:600, marginTop:16, display:'block'}}>Il tuo nome</label>
        <input name="nome" defaultValue="Francesco" placeholder="Francesco" required style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16, boxSizing:'border-box'}} />

        <label style={{fontWeight:600, marginTop:12, display:'block'}}>Nome del cane</label>
        <input name="cane" defaultValue="Hope" placeholder="Hope" required style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16, boxSizing:'border-box'}} />

        <label style={{fontWeight:600, marginTop:12, display:'block'}}>Email</label>
        <input name="email" defaultValue="sacchinellifrancesco@gmail.com" placeholder="email" required style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16, boxSizing:'border-box'}} />

        <button type="submit" style={{backgroundColor:'#FF8C42', color:'#fff', fontWeight:800, fontSize:16, padding:16, borderRadius:12, border:'none', width:'100%', marginTop:24, cursor:'pointer'}}>Iscriviti e entra</button>
      </form>
    </div>
  );
}
