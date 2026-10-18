export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white p-6 flex justify-center">
      <div className="max-w-[700px] w-full">
        <a href="/iscriviti" className="font-black">← Torna a Leash Love</a>
        <h1 className="text-3xl font-black mt-6">Privacy GDPR - Leash Love</h1>
        <p className="text-sm text-zinc-500 mt-2">Titolare: Leash Love - privacy@leashlove.it - Roma - 18/10/2026</p>
        <div className="mt-8 space-y-4 text-[14px] leading-relaxed">
          <p><b>1. Dati:</b> nome proprietario, email, password (hash), nome cane, foto, caratteristiche, bio, GPS opzionale. In beta in localStorage.</p>
          <p><b>2. Finalità:</b> creare profilo e mappa. Base: consenso art.6.1.a GDPR.</p>
          <p><b>3. Diritti:</b> cancellazione scrivendo a privacy@leashlove.it</p>
        </div>
      </div>
    </main>
  )
}
