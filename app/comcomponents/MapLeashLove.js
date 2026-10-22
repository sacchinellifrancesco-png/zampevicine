"use client";
import { useEffect, useRef } from "react";

export default function MapLeashLove({ pos, cani }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!pos || !mapRef.current) return;
    let cancelled = false;

    const loadLeaflet = () => {
      return new Promise((resolve) => {
        if (window.L) {
          resolve(window.L);
          return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => resolve(window.L);
        document.body.appendChild(script);
      });
    };

    loadLeaflet().then((L) => {
      if (cancelled) return;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
      const map = L.map(mapRef.current).setView([pos.lat, pos.lng], 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const iconMe = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      L.marker([pos.lat, pos.lng], { icon: iconMe }).addTo(map).bindPopup("Sei qui 🐾");

      cani.forEach((c) => {
        if (!c.lat || !c.lng) return;
        L.marker([c.lat, c.lng]).addTo(map).bindPopup(`<div style="text-align:center"><img src="${c.foto_cane_url}" style="width:60px;height:60px;border-radius:50%;object-fit:cover"/><br><b>${c.nome_cane}</b><br>${c.dist.toFixed(1)} km</div>`);
      });
    });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [pos, cani]);

  return <div ref={mapRef} style={{ height: "500px", width: "100%", borderRadius: "16px", background: "#f4f4f5" }} />;
}
