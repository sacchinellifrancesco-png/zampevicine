
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ChatList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const myEmail = localStorage.getItem("leashlove_email");
      if (!myEmail) { setLoading(false); return; }
      const { data: list } = await supabase.from("matches").select("*").or(`user1_email.eq.${myEmail},user2_email.eq.${myEmail}`).order("created_at", { ascending: false });
      const conProfili = await Promise.all((list||[]).map(async m => {
        const otherEmail = m.user1_email === myEmail ? m.user2_email : m.user1_email;
        const { data: prof } = await supabase.from("profiles").select("*").eq("email", otherEmail).single();
        return { ...m, other: prof };
      }));
      setMatches(conProfili);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="p-6">Carico chat...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Le tue Zampe 🐾</h1>
      <Link href="/vicino" className="text-sm underline text-zinc-500">Torna a cani vicino</Link>
      <div className="mt-6 space-y-3">
        {matches.length === 0 ? <p className="text-zinc-500">Nessuna chat. Vai in Vicino e fai Zampara!</p> :
          matches.map(m=>(
            <Link key={m.id} href={`/chat/${m.id}`} className="flex gap-3 p-3 border rounded-2xl bg-white">
              <img src={m.other?.foto_cane_url} className="w-14 h-14 rounded-full object-cover" alt="" />
              <div>
                <p className="font-bold">{m.other?.nome_cane} - {m.other?.nome_proprietario}</p>
                <p className="text-sm text-zinc-500">Tocca per chattare</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}
