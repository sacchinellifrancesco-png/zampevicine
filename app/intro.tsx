import { useRouter } from 'expo-router';

export default function Intro() {
  const router = useRouter();

  const onSubmit = (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const n = String(fd.get('nome') || '').trim();
    const c = String(fd.get('cane') || '').trim();
    const em = String(fd.get('email') || '').trim().toLowerCase();

    if (n.length < 2 || c.length < 1 || !em.includes('@')) return;

    try {
      const vecchi = JSON.parse(localStorage.getItem('utenti') || '[]');
      const idx = vecchi.findIndex((u:any) => u.email.toLowerCase() === em);
      
      const nuovo = { nome: n, nomeCane: c, email: em, eta: '2 anni', sesso: 'Maschio', sicurezza: 'bianco' };

      if (idx >= 0) {
        vecchi[idx] = { ...vecchi[idx], ...nuovo }; // AGGIORNA
      } else {
        vecchi.push(nuovo); // CREA
      }
      localStorage.setItem('utenti', JSON.stringify(vecchi));
      localStorage.setItem('mioCane', JSON.stringify(vecchi[idx >=0 ? idx : vecchi.length-1]));
    } catch {}

    router.replace('/(tabs)');
  };

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FFF8F0', padding:24, display:'flex', justifyContent:'center'}}>
      <form onSubmit={onSubmit} style={{maxWidth:400, width:'100%', margin:'0 auto'}}>
        <h1 style={{fontSize:28, fontWeight:800}}>Crea / Aggiorna</h1>
        <p style={{color:'#666'}}>Stessa email = aggiorna nome e cane</p>
        <input name="nome" defaultValue="Francesco" required placeholder="Il tuo nome" style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:16, width:'100%', fontSize:16, boxSizing:'border-box'}} />
        <input name="cane" defaultValue="Hope" required placeholder="Nome cane" style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:12, width:'100%', fontSize:16, boxSizing:'border-box'}} />
        <input name="email" defaultValue="sacchinellifrancesco@gmail.com" required placeholder="Email" style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:12, width:'100%', fontSize:16, boxSizing:'border-box'}} />
        <button type="submit" style={{backgroundColor:'#FF8C42', color:'#fff', fontWeight:800, fontSize:16, padding:16, borderRadius:12, border:'none', width:'100%', marginTop:24, cursor:'pointer'}}>Salva e entra</button>
      </form>
    </div>
  );
}
