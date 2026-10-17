'use client';

export default function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>LeashLove - 250m</h1>
      <div style={{ background: '#fff3f0', padding: '12px', borderRadius: '12px', margin: '12px 0', border: '1px solid #ffccbc' }}>
        <b>TU: Francesco con Hope</b> - build di recupero
      </div>
      <div style={{ height: '60vh', background: '#e0f2f1', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ fontSize: '40px' }}>✅</div>
        <div style={{ fontWeight: 'bold' }}>Se vedi questo, Vercel è tornato Ready</div>
      </div>
    </div>
  );
}
