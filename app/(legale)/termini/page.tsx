export default function TerminiPage() {
  return (
    <main className="min-h-screen bg-white p-6 flex justify-center">
      <div className="max-w-[700px] w-full">
        <a href="/iscriviti" className="font-black">← Torna</a>
        <h1 className="text-3xl font-black mt-6">Termini e Esonero Responsabilità</h1>
        <div className="mt-8 space-y-6 text-[14px] leading-relaxed">
          <p><b>Art.2 - Dichiarazioni:</b> dichiari di essere maggiorenne e proprietario/custode del cane, con vaccini e microchip in regola. L'assicurazione RC per il cane è facoltativa a livello nazionale, consigliata ma non obbligatoria.</p>
          <p><b>Art.3 - Responsabilità art.2052 c.c.:</b> sei esclusivamente responsabile per danni causati dal tuo cane. Obbligo guinzaglio 1,5m, museruola al seguito, raccolta deiezioni.</p>
          <p><b>Art.4 - ESONERO TOTALE:</b> Zampe Vicine è solo bacheca. Non organizza né supervisiona incontri. Ogni passeggiata avviene sotto tua custodia e rischio.</p>
        </div>
      </div>
    </main>
  )
}
