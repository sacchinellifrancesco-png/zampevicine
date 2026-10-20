"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import PhotoCropper from "../components/PhotoCropper";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Iscrizione() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    owner_name: "",
    dog_name: "",
    breed: "",
    age: "",
    size: "Medio",
    character_tags: "",
    quartiere: "",
    description: "",
    lat: "",
    lng: "",
    privacy_accepted: false,
  });

  const [files, setFiles] = useState({ dog: null as any, owner: null as any, together: null as any });
  const [previews, setPreviews] = useState({ dog: "", owner: "", together: "" });

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (!res.data.user) router.push("/login");
      else setUserId(res.data.user.id);
    });
  }, []);

  const getPos = () => {
    navigator.geolocation.getCurrentPosition((p) => {
      setForm({ ...form, lat: String(p.coords.latitude), lng: String(p.coords.longitude) });
      setMsg("Posizione presa ok");
    });
  };

  const uploadPhoto = async (file, name) => {
    const path = userId + "/" + Date.now() + "_" + name + "_" + file.name;
    const up = await supabase.storage.from("dog-photos").upload(path, file);
    if (up.error) throw up.error;
    const pub = supabase.storage.from("dog-photos").getPublicUrl(path);
    return pub.data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!form.privacy_accepted) { setMsg("Devi accettare privacy"); return; }
    if (!files.dog || !files.owner || !files.together) { setMsg("Servono 3 foto con crop fatto"); return; }
    setLoading(true);
    try {
      const urlDog = await uploadPhoto(files.dog, "dog");
      const urlOwner = await uploadPhoto(files.owner, "owner");
      const urlTogether = await uploadPhoto(files.together, "together");

      const ins = await supabase.from("dogs").insert({
        user_id: userId,
        owner_name: form.owner_name,
        dog_name: form.dog_name,
        breed: form.breed,
        age: form.age,
        size: form.size,
        character_tags: form.character_tags,
        quartiere: form.quartiere,
        description: form.description,
        lat: form.lat ? parseFloat(form.lat) : null,
        lng: form.lng ? parseFloat(form.lng) : null,
        photo_dog_url: urlDog,
        photo_owner_url: urlOwner,
        photo_together_url: urlTogether,
        privacy_accepted: true,
      });
      if (ins.error) throw ins.error;
      router.push("/vicino");
    } catch (e: any) {
      setMsg("Errore: " + e.message);
    } finally { setLoading(false); }
  };

  const inp = { padding: "12px 14px", borderRadius: 10, border: "1px solid #ddd", fontSize: 14, width: "100%", boxSizing: "border-box" as any };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 20, minHeight: "100vh", background: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Link href="/">← Home</Link>
        <div style={{ fontSize: 12, color: "#888" }}>Step {step}/4</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[1,2,3,4].map((i) => (
          <div key={i} style={{ flex:1, height: 6, borderRadius: 99, background: i<=step ? "black" : "#ddd" }} />
        ))}
      </div>

      {step===1 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Chi siete?</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <input placeholder="Tuo nome" value={form.owner_name} onChange={(e)=>setForm({...form, owner_name: e.target.value})} style={inp} />
            <input placeholder="Nome cane" value={form.dog_name} onChange={(e)=>setForm({...form, dog_name: e.target.value})} style={inp} />
            <input placeholder="Razza" value={form.breed} onChange={(e)=>setForm({...form, breed: e.target.value})} style={inp} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input placeholder="Età" value={form.age} onChange={(e)=>setForm({...form, age: e.target.value})} style={inp} />
              <select value={form.size} onChange={(e)=>setForm({...form, size: e.target.value})} style={inp}>
                <option>Piccolo</option><option>Medio</option><option>Grande</option>
              </select>
            </div>
            <input placeholder="Carattere" value={form.character_tags} onChange={(e)=>setForm({...form, character_tags: e.target.value})} style={inp} />
          </div>
        </div>
      )}

      {step===2 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Dove siete?</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <input placeholder="Quartiere" value={form.quartiere} onChange={(e)=>setForm({...form, quartiere: e.target.value})} style={inp} />
            <textarea placeholder="Descrizione" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} style={{ ...inp, height: 80 }} />
            <div style={{ display: "flex", gap: 10 }}>
              <input placeholder="Lat" value={form.lat} readOnly style={{ ...inp, flex:1, background: "#eee" }} />
              <input placeholder="Lng" value={form.lng} readOnly style={{ ...inp, flex:1, background: "#eee" }} />
            </div>
            <button onClick={getPos} style={{ background: "white", border: "1px solid #ddd", padding: 12, borderRadius: 10, fontWeight: 600 }}>Prendi posizione</button>
          </div>
        </div>
      )}

      {step===3 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>3 Foto con crop</h2>
          <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Ritaglia per uniformare tutte le card</p>
          <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
            <PhotoCropper label="Cane solo" aspect="1:1" onCropped={(file, url)=>{ setFiles((p)=>({...p, dog: file})); setPreviews((p)=>({...p, dog: url})); }} />
            <PhotoCropper label="Padrone solo" aspect="1:1" onCropped={(file, url)=>{ setFiles((p)=>({...p, owner: file})); setPreviews((p)=>({...p, owner: url})); }} />
            <PhotoCropper label="INSIEME obbligatoria" aspect="4:3" onCropped={(file, url)=>{ setFiles((p)=>({...p, together: file})); setPreviews((p)=>({...p, together: url})); }} />
          </div>
        </div>
      )}

      {step===4 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Privacy</h2>
          <div style={{ background: "white", border: "1px solid #eee", borderRadius: 12, padding: 12, marginTop: 14, fontSize: 13, color: "#444" }}>
            Confermo che le foto sono mie e che il profilo sarà visibile solo ad altri iscritti. Chat solo dopo match reciproco.
          </div>
          <label style={{ display: "flex", gap: 10, marginTop: 14, fontSize: 13 }}>
            <input type="checkbox" checked={form.privacy_accepted} onChange={(e)=>setForm({...form, privacy_accepted: e.target.checked})} />
            Accetto privacy e termini
          </label>
        </div>
      )}

      {msg && <div style={{ marginTop: 12, fontSize: 13, color: msg.includes("Errore") ? "red" : "green" }}>{msg}</div>}

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        {step>1 && <button onClick={()=>setStep(s=>s-1)} style={{ flex:1, padding: 14, borderRadius: 99, border: "1px solid #ddd", background: "white" }}>Indietro</button>}
        {step<4 ? (
          <button onClick={()=>setStep(s=>s+1)} style={{ flex:1, padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 700, border: "none" }}>Avanti</button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} style={{ flex:1, padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 700, border: "none", opacity: loading?0.6:1 }}>
            {loading ? "Carico..." : "Crea profilo"}
          </button>
        )}
      </div>
    </div>
  );
}
