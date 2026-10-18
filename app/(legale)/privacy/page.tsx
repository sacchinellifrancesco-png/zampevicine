export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white p-6 flex justify-center">
      <div className="max-w-[700px] w-full">
        <a href="/iscriviti" className="font-black">← Torna</a>
        <h1 className="text-3xl font-black mt-6">Privacy GDPR - Reg. UE 2016/679</h1>
        <p className="text-sm text-zinc-500 mt-2">Zampe Vicine - Roma - 18/10/2026</p>
        <div className="mt-8 space-y-6 text-[14px] leading-relaxed">
          <p><b>Titolare:</b> Zampe Vicine, privacy@zampevicine.it</p>
          <p><b>1. Dati:</b> nome padrone, email, nome cane, foto, 3 caratteristiche, bio, GPS se dai permesso. In beta restano solo sul tuo telefono in localStorage.</p>
          <p><b>2. Base giuridica:</b> consenso art.6.1.a GDPR per creare profilo e mappa cani vicini.</p>
          <p><b>3. GPS:</b> facoltativo, temporaneo, non salviamo storico. Se neghi, mappa di default.</p>
          <p><b>4. Diritti:</b> accesso, cancellazione, revoca consenso scrivendo a privacy@zampevicine.it. Reclamo al Garante.</p>
          <p><b>5. Minori:</b> servizio vietato sotto i 16 anni.</p>
        </div>
      </div>
    </main>
  )
}
