export default function PousadaMarAzulPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
          Demo pública
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Pousada Mar Azul
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Página pública de ejemplo para una pousada simple. Más adelante esta
          información va a venir desde la base de datos.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Solicitar reserva</h2>

          <p className="mt-3 text-slate-600">
            Acá vamos a construir el formulario con fechas, cantidad de personas
            y envío por WhatsApp.
          </p>
        </div>
      </section>
    </main>
  );
}