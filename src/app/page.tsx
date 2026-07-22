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

const targetBusinesses = [
  {
    title: "Pousadas e hospedagens",
    description:
      "Receba pedidos de reserva por período, organize acomodações e bloqueie datas indisponíveis.",
  },
  {
    title: "Barbearias e salões",
    description:
      "Permita que clientes solicitem horários para serviços como corte, barba e atendimento personalizado.",
  },
  {
    title: "Aluguel de veículos",
    description:
      "Gerencie pedidos para carros, motos, buggys, bicicletas e outros recursos alugados por dia.",
  },
  {
    title: "Passeios e experiências",
    description:
      "Venda passeios turísticos, experiências locais e atividades com confirmação pelo WhatsApp.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "O cliente solicita a reserva",
    description:
      "Ele acessa a página pública do negócio, escolhe data, serviço ou acomodação e envia o pedido.",
  },
  {
    step: "02",
    title: "O negócio recebe no painel",
    description:
      "A reserva aparece no painel administrativo e também pode abrir uma conversa direto no WhatsApp.",
  },
  {
    step: "03",
    title: "A reserva é confirmada",
    description:
      "O responsável confirma, cancela ou conclui a reserva com controle simples de status.",
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
              {[
                "Reservas online",
                "Painel protegido",
                "WhatsApp automático",
                "Pix em breve",
              ].map((item) => (
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

        <section className="mt-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Para quem é
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Um sistema flexível para vários tipos de negócio.
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              A mesma base pode ser adaptada para negócios que trabalham com
              reservas por data, período ou horário.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {targetBusinesses.map((business) => (
              <div
                key={business.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40 hover:bg-white/10"
              >
                <h3 className="text-xl font-bold">{business.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {business.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                Como funciona
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Da solicitação até a confirmação.
              </h2>
            </div>

            <Link
              href="/admin"
              className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Ver painel admin
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-white/10 bg-slate-950/60 p-6"
              >
                <span className="text-sm font-black text-cyan-300">
                  {item.step}
                </span>

                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

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
        <section className="mt-10 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8 backdrop-blur sm:p-10">
  <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        Próximo passo
      </p>

      <h2 className="mt-4 max-w-2xl text-3xl font-black sm:text-4xl">
        Quer uma página de reservas para o seu negócio?
      </h2>

      <p className="mt-4 max-w-2xl text-slate-300">
        A PWPE pode preparar uma demo personalizada para pousadas, barbearias,
        passeios, aluguel de veículos ou serviços com agenda.
      </p>
    </div>

    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
      <a
        href="https://wa.me/5522992231382?text=Ol%C3%A1%2C%20quero%20uma%20demo%20da%20PWPE%20Reservas%20para%20meu%20neg%C3%B3cio."
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl bg-cyan-400 px-6 py-3 text-center font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
      >
        Falar pelo WhatsApp
      </a>

      <Link
        href="/admin"
        className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
      >
        Ver painel admin
      </Link>
    </div>
  </div>
</section>
      </section>
    </main>
  );
}