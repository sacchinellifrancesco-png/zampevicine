
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const iconDog = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -40]
});

const iconMe = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapLeashLove({ pos, cani }) {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
  }, []);

  if (!pos) return <div className="h-[500px] bg-zinc-100 flex items-center justify-center rounded-2xl">Carico mappa...</div>;

  return (
    <MapContainer center={[pos.lat, pos.lng]} zoom={13} style={{ height: "500px", width: "100%", borderRadius: "16px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[pos.lat, pos.lng]} icon={iconMe}>
        <Popup>Sei qui 🐾</Popup>
      </Marker>
      {cani.map(c=>(
        <Marker key={c.id} position={[c.lat, c.lng]} icon={iconDog}>
          <Popup>
            <div className="text-center">
              <img src={c.foto_cane_url} className="w-16 h-16 rounded-full object-cover mx-auto" alt="" />
              <p className="font-bold mt-2">{c.nome_cane} - {c.dist.toFixed(1)} km</p>
              <p className="text-xs">{c.nome_proprietario}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
