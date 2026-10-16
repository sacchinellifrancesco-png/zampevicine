'use client'
import { useState } from 'react'

const cani = [
  { id: '1', ownerId: 'u2', ownerNome: 'Sofia', ownerFoto: 'https://i.pravatar.cc/150?img=5', ownerCitta: 'Milano', distanza: '0.8', bio: 'Usciamo sempre ai Giardini Montanelli', dogNome: 'Luna', dogFoto: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg', razza: 'Golden', eta: '2 anni', sesso: 'Femmina' },
  { id: '2', ownerId: 'u3', ownerNome: 'Marco', ownerFoto: 'https://i.pravatar.cc/150?img=8', ownerCitta: 'Milano', distanza: '1.2', bio: 'Cerco amici per passeggiate serali', dogNome: 'Rocky', dogFoto: 'https://images.dog.ceo/breeds/husky/n02110185_100.jpg', razza: 'Husky', eta: '3 anni', sesso: 'Maschio' },
]

export default function Page() {
  const [show, setShow] = useState(false)
  const [sel, setSel] = useState<any>(null)

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'system-ui', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>LeashLove</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>Cani vicini a te • clicca per provare</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cani.map(c => (
            <div key={c.id} onClick={() => { setSel(c); setShow(true) }} style={{ background: 'white', borderRadius: '18px', padding: '12px', display: 'flex', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
              <img src={c.dogFoto} style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: '700' }}>{c.dogNome} + {c.ownerNome}</div>
                <div style={{ fontSize: '13px', color: '#777' }}>{c.razza} • {c.eta} • {c.distanza} km</div>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{c.ownerCitta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {show && sel && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 50 }}>
          <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '360px', overflow: 'hidden' }}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Nuova richiesta!</h2>
              <p style={{ fontSize: '13px', color: '#888', margin: '4px 0 0 0' }}>Vuoi accettare questa passeggiata?</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 16px' }}>
              <div style={{ background: '#f5f5f5', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
                <img src={sel.ownerFoto} style={{ width: '70px', height: '70px', borderRadius: '50%', margin: '0 auto', objectFit: 'cover' }} />
                <div style={{ fontWeight: '700', marginTop: '8px', fontSize: '14px' }}>{sel.ownerNome}</div>
                <div style={{ fontSize: '11px', color: '#777' }}>{sel.ownerCitta} • {sel.distanza} km</div>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '8px' }}>{sel.bio}</div>
              </div>
              <div style={{ background: '#fff4e6', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
                <img src={sel.dogFoto} style={{ width: '70px', height: '70px', borderRadius: '50%', margin: '0 auto', objectFit: 'cover' }} />
                <div style={{ fontWeight: '700', marginTop: '8px', fontSize: '14px' }}>{sel.dogNome}</div>
                <div style={{ fontSize: '11px', color: '#777' }}>{sel.razza} • {sel.eta}</div>
                <div style={{ fontSize: '11px', color: '#777' }}>{sel.sesso}</div>
              </div>
            </div>

            <div style={{ padding: '16px', display: 'flex', gap: '10px' }}>
              <button onClick={() => setShow(false)} style={{ flex: 1, height: '48px', borderRadius: '24px', border: 'none', background: '#eee', fontWeight: '700', cursor: 'pointer' }}>Rifiuta</button>
              <button onClick={() => { setShow(false); alert('Accettato! 🐾 Ora siete in chat') }} style={{ flex: 1, height: '48px', borderRadius: '24px', border: 'none', background: 'black', color: 'white', fontWeight: '700', cursor: 'pointer' }}>Accetta 🐾</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
