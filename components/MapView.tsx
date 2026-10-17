'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const caniFinti = [
  { id: 1, nome: "Luna", padrone: "Marco", lat: 41.9025, lng: 12.4965 },
  { id: 2, nome: "Rocky", padrone: "Sara", lat: 41.9015, lng: 12.4975 },
  { id: 3, nome: "Mia", padrone: "Luca", lat: 41.9030, lng: 12.4955 },
];

export default function MapView() {
  const [pos, setPos] = useState<[number, number]>([41.9028, 12.4964]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setPos([p.coords.latitude, p.coords.longitude]),
        () => {}
      );
    }
    setReady(true);
  }, []);

  if (!ready) return <div style={{ height: '60vh', background: '#eee', borderRadius: '16px' }}>Carico mappa...</div>;

  return (
    <div style={{ height: '60vh', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer center={pos} zoom={16} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pos}><Popup>Tu: Francesco con Hope</Popup></Marker>
        {caniFinti.map(cane => (
          <Marker key={cane.id} position={[cane.lat, cane.lng]}>
            <Popup><b>{cane.nome}</b> con {cane.padrone}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
