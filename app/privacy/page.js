export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-sm text-gray-500 mb-8 inline-block">
          ← Torna alla Home
        </a>

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">
          Ultimo aggiornamento: 20 Ottobre 2026 - LeashLove fase pilota
        </p>

        <div className="space-y-6 text-gray-800 leading-relaxed text-[15px]">
          <section className="bg-gray-50 p-4 rounded-xl">
            <h2 className="font-bold mb-2">Titolare del Trattamento</h2>
            <p>
              <strong>Francesco Sacchinelli</strong><br/>
              Codice Fiscale: <strong>SCCFNC82H29L117G</strong><br/>
              Email: info@leashlove.it (in attivazione)<br/>
              Progetto pilota gratuito - non attività commerciale
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">1. Quali dati raccogliamo</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Nome, email, password (tramite Supabase Auth)</li>
              <li>Dati del cane: nome, foto, razza, età</li>
              <li>Dati di navigazione tecnici (log, cookie tecnici)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">2. Perché li raccogliamo</h2>
            <p>
              Solo per far funzionare l'app in fase di test: creare il tuo account, 
              mostrare il profilo del tuo cane, farti trovare altri proprietari vicini. 
              Base giuridica: tuo consenso e esecuzione del servizio richiesto.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">3. Dove sono i dati</h2>
            <p>
              I dati sono salvati su Supabase (UE/US) con misure di sicurezza. 
              Non vendiamo i tuoi dati a nessuno.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">4. Per quanto tempo</h2>
            <p>
              Per tutta la durata della fase pilota. Puoi chiedere la cancellazione in qualsiasi momento scrivendoci. 
              Se il progetto chiude, cancelliamo tutto.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">5. I tuoi diritti (GDPR)</h2>
            <p>
              Hai diritto di accedere, correggere, cancellare i tuoi dati. 
              Per esercitarli scrivi a info@leashlove.it. Puoi anche fare reclamo al Garante Privacy.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">6. Cookie</h2>
            <p>
              Usiamo solo cookie tecnici necessari per il login. Niente cookie di profilazione o pubblicità in questa fase pilota.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
