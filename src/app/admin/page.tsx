export default function AdminPage() {
  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Resumen general
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Dashboard
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Desde este panel el negocio podrá ver reservas, administrar recursos,
          bloquear disponibilidad y configurar WhatsApp.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Reservas pendientes</p>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Confirmadas</p>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Recursos activos</p>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Bloqueos</p>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>
        </div>
      </section>
    </main>
  );
}