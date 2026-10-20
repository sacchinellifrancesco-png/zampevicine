"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function WalkDetail() {
  const { id } = useParams();
  const [walk, setWalk] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [joined, setJoined] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
      const { data: walkData } = await supabase.from("walks").select("*").eq("id", id).single();
      setWalk(walkData);
      const { data: partData } = await supabase.from("walk_participants").select("*").eq("walk_id", id);
      setParticipants(partData || []);
      if (user && partData?.find((p:any)=>p.user_id===user.id)) setJoined(true);
    };
    load();
  }, [id]);

  const join = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { error } = await supabase.from("walk_participants").insert({ walk_id: id, user_id: user.id });
    if (!error) { setJoined(true); setParticipants([...participants, { user_id: user.id }]); }
    else alert(error.message);
  };

  if (!walk) return <div style={{ padding: 20 }}>Caricamento...</div>;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <Link href="/passeggiate">← Tutte le passeggiate</Link>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16 }}>{walk.park_name}</h1>
      <p style={{ marginTop: 8 }}>📅 {walk.date} alle {walk.time}</p>
      {walk.notes && <p style={{ marginTop: 8, color: "#666" }}>📝 {walk.notes}</p>}
      <p style={{ marginTop: 12, fontSize: 14, color: "#666" }}>{participants.length} cani partecipano + organizzatore</p>

      <div style={{ marginTop: 24 }}>
        {joined ? (
          <div style={{ background: "#e6f7e6", padding: 14, borderRadius: 12, textAlign: "center" }}>✅ Sei iscritto a questa passeggiata!</div>
        ) : (
          <button onClick={join} style={{ width: "100%", padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 600 }}>Unisciti alla passeggiata 🐶</button>
        )}
      </div>

      <Link href="/dashboard" style={{ display: "block", marginTop: 20, textAlign: "center", textDecoration: "underline", fontSize: 14 }}>Vai alla dashboard</Link>
    </div>
  );
}
