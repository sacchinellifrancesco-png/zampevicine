"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

function distanzaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export default function MappaPage() {
  const [pos, setPos] = useState(null);
  const [cani, setCani] = useState([]);
  const [raggio, setRaggio] = useState(5);
  const [statoGPS, setStatoGPS] = useState("Non attivo");
  const [email, setEmail] = useState("");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    setEmail(localStorage.getItem("leashlove_email") || "NESSUNA EMAIL SALVATA");
  }, []);

  const caricaCani = async (lat, lng) => {
    const myEmail = localStorage.getItem("leashlove_email");
    const { data } = await supabase.from("profiles").select("*").not("lat","is",null);
    const conDist = (data || []).filter(c=>c.email !== myEmail).map(c=>({...c, dist: distanzaKm(lat,lng,c.lat,c.lng)})).sort((a,b)=>a.dist-b.dist);
    setCani(conDist);
  };

  const attivaGPS = () => {
    if (!navigator.geolocation) {
      setStatoGPS("Il tuo browser non supporta GPS");
      return;
    }
    setStatoGPS("Chiedo permesso GPS... guarda in alto nel browser");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const lat = p.coords.latitude;
        const lng = p.coords.longitude;
        setPos({ lat, lng });
        setStatoGPS(`GPS OK: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        caricaCani(lat, lng);
      },
      (err) => {
        setStatoGPS(`GPS BLOCCATO: ${err.message}. Clicca sul lucchetto vicino all'indirizzo > Consenti Posizione, poi ricarica.`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Carica mappa anche SENZA GPS (centrata su Roma)
  useEffect(() => {
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
      if (cancelled || !mapRef.current) return;
      if (mapInstanceRef.current) mapInstanceRef.current.remove();
      const centro = pos ? [pos.lat, pos.lng] : [41.9028, 12.4964]; // Roma default
      const map = L.map(mapRef.current).setView(centro, pos ? 13 : 6);
      mapInstanceRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OSM" }).addTo(map);
      if (pos) {
        L.marker([pos.lat, pos.lng]).addTo(map).bindPopup("Sei qui 🐾").openPopup();
        cani.filter(c=>c.dist <= raggio).forEach((c)=>{
          if(!c.lat || !c.lng) return;
          L.marker([c.lat, c.lng]).addTo(map).bindPopup(`${c.nome_cane} - ${c.dist.toFixed(1)}km`);
        });
      }
    });
    return () => { cancelled = true; if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current=null; } };
  }, [pos, cani, raggio]);

  const filtrati = cani.filter(c=>c.dist <= raggio);

  return (
    <div className="p-4 max-w-3xl mx-auto pb-20">
      <h1 className="text-xl font-bold">Mappa Debug</h1>
      <p className="text-xs bg-gray-100 p-2 rounded mt-2">Email salvata: {email} | {statoGPS}</p>
      
      <button onClick={attivaGPS} className="w-full mt-3 p-3 bg-black text-white rounded-xl font-bold">
        📍 CLICCA QUI PER ATTIVARE GPS
      </button>

      <div className="bg-white p-4 rounded-2xl border mt-4">
        <p className="text-sm font-bold text-center">Entro <span className="text-[#FF8F6B]">{raggio} km</span> - Trovati {filtrati.length} cani</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs">1</span>
          <input type="range" min={1} max={200} value={raggio} onChange={e=>setRaggio(Number(e.target.value))} className="flex-1 accent-[#FF8F6B]" />
          <span className="text-xs">200</span>
          <input type="number" min={1} max={200} value={raggio} onChange={e=>setRaggio(Number(e.target.value)||1)} className="w-20 p-2 border rounded-xl text-center font-bold" />
        </div>
        {pos==null && <p className="text-xs text-center mt-2 text-red-500">GPS non attivo, quindi ti mostro 0 cani. Attiva GPS col bottone sopra.</p>}
        {pos!=null && filtrati.length==0 && <p className="text-sm text-center mt-3 bg-yellow-100 p-3 rounded-xl">Nessun cane entro {raggio} km. Sei l'unico iscritto. Allarga a 200km.</p>}
      </div>

      <div className="mt-4">
        <div ref={mapRef} style={{ height: "500px", width: "100%", borderRadius: "16px", background: "#eee" }} />
      </div>
    </div>
  );
}
