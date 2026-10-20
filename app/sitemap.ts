import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zampevicine.it";
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/iscrizione`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/login`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/vicino`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/termini`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/vet/prati`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/vet/trastevere`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/vet/parioli`, lastModified: new Date(), priority: 0.7 },
  ];
}
