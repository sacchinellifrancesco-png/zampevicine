'use client';

export default function MapView() {
  return (
    <div style={{ height: '60vh', width: '100%', borderRadius: '16px', background: '#e0f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '2px dashed #80cbc4' }}>
      <div style={{ fontSize: '48px' }}>🗺️</div>
      <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Mappa pronta</div>
      <div style={{ fontSize: '12px', color: '#555' }}>Base pulita per tornare Ready</div>
    </div>
  );
}
