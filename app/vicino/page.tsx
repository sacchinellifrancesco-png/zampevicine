"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function distKm(lat1:number, lon1:number, lat2:number, lon2:number){
  const R=6371; 
  const dLat=(lat2-lat1)*Math.PI/180; 
  const dLon=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

export default function VicinoTinder() {
  const [myPos, setMyPos] = useState<{lat:number,lng:number}|null>(null);
  const [dogs, setDogs] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [myUserId, setMyUserId] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);
  const [anim, setAnim] = useState<string>("");
  const router = useRouter();

  useEffect(()=>{
    const init = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if(!user){ router.push("/login"); return; }
      setMyUserId(user.id);

      navigator.geolocation.getCurrentPosition(
        p=>setMyPos({lat:p.coords.latitude,lng:p.coords.longitude}),
        ()=>{ setMyPos(null); }
      );

      // prendi tutti i cani TRanne il tuo - se sei solo, vedrai lista vuota
      const { data, error } = await supabase.from("dogs").select("*").neq("user_id", user.id);
      if(error){
        console.log("ERRORE DOGS:", error);
        setLoading(false);
        return;
      }
      
      // prendi like già fatti
      const { data: likes } = await supabase.from("dog_likes").select("to_dog_id").eq("from_user_id", user.id);
      const likedIds = new Set((likes||[]).map((l:any)=>l.to_dog_id));
      let filtered = (data||[]).filter((d:any)=>!likedIds.has(d.id));
      
      // ordina per distanza se ho GPS
      if(myPos){
        filtered = filtered.map((d:any)=>({...d, dkm: d.lat && d.lng ? distKm(myPos.lat,myPos.lng,d.lat,d.lng) : 999})).sort((a,b)=>a.dkm-b.dkm);
      }
      
      setDogs(filtered);
      setLoading(false);
    };
    init();
  },[]);

  useEffect(()=>{
    if(myPos && dogs.length){
      const sorted = [...dogs].map((d:any)=>({...d, dkm: d.lat && d.lng ? distKm(myPos.lat,myPos.lng,d.lat,d.lng) : 999})).sort((a:any,b:any)=>a.dkm-b.dkm);
      setDogs(sorted);
    }
  },[myPos]);

  const current = dogs[index];

  const handleAction = async (liked: boolean) => {
    if(!current || !myUserId) return;
    setAnim(liked ? "translateX(400px) rotate(20deg)" : "translateX(-400px) rotate(-20deg)");
    await supabase.from("dog_likes").insert({ from_user_id: myUserId, to_dog_id: current.id, liked });
    setTimeout(()=>{ setAnim(""); setIndex(i=>i+1); }, 250);
  };

  if(loading){
    return (
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 20, textAlign: "center", marginTop: 100 }}>
        <div style={{ fontSize: 40 }}>🐶</div>
        <h2 style={{ marginTop: 12 }}>Caricamento cani vicino...</h2>
        <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>Sto cercando i cani nel tuo quartiere</p>
      </div>
    );
  }

  if(!dogs.length || index >= dogs.length){
    return (
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 20, textAlign: "center", marginTop: 60 }}>
        <div style={{ fontSize: 60 }}>🎉</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 12 }}>{dogs.length===0 ? "Sei il primo nel tuo quartiere!" : "Hai visto tutti!"}</h1>
        <p style={{ color: "#666", marginTop: 8, fontSize: 14 }}>
          {dogs.length===0 ? "Al momento non ci sono altri cani registrati oltre a te. Invita un amico di Roma per testare lo swipe." : "Torna più tardi, arriveranno nuovi cani."}
        </p>
        <div style={{ marginTop: 20, padding: 12, background: "#f6f6f6", borderRadius: 12, fontSize: 12, color: "#666" }}>
          Debug: user_id={myUserId?.slice(0,8)} | myPos={myPos ? `${myPos.lat.toFixed(2)}` : "no GPS"} | cani trovati: {dogs.length}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
          <Link href="/cani" style={{ background: "black", color: "white", padding: 14, borderRadius: 99, fontWeight: 600 }}>Vedi lista cani</Link>
          <Link href="/dashboard" style={{ border: "1px solid #ddd", padding: 14, borderRadius: 99 }}>Vai alla dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 12, minHeight: "100vh", background: "#fafafa" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
        <Link href="/" style={{ fontWeight: 800 }}>LeashLove</Link>
        <div style={{ display: "flex", gap: 12, fontSize: 14 }}><Link href="/dashboard">Profilo</Link><Link href="/passeggiate">Passeggiate</Link></div>
      </header>

      <div style={{ textAlign: "center", marginTop: 10 }}>
        <h2 style={{ fontWeight: 800 }}>Vicino a te {myPos ? "📍" : "(GPS off)"}</h2>
        <p style={{ fontSize: 12, color: "#666" }}>{dogs.length - index} cani da scoprire</p>
      </div>

      <div style={{ position: "relative", height: 480, marginTop: 16 }}>
        <div style={{
          position: "absolute", width: "100%", height: "100%", background: "white", borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between",
          transform: anim || "translateX(0)", transition: "transform 0.25s ease", border: "1px solid #eee"
        }}>
          <div style={{ height: 260, background: "#f0f0f0", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>🐕</div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{current.dog_name} <span style={{ fontWeight: 400, fontSize: 16, color: "#666" }}>{current.quartiere}</span></div>
            <div style={{ color: "#666", marginTop: 4 }}>di {current.owner_name} {current.dkm && current.dkm<999 ? `• ${current.dkm.toFixed(1)} km da te` : ""}</div>
            <div style={{ marginTop: 8, fontSize: 14, background: "#f6f6f6", padding: "8px 12px", borderRadius: 99, display: "inline-block" }}>📍 {current.quartiere || "Roma"} {current.dkm && current.dkm<2 ? "• VICINISSIMO" : ""}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20 }}>
        <button onClick={()=>handleAction(false)} style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid #ddd", background: "white", fontSize: 28 }}>✕</button>
        <button onClick={()=>handleAction(true)} style={{ width: 72, height: 72, borderRadius: "50%", border: "none", background: "black", color: "white", fontSize: 32 }}>♥</button>
      </div>
    </div>
  );
}
