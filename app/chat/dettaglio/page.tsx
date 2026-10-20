"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function ChatInner() {
  const params = useSearchParams();
  const router = useRouter();
  const matchId = params.get("id");
  const [myId, setMyId] = useState(null as any);
  const [match, setMatch] = useState(null as any);
  const [otherDog, setOtherDog] = useState(null as any);
  const [msgs, setMsgs] = useState([] as any[]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!matchId) return;
    load();
    const ch = supabase.channel("msg_" + matchId).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: "match_id=eq." + matchId }, (payload) => {
      setMsgs((prev:any)=>[...prev, payload.new]);
    }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [matchId]);

  const load = async () => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) { router.push("/login"); return; }
    setMyId(u.user.id);

    const mRes = await supabase.from("matches").select("*").eq("id", matchId).single();
    if (!mRes.data) { router.push("/chat"); return; }
    if (mRes.data.user1_id !== u.user.id && mRes.data.user2_id !== u.user.id) { router.push("/chat"); return; }
    setMatch(mRes.data);

    const otherDogId = mRes.data.user1_id === u.user.id ? mRes.data.dog2_id : mRes.data.dog1_id;
    const dogRes = await supabase.from("dogs").select("*").eq("id", otherDogId).single();
    setOtherDog(dogRes.data);

    const msgRes = await supabase.from("messages").select("*").eq("match_id", matchId).order("created_at", { ascending: true });
    setMsgs(msgRes.data || []);
    setLoading(false);
  };

  const send = async () => {
    if (!text.trim() || !matchId || !myId) return;
    const t = text;
    setText("");
    await supabase.from("messages").insert({ match_id: matchId, from_user_id: myId, text: t });
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Carico chat...</div>;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 14px", background: "white", borderBottom: "1px solid #eee" }}>
        <Link href="/chat" style={{ textDecoration: "none", color: "#111" }}>←</Link>
        <img src={otherDog ? otherDog.photo_together_url : ""} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{otherDog ? otherDog.dog_name : "Chat"} • {otherDog ? otherDog.owner_name : ""}</div>
          <div style={{ fontSize: 11, color: "#666" }}>{otherDog ? otherDog.quartiere : ""} • Match attivo</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
        {msgs.length===0 && <div style={{ textAlign: "center", color: "#999", fontSize: 13, marginTop: 30 }}>Nessun messaggio. Di ciao! 👋</div>}
        {msgs.map((m:any)=>(
          <div key={m.id} style={{ alignSelf: m.from_user_id===myId ? "flex-end" : "flex-start", background: m.from_user_id===myId ? "black" : "white", color: m.from_user_id===myId ? "white" : "#111", padding: "8px 12px", borderRadius: 18, maxWidth: "75%", fontSize: 14, border: m.from_user_id===myId ? "none" : "1px solid #eee" }}>
            {m.text}
          </div>
        ))}
      </div>

      <div style={{ padding: 12, background: "white", borderTop: "1px solid #eee", display: "flex", gap: 8 }}>
        <input value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>{ if (e.key==="Enter") send(); }} placeholder="Scrivi un messaggio..." style={{ flex: 1, padding: "12px 14px", borderRadius: 99, border: "1px solid #ddd", fontSize: 14 }} />
        <button onClick={send} style={{ background: "black", color: "white", border: "none", borderRadius: 99, padding: "0 18px", fontWeight: 700 }}>Invia</button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Carico...</div>}>
      <ChatInner />
    </Suspense>
  );
}
