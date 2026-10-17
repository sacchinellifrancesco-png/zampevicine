'use client';
import { useEffect, useRef } from 'react';

export default function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      const L = await import('leaflet');

      if (!document.querySelector('#leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      const map = L.map(mapContainerRef.current).setView([41.9028, 12.4964], 16);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((p) => {
          const pos: [number, number] = [p.coords.latitude, p.coords.longitude];
          map.setView(pos, 16);
          L.marker(pos).addTo(map).bindPopup('Tu: Francesco con Hope').openPopup();
        });
      }

      L.marker([41.9025, 12.4965]).addTo(map).bindPopup('<b>Luna</b> con Marco');
      L.marker([41.9015, 12.4975]).addTo(map).bindPopup('<b>Rocky</b> con Sara');
      L.marker([41.9030, 12.4955]).addTo(map).bindPopup('<b>Mia</b> con Luca');
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} style={{ height: '60vh', width: '100%', borderRadius: '16px' }} />;
}
