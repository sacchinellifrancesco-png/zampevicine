export default function Privacy() {
  return (
    <main className="min-h-screen bg-white p-6 flex justify-center">
      <div className="max-w-[700px] w-full">
        <a href="/iscriviti" className="font-black">← Torna</a>
        <h1 className="text-3xl font-black mt-6">Informativa Privacy - GDPR Reg. UE 2016/679</h1>
        <p className="text-sm text-zinc-500 mt-1">Ultimo aggiornamento: 18 Ottobre 2026 - Zampe Vicine</p>

        <div className="mt-8 space-y-6 text-[14px] leading-relaxed text-zinc-800">
          <p><b>Titolare:</b> Zampe Vicine - privacy@zampevicine.it - Roma, RM.</p>
          
          <h2 className="font-black text-base mt-6">1. Dati trattati</h2>
          <p>Nome padrone, email, nome cane, foto, 3 caratteristiche (taglia, energia, indole), bio, posizione GPS se autorizzi. In fase beta i dati restano sul tuo telefono in localStorage, non su nostro server.</p>

          <h2 className="font-black text-base">2. Finalità e base giuridica</h2>
          <p>Base: consenso art.6.1.a GDPR. Finalità: creare profilo pubblico cane, mostrare cani vicini in mappa, organizzare passeggiate tra utenti.</p>

          <h2 className="font-black text-base">3. GPS</h2>
          <p>Facoltativo, temporaneo, non tracciato. Non salviamo storico posizioni. Se neghi, la mappa usa posizione di default. Puoi revocare dalle impostazioni browser.</p>

          <h2 className="font-black text-base">4. Diritti</h2>
          <p>Accesso, rettifica, cancellazione, portabilità, revoca consenso scrivendo a privacy@zampevicine.it. Reclamo al Garante Privacy.</p>

          <h2 className="font-black text-base">5. Minori</h2>
          <p>Vietato sotto i 16 anni. Dichiarando ti registri dichiari di essere maggiorenne.</p>
        </div>
      </div>
    </main>
  )
}
