'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Entra() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleEntra = () => {
    if (!email) { alert('Inserisci email'); return; }
    const user = { email, nome: 'Francesco', cane: 'Hope' };
    localStorage.setItem('zampe_user', JSON.stringify(user));
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#f9f9f9' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Entra in ZampeVicine</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }} />
          <button onClick={handleEntra} style={{ padding: '14px', background: '#2c3e50', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Entra</button>
        </div>
      </div>
    </div>
  );
}
