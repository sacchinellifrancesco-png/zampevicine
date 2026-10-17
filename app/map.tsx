'use client';

import { useEffect, useState } from 'react';

export default function Map() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{height:'400px', width:'100%', background:'#f3f3f3', borderRadius:'12px'}} />;
  }

  // import dinamico solo quando siamo nel browser
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  require('leaflet/dist/leaflet.css');
  const L = require('leaflet');

  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  return (
    <MapContainer center={[41.9028, 12.4964]} zoom={6} style={{ height: '400px', width: '100%', borderRadius: '12px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[41.9028, 12.4964]}>
        <Popup>Zampe Vicine</Popup>
      </Marker>
    </MapContainer>
  );
}
