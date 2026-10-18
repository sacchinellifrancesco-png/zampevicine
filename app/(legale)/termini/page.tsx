export default function Termini() {
  return (
    <main className="min-h-screen bg-white p-6 flex justify-center">
      <div className="max-w-[700px] w-full">
        <a href="/iscriviti" className="font-black">← Torna</a>
        <h1 className="text-3xl font-black mt-6">Termini di Utilizzo e Esonero Responsabilità</h1>
        <p className="text-sm text-zinc-500 mt-1">18 Ottobre 2026 - Zampe Vicine - Roma</p>

        <div className="mt-8 space-y-6 text-[14px] leading-relaxed text-zinc-800">
          <p><b>PREMESSA:</b> Zampe Vicine è bacheca digitale. NON è dog-sitting, custodia, addestramento, veterinario. Mero hosting provider ex art.17 Digital Services Act UE 2022/2065.</p>

          <h2 className="font-black">Art.1 - Oggetto</h2>
          <p>Forniamo mappa per mettere in contatto utenti. Non interveniamo negli incontri.</p>

          <h2 className="font-black">Art.2 - Dichiarazioni</h2>
          <p>Registrandoti dichiari: maggiorenne, proprietario/custode cane, cane vaccinato, microchippato, assicurazione RC, non dichiarato pericoloso ex Ord. Min. Salute.</p>

          <h2 className="font-black">Art.3 - Responsabilità ex art.2052 c.c.</h2>
          <p>Sei esclusivamente responsabile ex art.2052 c.c. per danni causati dal tuo cane a persone, altri cani, cose. Obblighi: guinzaglio max 1,5m, museruola al seguito, raccolta deiezioni, regolamenti Roma Capitale.</p>

          <h2 className="font-black">Art.4 - ESONERO TOTALE CIVILE E PENALE PIATTAFORMA</h2>
          <p>
            Zampe Vicine non organizza, supervisiona, garantisce gli incontri.<br/>
            - Ogni incontro avviene sotto tua esclusiva custodia e rischio.<br/>
            - Non rispondiamo per: morsi, graffi, lesioni, aggressioni tra cani, fughe, smarrimenti, furti, decesso, danni patrimoniali, contagi.<br/>
            - Manlevi e tieni indenne Zampe Vicine da qualsiasi pretesa civile, penale, amministrativa.<br/>
            - Nessun controllo veterinario/comportamentale sui cani iscritti.
          </p>

          <h2 className="font-black">Art.5 - Legge e foro</h2>
          <p>Legge italiana. Foro esclusivo Roma, salvo consumatore.</p>

          <p className="mt-4 p-3 bg-zinc-50 border rounded-xl text-xs font-bold">Accettando, dichiari di aver letto e di assumerti ogni rischio civile e penale derivante dalla custodia del tuo cane durante l'uso dell'app.</p>
        </div>
      </div>
    </main>
  )
}
