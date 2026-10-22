"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

function distanzaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

export default function MappaPage() {
  const [pos, setPos] = useState(null);
  const [cani, setCani] = useState([]);
  const [raggio, setRaggio] = useState(5);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (p) => {
      const lat = p.coords.latitude;
      const lng = p.coords.longitude;
      setPos({ lat, lng });
      const myEmail = localStorage.getItem("leashlove_email");
      const { data } = await supabase.from("profiles").select("*").not("lat","is",null);
      const conDist = (data || []).filter(c=>c.email !== myEmail).map(c=>({...c, dist: distanzaKm(lat,lng,c.lat,c.lng)})).sort((a,b)=>a.dist-b.dist);
      setCani(conDist);
    });
  }, []);

  const filtrati = cani.filter(c=>c.dist <= raggio);

  useEffect(() => {
    if (!pos || !mapRef.current) return;
    let cancelled = false;

    const loadLeaflet = () => {
      return new Promise((resolve) => {
        if (window.L) { resolve(window.L); return; }
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
      if (mapInstanceRef.current) mapInstanceRef.current.remove();
      const map = L.map(mapRef.current).setView([pos.lat, pos.lng], 13);
      mapInstanceRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
      
      const iconMe = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
      });
      L.marker([pos.lat, pos.lng], { icon: iconMe }).addTo(map).bindPopup("Sei qui 🐾");

      filtrati.forEach((c) => {
        if (!c.lat || !c.lng) return;
        L.marker([c.lat, c.lng]).addTo(map).bindPopup(`<div style="text-align:center"><img src="${c.foto_cane_url}" style="width:60px;height:60px;border-radius:50%;object-fit:cover"/><br><b>${c.nome_cane}</b><br>${c.dist.toFixed(1)} km</div>`);
      });
    });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
    };
  }, [pos, filtrati]);

  return (
    <div className="p-4 max-w-3xl mx-auto pb-20">
      <h1 className="text-2xl font-bold">Mappa Live LeashLove</h1>
      <div className="flex gap-4 text-sm mt-2">
        <Link href="/vicino" className="underline">Lista</Link>
        <Link href="/chat" className="underline">Chat</Link>
      </div>
      <div className="bg-white p-4 rounded-2xl border mt-4">
        <p className="text-sm font-bold text-center">Entro <span className="text-[#FF8F6B]">{raggio} km</span> - Trovati {filtrati.length}</p>
        <div className="flex items-center gap-3 mt-2">
          <input type="range" min={1} max={200} value={raggio} onChange={e=>setRaggio(Number(e.target.value))} className="flex-1 accent-[#FF8F6B]" />
          <input type="number" min={1} max={200} value={raggio} onChange={e=>setRaggio(Math.min(200,Math.max(1,Number(e.target.value)||1)))} className="w-20 p-2 border rounded-xl text-center font-bold" />
          <span className="text-sm">km</span>
        </div>
      </div>
      <div className="mt-4">
        <div ref={mapRef} style={{ height: "500px", width: "100%", borderRadius: "16px", background: "#f4f4f5" }} />
      </div>
    </div>
  );
}
