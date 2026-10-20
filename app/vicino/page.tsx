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

export default function VicinoConFoto() {
  const [myPos, setMyPos] = useState<{lat:number,lng:number}|null>(null);
  const [dogs, setDogs] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [myUserId, setMyUserId] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);
  const [anim, setAnim] = useState("");
  const router = useRouter();

  useEffect(()=>{
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if(!user){ router.push("/login"); return; }
      setMyUserId(user.id);
      navigator.geolocation.getCurrentPosition(
        p=>setMyPos({lat:p.coords.latitude,lng:p.coords.longitude}),
        ()=>{}
      );
      const { data } = await supabase.from("dogs")
        .select("*")
        .neq("user_id", user.id)
        .eq("privacy_accepted", true)
        .not("photo_together_url","is",null);
      
      const { data: likes } = await supabase.from("dog_likes").select("to_dog_id").eq("from_user_id", user.id);
      const likedIds = new Set((likes||[]).map((l:any)=>l.to_dog_id));
      let filtered = (data||[]).filter((d:any)=>!likedIds.has(d.id));

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
    setAnim(liked ? "translateX(400px) rotate(15deg)" : "translateX(-400px) rotate(-15deg)");
    await supabase.from("dog_likes").insert({ from_user_id: myUserId, to_dog_id: current.id, liked });
    setTimeout(()=>{ setAnim(""); setIndex(i=>i+1); }, 220);
  };

  if(loading) return <div style={{ padding: 40, textAlign: "center" }}>🐶 Carico cani vicini con foto...</div>;
  
  if(!dogs.length || index >= dogs.length) return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20, textAlign: "center" }}>
      <h1 style={{ fontWeight: 800, fontSize: 22 }}>Sei il primo nel tuo quartiere!</h1>
      <p style={{ color: "#666", marginTop: 8, fontSize: 14 }}>Invita un amico per testare lo swipe con foto vere.</p>
      <Link href="/cani" style={{ display: "block", marginTop: 20, background: "black", color: "white", padding: 14, borderRadius: 99, textAlign: "center" }}>Vai a lista cani</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 12, minHeight: "100vh", background: "#fafafa" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 14 }}>
        <Link href="/" style={{ fontWeight: 800 }}>LeashLove</Link>
        <Link href="/cani">Lista</Link>
      </header>
      <h2 style={{ textAlign: "center", fontWeight: 800 }}>Vicino a te 📍 {dogs.length-index} cani</h2>
      
      <div style={{ position: "relative", height: 520, marginTop: 12 }}>
        <div style={{ position: "absolute", width: "100%", height: "100%", background: "white", borderRadius: 24, boxShadow: "0 12px 30px rgba(0,0,0,0.15)", overflow: "hidden", transform: anim || "none", transition: "transform 0.22s" }}>
          <img src={current.photo_together_url} alt={current.dog_name} style={{ width: "100%", height: 320, objectFit: "cover" }} />
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{current.dog_name} • {current.breed} <span style={{ fontWeight: 400, fontSize: 14, color: "#666" }}>({current.size})</span></div>
            <div style={{ color: "#444", fontSize: 14, marginTop: 4 }}>di {current.owner_name} • 📍 {current.quartiere} {current.dkm ? `• ${current.dkm.toFixed(1)} km` : ""}</div>
            <div style={{ fontSize: 12, marginTop: 6, background: "#f3f3f3", padding: "6px 10px", borderRadius: 99, display: "inline-block" }}>{current.character_tags || "Giocherellone"}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 18 }}>
        <button onClick={()=>handleAction(false)} style={{ width: 62, height: 62, borderRadius: "50%", background: "white", border: "1px solid #ddd", fontSize: 26 }}>✕</button>
        <button onClick={()=>handleAction(true)} style={{ width: 72, height: 72, borderRadius: "50%", background: "black", color: "white", fontSize: 30, border: "none" }}>♥</button>
      </div>
    </div>
  );
}
