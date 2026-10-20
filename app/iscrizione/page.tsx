"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function CropBox({ label, aspect, onCropped }: any) {
  const [src, setSrc] = useState("");
  const [preview, setPreview] = useState("");
  const imgRef = useRef(null as any);
  const canvasRef = useRef(null as any);
  const aspectNum = aspect === "1:1" ? 1 : 4/3;

  const onSelect = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSrc(URL.createObjectURL(file));
  };

  const doCrop = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    let cropW = w;
    let cropH = w / aspectNum;
    if (cropH > h) {
      cropH = h;
      cropW = h * aspectNum;
    }
    const x = (w - cropW) / 2;
    const y = (h - cropH) / 2;
    canvas.width = aspect === "1:1" ? 600 : 800;
    canvas.height = canvas.width / aspectNum;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, x, y, cropW, cropH, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob: any) => {
      if (!blob) return;
      const file = new File([blob], "cropped_" + Date.now() + ".jpg", { type: "image/jpeg" });
      const url = URL.createObjectURL(file);
      setPreview(url);
      onCropped(file, url);
    }, "image/jpeg", 0.8);
  };

  return (
    <div style={{ border: "1px solid #eee", background: "white", borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700 }}>{label} - {aspect}</div>
      <input type="file" accept="image/*" onChange={onSelect} style={{ marginTop: 8, fontSize: 13 }} />
      {src && (
        <div style={{ marginTop: 10 }}>
          <img ref={imgRef} src={src} style={{ width: "100%", maxHeight: 250, objectFit: "contain", background: "#f5f5f5", borderRadius: 8 }} />
          <button onClick={doCrop} style={{ marginTop: 8, width: "100%", padding: 10, borderRadius: 8, background: "black", color: "white", border: "none", fontWeight: 600 }}>Ritaglia {aspect}</button>
        </div>
      )}
      {preview && <img src={preview} style={{ width: "100%", height: aspect==="1:1"?180:160, objectFit: "cover", borderRadius: 10, marginTop: 8 }} />}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default function Iscrizione() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    owner_name: "", dog_name: "", breed: "", age: "", size: "Medio",
    character_tags: "", quartiere: "", description: "", lat: "", lng: "", privacy_accepted: false,
  });
  const [files, setFiles] = useState({ dog: null as any, owner: null as any, together: null as any });

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

  const uploadPhoto = async (file: any, name: string) => {
    const path = userId + "/" + Date.now() + "_" + name + "_" + file.name;
    const up = await supabase.storage.from("dog-photos").upload(path, file);
    if (up.error) throw up.error;
    const pub = supabase.storage.from("dog-photos").getPublicUrl(path);
    return pub.data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!form.privacy_accepted) { setMsg("Devi accettare privacy"); return; }
    if (!files.dog || !files.owner || !files.together) { setMsg("Servono 3 foto con crop"); return; }
    setLoading(true);
    try {
      const urlDog = await uploadPhoto(files.dog, "dog");
      const urlOwner = await uploadPhoto(files.owner, "owner");
      const urlTogether = await uploadPhoto(files.together, "together");
      const ins = await supabase.from("dogs").insert({
        user_id: userId, owner_name: form.owner_name, dog_name: form.dog_name, breed: form.breed,
        age: form.age, size: form.size, character_tags: form.character_tags, quartiere: form.quartiere,
        description: form.description, lat: form.lat ? parseFloat(form.lat) : null,
        lng: form.lng ? parseFloat(form.lng) : null, photo_dog_url: urlDog, photo_owner_url: urlOwner,
        photo_together_url: urlTogether, privacy_accepted: true,
      });
      if (ins.error) throw ins.error;
      router.push("/vicino");
    } catch (e: any) { setMsg("Errore: " + e.message); } finally { setLoading(false); }
  };

  const inp = { padding: "12px 14px", borderRadius: 10, border: "1px solid #ddd", fontSize: 14, width: "100%", boxSizing: "border-box" as any };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 20, minHeight: "100vh", background: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Link href="/">Home</Link>
        <div style={{ fontSize: 12, color: "#888" }}>Step {step}/4</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[1,2,3,4].map((i) => (<div key={i} style={{ flex:1, height: 6, borderRadius: 99, background: i<=step ? "black" : "#ddd" }} />))}
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
              <select value={form.size} onChange={(e)=>setForm({...form, size: e.target.value})} style={inp}><option>Piccolo</option><option>Medio</option><option>Grande</option></select>
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
            <button onClick={getPos} style={{ background: "white", border: "1px solid #ddd", padding: 12, borderRadius: 10, fontWeight: 600 }}>Prendi posizione</button>
          </div>
        </div>
      )}
      {step===3 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>3 Foto con crop</h2>
          <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
            <CropBox label="Cane solo" aspect="1:1" onCropped={(f:any,u:any)=>setFiles((p:any)=>({...p, dog: f}))} />
            <CropBox label="Padrone solo" aspect="1:1" onCropped={(f:any,u:any)=>setFiles((p:any)=>({...p, owner: f}))} />
            <CropBox label="INSIEME obbligatoria" aspect="4:3" onCropped={(f:any,u:any)=>setFiles((p:any)=>({...p, together: f}))} />
          </div>
        </div>
      )}
      {step===4 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Privacy</h2>
          <div style={{ background: "white", border: "1px solid #eee", borderRadius: 12, padding: 12, marginTop: 14, fontSize: 13 }}>Confermo che le foto sono mie. Chat solo dopo match reciproco.</div>
          <label style={{ display: "flex", gap: 10, marginTop: 14, fontSize: 13 }}><input type="checkbox" checked={form.privacy_accepted} onChange={(e)=>setForm({...form, privacy_accepted: e.target.checked})} />Accetto privacy</label>
        </div>
      )}
      {msg && <div style={{ marginTop: 12, fontSize: 13, color: msg.includes("Errore") ? "red" : "green" }}>{msg}</div>}
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        {step>1 && <button onClick={()=>setStep(s=>s-1)} style={{ flex:1, padding: 14, borderRadius: 99, border: "1px solid #ddd", background: "white" }}>Indietro</button>}
        {step<4 ? <button onClick={()=>setStep(s=>s+1)} style={{ flex:1, padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 700, border: "none" }}>Avanti</button> : <button onClick={handleSubmit} disabled={loading} style={{ flex:1, padding: 14, borderRadius: 99, background: "black", color: "white", fontWeight: 700, border: "none" }}>{loading ? "Carico..." : "Crea profilo"}</button>}
      </div>
    </div>
  );
}
