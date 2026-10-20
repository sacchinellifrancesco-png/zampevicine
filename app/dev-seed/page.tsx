"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FAKE_DOGS = [
  { owner_name: "Giulia", dog_name: "Luna", breed: "Labrador", age: "2 anni", size: "Grande", character_tags: "giocherellona socievole", quartiere: "Trastevere", description: "Ama correre al parco", lat: 41.889, lng: 12.469, img: "https://images.unsplash.com/photo-1552053831-71594a27632d" },
  { owner_name: "Marco", dog_name: "Rocky", breed: "French Bulldog", age: "1 anno", size: "Piccolo", character_tags: "tranquillo coccolone", quartiere: "Testaccio", description: "Cerca amici per passeggiate serali", lat: 41.879, lng: 12.477, img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d" },
  { owner_name: "Sofia", dog_name: "Milo", breed: "Beagle", age: "3 anni", size: "Medio", character_tags: "energico curioso", quartiere: "Prati", description: "Adora annusare tutto", lat: 41.905, lng: 12.458, img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee" },
];

export default function Seed() {
  const [log, setLog] = useState("");
  const [loading, setLoading] = useState(false);

  const createFakes = async () => {
    setLoading(true);
    setLog("Creo fake dogs...");
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) { setLog("Devi fare login prima con il tuo account vero in /login"); setLoading(false); return; }

      for (const f of FAKE_DOGS) {
        const ins = await supabase.from("dogs").insert({
          user_id: u.user.id,
          owner_name: f.owner_name + " TEST",
          dog_name: f.dog_name,
          breed: f.breed,
          age: f.age,
          size: f.size,
          character_tags: f.character_tags,
          quartiere: f.quartiere,
          description: f.description + " - PROFILO TEST",
          lat: f.lat,
          lng: f.lng,
          photo_dog_url: f.img,
          photo_owner_url: f.img,
          photo_together_url: f.img,
          privacy_accepted: true,
        });
        if (ins.error) setLog((p)=>p + "\nErrore " + f.dog_name + ": " + ins.error.message);
        else setLog((p)=>p + "\nCreato " + f.dog_name + " in " + f.quartiere);
      }
      setLog((p)=>p + "\n\nFATTO! Vai su /vicino per vederli");
    } catch (e:any) { setLog("Errore: " + e.message); }
    setLoading(false);
  };

  const cleanFakes = async () => {
    setLoading(true);
    const del = await supabase.from("dogs").delete().like("description", "%PROFILO TEST%");
    setLog("Puliti test: " + JSON.stringify(del));
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2 style={{ fontWeight: 900 }}>DEV SEED - Solo per test</h2>
      <p style={{ fontSize: 13, color: "#666", marginTop: 8 }}>1. Fai login con il tuo account vero su /login<br/>2. Torna qui e clicca Crea Fake<br/>3. Verranno creati 3 cani finti vicini a Roma con foto insieme già pronte</p>
      
      <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
        <button onClick={createFakes} disabled={loading} style={{ padding: 14, borderRadius: 12, background: "black", color: "white", fontWeight: 700, border: "none" }}>{loading ? "..." : "Crea 3 cani fake vicini"}</button>
        <button onClick={cleanFakes} disabled={loading} style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #ddd" }}>Pulisci fake</button>
      </div>

      <div style={{ marginTop: 20, background: "#111", color: "#0f0", padding: 12, borderRadius: 8, fontFamily: "monospace", fontSize: 12, whiteSpace: "pre-wrap", minHeight: 100 }}>{log || "Log qui..."}</div>

      <div style={{ marginTop: 20, background: "white", border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Credenziali fake rapide per test match:</div>
        <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
          <b>Account 1 (tu):</b> usa il tuo account reale già loggato<br/>
          <b>Account 2 (incognito):</b> Registra su /iscrizione:<br/>
          Email: test.roma2@gmail.com<br/>
          Password: Test12345!<br/><br/>
          Poi fai like incrociato in /vicino da entrambi → matcha → chat in /chat
        </div>
      </div>
    </div>
  );
}
