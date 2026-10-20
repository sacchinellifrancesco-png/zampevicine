"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ChatList() {
  const router = useRouter();
  const [myId, setMyId] = useState(null as any);
  const [matches, setMatches] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) { router.push("/login"); return; }
    setMyId(u.user.id);

    const res = await supabase.from("matches").select("*").or("user1_id.eq." + u.user.id + ",user2_id.eq." + u.user.id).order("created_at", { ascending: false });
    const list = res.data || [];

    const enriched = [];
    for (const m of list) {
      const otherUserId = m.user1_id === u.user.id ? m.user2_id : m.user1_id;
      const otherDogId = m.user1_id === u.user.id ? m.dog2_id : m.dog1_id;
      const dogRes = await supabase.from("dogs").select("*").eq("id", otherDogId).single();
      const lastMsgRes = await supabase.from("messages").select("*").eq("match_id", m.id).order("created_at", { ascending: false }).limit(1).single();
      enriched.push({ match: m, otherDog: dogRes.data, lastMsg: lastMsgRes.data });
    }

    setMatches(enriched);
    setLoading(false);
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Carico chat...</div>;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", minHeight: "100vh", background: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "16px", alignItems: "center", background: "white", borderBottom: "1px solid #eee" }}>
        <Link href="/vicino" style={{ textDecoration: "none", color: "#111" }}>← Vicino</Link>
        <div style={{ fontWeight: 800 }}>Messaggi</div>
        <div style={{ width: 60 }} />
      </div>

      <div style={{ padding: 12 }}>
        {matches.length===0 && (
          <div style={{ textAlign: "center", marginTop: 60, background: "white", borderRadius: 16, padding: 30, border: "1px solid #eee" }}>
            <div style={{ fontSize: 30 }}>💬</div>
            <div style={{ fontWeight: 700, marginTop: 8 }}>Nessuna chat ancora</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>Fai match in /vicino per sbloccare la chat</div>
            <Link href="/vicino" style={{ display: "inline-block", marginTop: 14, background: "black", color: "white", padding: "10px 16px", borderRadius: 99, textDecoration: "none", fontSize: 13 }}>Vai a vicino</Link>
          </div>
        )}

        {matches.map((it:any)=>(
          <Link key={it.match.id} href={"/chat/dettaglio?id=" + it.match.id} style={{ textDecoration: "none", color: "#111" }}>
            <div style={{ display: "flex", gap: 12, background: "white", border: "1px solid #eee", borderRadius: 16, padding: 12, marginBottom: 10, alignItems: "center" }}>
              <img src={it.otherDog ? it.otherDog.photo_together_url : ""} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{it.otherDog ? it.otherDog.dog_name : "Cane"} • {it.otherDog ? it.otherDog.owner_name : ""}</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>
                  {it.lastMsg ? it.lastMsg.text : "Nuovo match! Inizia a chattare →"}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#999" }}>{it.otherDog ? it.otherDog.quartiere : ""}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
