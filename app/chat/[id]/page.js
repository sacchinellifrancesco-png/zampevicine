
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ChatSingola() {
  const { id } = useParams();
  const [mess, setMess] = useState([]);
  const [text, setText] = useState("");
  const [other, setOther] = useState(null);

  const loadMess = async () => {
    const { data } = await supabase.from("messages").select("*").eq("match_id", id).order("created_at", { ascending: true });
    setMess(data||[]);
  };

  useEffect(() => {
    const init = async () => {
      const myEmail = localStorage.getItem("leashlove_email");
      const { data: match } = await supabase.from("matches").select("*").eq("id", id).single();
      if (match) {
        const otherEmail = match.user1_email === myEmail ? match.user2_email : match.user1_email;
        const { data: prof } = await supabase.from("profiles").select("*").eq("email", otherEmail).single();
        setOther(prof);
      }
      loadMess();
      const interval = setInterval(loadMess, 2000);
      return () => clearInterval(interval);
    };
    init();
  }, [id]);

  const invia = async () => {
    if (!text.trim()) return;
    const myEmail = localStorage.getItem("leashlove_email");
    await supabase.from("messages").insert({ match_id: id, sender_email: myEmail, text });
    setText("");
    loadMess();
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-zinc-50">
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <a href="/chat" className="text-sm">←</a>
        <img src={other?.foto_cane_url} className="w-10 h-10 rounded-full object-cover" alt="" />
        <p className="font-bold">{other?.nome_cane} - {other?.nome_proprietario}</p>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {mess.map(m=> {
          const mio = m.sender_email === localStorage.getItem("leashlove_email");
          return <div key={m.id} className={`max-w-[75%] p-3 rounded-2xl text-sm ${mio ? "bg-[#FF8F6B] text-white ml-auto" : "bg-white border"}`}>{m.text}</div>
        })}
      </div>
      <div className="p-3 border-t bg-white flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&invia()} placeholder="Scrivi un messaggio..." className="flex-1 p-3 border rounded-full" />
        <button onClick={invia} className="bg-black text-white px-6 rounded-full font-bold">Invia</button>
      </div>
    </div>
  );
}
