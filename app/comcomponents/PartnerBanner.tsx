export default function PartnerBanner() {
  return (
    <section className="w-full bg-yellow-50 border-y border-yellow-200 py-8 mt-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
          I nostri partner - Fase Pilota
        </p>
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="font-bold">Il tuo negozio / clinica qui?</h3>
            <p className="text-sm text-gray-600">
              Stiamo selezionando 3 partner a Roma per la fase pilota gratuita.
            </p>
          </div>
          <a 
            href="mailto:info@leashlove.it?subject=Diventare Partner LeashLove"
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap"
          >
            Diventa Partner
          </a>
        </div>
      </div>
    </section>
  )
}
