"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function distKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2-lat1)*Math.PI/180;
  const dLon = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R*c;
}

export default function VicinoPage() {
  const router = useRouter();
  const [myUserId, setMyUserId] = useState(null as any);
  const [myDog, setMyDog] = useState(null as any);
  const [dogs, setDogs] = useState([] as any[]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [isMatch, setIsMatch] = useState(null as any);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) { router.push("/login"); return; }
    setMyUserId(u.user.id);

    const my = await supabase.from("dogs").select("*").eq("user_id", u.user.id).limit(1).single();
    if (my.data) setMyDog(my.data);

    const likedRes = await supabase.from("dog_likes").select("to_dog_id").eq("from_user_id", u.user.id);
    const likedIds = likedRes.data ? likedRes.data.map((r:any)=>r.to_dog_id) : [];

    let q = supabase.from("dogs").select("*").not("photo_together_url", "is", null).neq("user_id", u.user.id).limit(50);
    const res = await q;
    let list = res.data || [];
    
    if (likedIds.length>0) {
      list = list.filter((d:any)=> likedIds.indexOf(d.id)===-1);
    }

    if (my.data && my.data.lat && my.data.lng) {
      list = list.map((d:any)=>{
        if (d.lat && d.lng) {
          const km = distKm(parseFloat(my.data.lat), parseFloat(my.data.lng), parseFloat(d.lat), parseFloat(d.lng));
          return { ...d, _km: km.toFixed(1) };
        }
        return { ...d, _km: null };
      }).sort((a:any,b:any)=>{
        if (a._km==null) return 1;
        if (b._km==null) return -1;
        return parseFloat(a._km)-parseFloat(b._km);
      });
    }

    setDogs(list);
    setLoading(false);
  };

  const handleLike = async (liked: boolean) => {
    const cur = dogs[idx];
    if (!cur || !myUserId || !myDog) return;

    try {
      await supabase.from("dog_likes").insert({
        from_user_id: myUserId,
        to_dog_id: cur.id,
        liked: liked,
      });

      if (liked) {
        const check = await supabase.from("dog_likes").select("*").eq("from_user_id", cur.user_id).eq("to_dog_id", myDog.id).eq("liked", true).limit(1);
        if (check.data && check.data.length>0) {
          const m = await supabase.from("matches").insert({
            user1_id: myUserId,
            user2_id: cur.user_id,
            dog1_id: myDog.id,
            dog2_id: cur.id,
          }).select().single();
          setIsMatch({ dog: cur, matchId: m.data ? m.data.id : null });
          setMsg("MATCH! Ora puoi chattare");
          setTimeout(()=>setIsMatch(null), 2500);
        }
      }
    } catch (e:any) {
      if (e.message && e.message.indexOf("duplicate")>-1) {
        // gia messo like
      } else {
        setMsg("Errore like: " + e.message);
      }
    }

    if (idx+1 < dogs.length) setIdx(idx+1);
    else {
      setMsg("Hai visto tutti i cani vicini!");
      setDogs([]);
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Carico cani vicini...</div>;

  if (!myDog) {
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", padding: 40, textAlign: "center" }}>
        <h2 style={{ fontWeight: 800 }}>Devi creare il profilo prima</h2>
        <Link href="/iscrizione" style={{ display: "inline-block", marginTop: 16, background: "black", color: "white", padding: "12px 20px", borderRadius: 99, textDecoration: "none" }}>Vai a iscrizione</Link>
      </div>
    );
  }

  const cur = dogs[idx];

  if (!cur) {
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><Link href="/">Home</Link><Link href="/chat">Chat</Link></div>
        <div style={{ marginTop: 60, textAlign: "center", background: "white", border: "1px solid #eee", borderRadius: 20, padding: 30 }}>
          <div style={{ fontSize: 40 }}>🐾</div>
          <div style={{ fontWeight: 800, fontSize: 18, marginTop: 10 }}>Finito per ora</div>
          <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>{msg || "Hai visto tutti i cani. Torna più tardi!"}</div>
          <button onClick={()=>load()} style={{ marginTop: 16, padding: "10px 18px", borderRadius: 99, border: "1px solid #ddd", background: "white" }}>Ricarica</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", minHeight: "100vh", background: "#fafafa", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#111", fontWeight: 700 }}>←</Link>
        <div style={{ fontWeight: 800, fontSize: 14 }}>Vicino a te • {dogs.length-idx} rimasti</div>
        <Link href="/chat" style={{ textDecoration: "none", background: "black", color: "white", padding: "6px 12px", borderRadius: 99, fontSize: 12 }}>Chat</Link>
      </div>

      {isMatch && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "white" }}>
          <div style={{ fontSize: 50 }}>💘</div>
          <div style={{ fontSize: 28, fontWeight: 900, marginTop: 10 }}>E Match!</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>Tu e {isMatch.dog.dog_name} vi piacete</div>
        </div>
      )}

      <div style={{ padding: 16 }}>
        <div style={{ background: "white", borderRadius: 24, overflow: "hidden", border: "1px solid #eee", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          <div style={{ position: "relative", height: 440 }}>
            <img src={cur.photo_together_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
              <div style={{ background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 10px", borderRadius: 99, fontSize: 12 }}>{cur._km ? cur._km + " km" : cur.quartiere}</div>
              <div style={{ background: "white", padding: "4px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>{cur.size}</div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", color: "white" }}>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{cur.dog_name} • {cur.breed}</div>
              <div style={{ fontSize: 13, opacity: 0.9, marginTop: 2 }}>{cur.owner_name} • {cur.quartiere} • {cur.character_tags}</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6, lineHeight: 1.3 }}>{cur.description}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, padding: 16, justifyContent: "center" }}>
            <button onClick={()=>handleLike(false)} style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid #ddd", background: "white", fontSize: 24 }}>✕</button>
            <button onClick={()=>handleLike(true)} style={{ width: 72, height: 72, borderRadius: "50%", border: "none", background: "black", color: "white", fontSize: 28 }}>♥</button>
          </div>
        </div>
        {msg && <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#666" }}>{msg}</div>}
      </div>
    </div>
  );
}
