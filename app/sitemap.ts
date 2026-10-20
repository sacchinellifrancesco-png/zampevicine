import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://leashlove.it', lastModified: new Date(), priority: 1 },
    { url: 'https://leashlove.it/iscrizione', lastModified: new Date(), priority: 0.9 },
    { url: 'https://leashlove.it/login', lastModified: new Date(), priority: 0.8 },
    { url: 'https://leashlove.it/vicino', lastModified: new Date(), priority: 0.8 },
    { url: 'https://leashlove.it/privacy', lastModified: new Date(), priority: 0.5 },
    { url: 'https://leashlove.it/termini', lastModified: new Date(), priority: 0.5 },
    { url: 'https://leashlove.it/vet/prati', lastModified: new Date(), priority: 0.7 },
  ]
}
