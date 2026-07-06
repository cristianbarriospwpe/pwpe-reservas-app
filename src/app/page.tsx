export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          PWPE Reservas
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Sistema de reservas diretas para pequenos negócios
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Uma aplicação configurável para pousadas, aluguel de veículos,
          barbearias, experiências turísticas e serviços com agenda.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/pousada-mar-azul"
            className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Ver demo pública
          </a>

          <a
            href="/admin"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Acessar painel admin
          </a>
        </div>
      </section>
    </main>
  );
}