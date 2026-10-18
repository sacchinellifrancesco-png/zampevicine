export default function TerminiPage() {
  return (
    <main className="min-h-screen bg-white p-6 flex justify-center">
      <div className="max-w-[700px] w-full">
        <a href="/iscriviti" className="font-black">← Torna</a>
        <h1 className="text-3xl font-black mt-6">Termini e Esonero Responsabilità</h1>
        <p className="text-sm text-zinc-500 mt-2">Zampe Vicine - Roma - 18/10/2026</p>
        <div className="mt-8 space-y-6 text-[14px] leading-relaxed">
          <p><b>PREMESSA:</b> Zampe Vicine è solo bacheca digitale. Non è dog-sitting, custodia, addestramento. Hosting provider ex art.17 DSA UE.</p>
          <p><b>Art.2 - Dichiarazioni:</b> dichiari di essere maggiorenne, proprietario del cane, con vaccini, microchip, assicurazione RC in regola.</p>
          <p><b>Art.3 - Responsabilità art.2052 c.c.:</b> sei esclusivamente responsabile per danni causati dal tuo cane. Obbligo guinzaglio 1,5m, museruola al seguito, raccolta deiezioni.</p>
          <p><b>Art.4 - ESONERO TOTALE:</b> Zampe Vicine non organizza né supervisiona incontri. Ogni passeggiata avviene sotto tua custodia e rischio. Non rispondiamo per morsi, lesioni, aggressioni tra cani, fughe, smarrimenti. Manlevi Zampe Vicine da ogni richiesta civile, penale, amministrativa.</p>
          <p><b>Art.5 - Foro:</b> legge italiana, foro Roma.</p>
          <div className="p-3 bg-zinc-50 border rounded-xl font-bold text-xs">Accettando assumi ogni rischio civile e penale per la custodia del cane durante l'uso dell'app.</div>
        </div>
      </div>
    </main>
  )
}
