'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('zampe_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>LeashLove - 250m</h1>
      
      <div style={{ background: '#fff3f0', border: '1px solid #ffccbc', padding: '12px', borderRadius: '12px', margin: '12px 0' }}>
        <b>TU: {user?.nome || 'Francesco'} con {user?.cane || 'Hope'}</b><br/>
        <span style={{ fontSize: '12px' }}>{user?.email || ''}</span>
      </div>

      <div style={{ height: '60vh', width: '100%', borderRadius: '16px', background: '#e0f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '2px dashed #80cbc4' }}>
        <div style={{ fontSize: '48px' }}>✅</div>
        <div style={{ fontWeight: 'bold', marginTop: '8px' }}>Build di recupero OK</div>
        <div style={{ fontSize: '12px', color: '#666' }}>Se vedi questo, Vercel torna Ready</div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '8px' }}>Luna con Marco - 50m</div>
        <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '8px' }}>Rocky con Sara - 120m</div>
      </div>
    </div>
  );
}
