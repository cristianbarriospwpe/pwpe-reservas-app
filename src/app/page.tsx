import Link from "next/link";

const demoLinks = [
  {
    title: "Pousada Mar Azul",
    description:
      "Demonstração para pousadas, hospedagens e acomodações com reservas por período.",
    href: "/pousada-mar-azul",
    label: "Ver demo da pousada",
  },
  {
    title: "Barbearia do João",
    description:
      "Demonstração para barbearias, salões e serviços com agendamento por horário.",
    href: "/barbearia-do-joao",
    label: "Ver demo da barbearia",
  },
];

const features = [
  "Página pública para receber reservas",
  "Painel administrativo protegido",
  "Cadastro de recursos, serviços e acomodações",
  "Bloqueios de disponibilidade",
  "Envio automático para WhatsApp",
  "Preparado para Pix manual e futuras integrações",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            PWPE Reservas
          </p>

          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
            Sistema de reservas online para pequenos negócios no Brasil.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Uma plataforma simples para pousadas, barbearias, experiências,
            serviços e aluguel de veículos receberem pedidos de reserva direto
            pelo site e pelo WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pousada-mar-azul"
              className="rounded-2xl bg-cyan-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Ver demo pública
            </Link>

            <Link
              href="/admin"
              className="rounded-2xl border border-white/10 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
            >
              Acessar painel admin
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {demoLinks.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
            >
              <h2 className="text-2xl font-bold">{demo.title}</h2>

              <p className="mt-3 text-slate-400">{demo.description}</p>

              <span className="mt-5 inline-flex text-sm font-bold text-cyan-300">
                {demo.label} →
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">O que esta demo já faz</h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}