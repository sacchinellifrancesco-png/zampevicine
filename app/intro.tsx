import { useRouter } from 'expo-router';

export default function Intro() {
  const router = useRouter();

  const onSubmit = (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const n = String(fd.get('nome') || '').trim();
    const c = String(fd.get('cane') || '').trim();
    const em = String(fd.get('email') || '').trim().toLowerCase();

    if (n.length < 2) { alert('Metti nome'); return; }
    if (c.length < 1) { alert('Metti nome cane'); return; }
    if (!em.includes('@')) { alert('Email senza @'); return; }

    try {
      const vecchi = JSON.parse(localStorage.getItem('utenti') || '[]');
      let esiste = vecchi.find((u:any) => u.email.toLowerCase() === em);
      
      if (esiste) {
        // QUI AGGIORNA INVECE DI BLOCCARE
        esiste.nome = n;
        esiste.nomeCane = c;
        esiste.email = em;
        localStorage.setItem('utenti', JSON.stringify(vecchi));
        localStorage.setItem('mioCane', JSON.stringify(esiste));
        alert('Profilo aggiornato! Ora sei ' + n + ' con ' + c);
      } else {
        const nuovo = { nome: n, nomeCane: c, email: em, eta: '2 anni', sesso: 'Maschio', sicurezza: 'bianco' };
        vecchi.push(nuovo);
        localStorage.setItem('utenti', JSON.stringify(vecchi));
        localStorage.setItem('mioCane', JSON.stringify(nuovo));
      }
    } catch {}

    router.replace('/(tabs)');
  };

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FFF8F0', padding:24, display:'flex', justifyContent:'center'}}>
      <form onSubmit={onSubmit} style={{maxWidth:400, width:'100%', margin:'0 auto'}}>
        <h1 style={{fontSize:28, fontWeight:800, margin:0}}>Crea / Aggiorna</h1>
        <p style={{color:'#666', marginTop:4}}>Se usi la stessa email, aggiorna nome e cane</p>
        <label style={{fontWeight:600, marginTop:16, display:'block'}}>Il tuo nome</label>
        <input name="nome" defaultValue="Francesco" required style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16}} />
        <label style={{fontWeight:600, marginTop:12, display:'block'}}>Nome del cane</label>
        <input name="cane" defaultValue="Hope" required style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16}} />
        <label style={{fontWeight:600, marginTop:12, display:'block'}}>Email (stessa per aggiornare)</label>
        <input name="email" defaultValue="sacchinellifrancesco@gmail.com" required style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16}} />
        <button type="submit" style={{backgroundColor:'#FF8C42', color:'#fff', fontWeight:800, fontSize:16, padding:16, borderRadius:12, border:'none', width:'100%', marginTop:24}}>Salva e entra</button>
      </form>
    </div>
  );
}
