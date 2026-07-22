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
  "Preparado para Pix manual",
];

const stats = [
  {
    label: "Reservas pendentes",
    value: "12",
  },
  {
    label: "Negócios ativos",
    value: "2",
  },
  {
    label: "Recursos cadastrados",
    value: "6",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-orange-500/10 blur-[120px]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Demo funcional online
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
              PWPE Reservas
            </p>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
              Reservas online simples para pequenos negócios no Brasil.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Uma plataforma para pousadas, barbearias, experiências, serviços
              e aluguel de veículos receberem pedidos de reserva direto pelo
              site e pelo WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pousada-mar-azul"
                className="rounded-2xl bg-cyan-400 px-6 py-3 text-center font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Ver demo pública
              </Link>

              <Link
                href="/admin"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Acessar painel admin
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Reservas online", "Painel protegido", "WhatsApp automático", "Pix em breve"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-300">
                    Painel PWPE
                  </p>
                  <h2 className="mt-1 text-xl font-bold">Dashboard</h2>
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Online
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                {[
                  {
                    name: "Mariana Souza",
                    service: "Suíte casal",
                    status: "Pendente",
                  },
                  {
                    name: "Rafael Lima",
                    service: "Quarto família",
                    status: "Confirmada",
                  },
                  {
                    name: "Lucas Martins",
                    service: "Corte + barba",
                    status: "Pendente",
                  },
                ].map((booking) => (
                  <div
                    key={`${booking.name}-${booking.service}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div>
                      <p className="font-semibold">{booking.name}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {booking.service}
                      </p>
                    </div>

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {demoLinks.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
            >
              <h2 className="text-2xl font-bold">{demo.title}</h2>

              <p className="mt-3 text-slate-400">{demo.description}</p>

              <span className="mt-5 inline-flex text-sm font-bold text-cyan-300 transition group-hover:translate-x-1">
                {demo.label} →
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
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