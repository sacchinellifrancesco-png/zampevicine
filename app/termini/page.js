export default function TerminiPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Torna indietro */}
        <a href="/" className="text-sm text-gray-500 mb-8 inline-block">
          ← Torna alla Home
        </a>

        <h1 className="text-3xl font-bold mb-2">Termini e Condizioni</h1>
        <p className="text-sm text-gray-500 mb-8">
          LeashLove - Progetto Pilota Gratuito<br/>
          Ultimo aggiornamento: 20 Ottobre 2026
        </p>

        <div className="space-y-6 text-gray-800 leading-relaxed">
          <section>
            <h2 className="font-bold text-lg mb-2">1. Natura del progetto</h2>
            <p>
              LeashLove è attualmente un progetto pilota gratuito in fase di test e validazione di mercato. 
              In questa fase il servizio è offerto senza scopo di lucro e non costituisce attività commerciale professionale.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">2. Servizio gratuito</h2>
            <p>
              L'iscrizione, la creazione del profilo del cane e l'utilizzo delle funzionalità sono completamente gratuiti. 
              Nessun pagamento è richiesto agli utenti in questa fase.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">3. Fase di test</h2>
            <p>
              Essendo in fase pilota, la piattaforma può contenere errori, bug o interruzioni temporanee. 
              Le funzionalità possono essere modificate o rimosse in qualsiasi momento per migliorare il servizio.
              Il vostro feedback è fondamentale per noi.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">4. Dati e Privacy</h2>
            <p>
              I dati inseriti (nome, email, dati del cane) sono trattati solo per far funzionare l'app di test, 
              nel rispetto della Privacy Policy. Non verranno venduti a terzi.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">5. Evoluzione futura</h2>
            <p>
              Al termine della fase di test, il progetto potrà evolvere in un'attività commerciale strutturata. 
              In quel caso i presenti Termini verranno aggiornati e vi chiederemo una nuova accettazione.
            </p>
          </section>

          <section className="pt-6 border-t">
            <p className="text-sm text-gray-500">
              Per domande: info@leashlove.it<br/>
              Progetto gestito in fase di test da persona fisica ai sensi della normativa vigente.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
