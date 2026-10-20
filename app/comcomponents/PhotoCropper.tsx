"use client";
import { useState, useRef } from "react";

type Props = {
  label: string;
  aspect: "1:1" | "4:3";
  onCropped: (file: File, previewUrl: string) => void;
};

export default function PhotoCropper({ label, aspect, onCropped }: Props) {
  const [src, setSrc] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    if (!ctx) return;
    ctx.drawImage(img, x, y, cropW, cropH, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "cropped_"+Date.now()+".jpg", { type: "image/jpeg" });
      const url = URL.createObjectURL(file);
      setPreview(url);
      onCropped(file, url);
    }, "image/jpeg", 0.8);
  };

  return (
    <div style={{ border: "1px solid #eee", background: "white", borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700 }}>{label} - Crop {aspect}</div>
      <input type="file" accept="image/*" onChange={onSelect} style={{ marginTop: 8, fontSize: 13 }} />
      
      {src && (
        <div style={{ marginTop: 10 }}>
          <img ref={imgRef} src={src} style={{ width: "100%", maxHeight: 250, objectFit: "contain", background: "#f5f5f5", borderRadius: 8 }} />
          <button onClick={doCrop} style={{ marginTop: 8, width: "100%", padding: 10, borderRadius: 8, background: "black", color: "white", border: "none", fontWeight: 600, fontSize: 13 }}>
            Ritaglia {aspect} ✓
          </button>
        </div>
      )}
      
      {preview && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, color: "#666" }}>Anteprima finale:</div>
          <img src={preview} style={{ width: "100%", height: aspect==="1:1"?180:160, objectFit: "cover", borderRadius: 10, marginTop: 4 }} />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
