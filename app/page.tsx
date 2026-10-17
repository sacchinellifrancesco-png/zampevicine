'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('zampe_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>LeashLove - 250m</h1>
      <div style={{ background: '#fff3f0', border: '1px solid #ffccbc', padding: '12px', borderRadius: '12px', marginBottom: '16px', marginTop: '10px' }}>
        <b>TU: {user?.nome || 'Francesco'} con {user?.cane || 'Hope'}</b><br/>
        <span style={{ fontSize: '12px' }}>{user?.email || 'sacchifrancesco@gmail.com'}</span>
      </div>
      <MapView />
      <h3 style={{ marginTop: '20px' }}>Altri cani</h3>
      <div style={{ display: 'grid', gap: '8px' }}>
        <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>Luna con Marco - 50m</div>
        <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>Rocky con Sara - 120m</div>
        <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>Mia con Luca - 200m</div>
      </div>
    </div>
  );
}
