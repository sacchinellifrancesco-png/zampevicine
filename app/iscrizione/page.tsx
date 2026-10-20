"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Iscrizione() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
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

  const [files, setFiles] = useState({ dog: null, owner: null, together: null });
  const [preview, setPreview] = useState({ dog: "", owner: "", together: "" });

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (!res.data.user) router.push("/login");
      else setUserId(res.data.user.id);
    });
  }, []);

  const onFile = (type, f) => {
    if (!f) return;
    setFiles((prev) => ({ ...prev, [type]: f }));
    setPreview((prev) => ({ ...prev, [type]: URL.createObjectURL(f) }));
  };

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
    if (!files.dog || !files.owner || !files.together) { setMsg("Servono 3 foto obbligatorie"); return; }
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
    } catch (e) {
      setMsg("Errore: " + e.message);
    } finally { setLoading(false); }
  };

  return null as any;
}
