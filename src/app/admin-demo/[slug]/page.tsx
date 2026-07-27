import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/services/businesses";
import { getActiveResourcesByBusinessId } from "@/services/resources";
import { getBookingsByBusinessId } from "@/services/bookings";

export const dynamic = "force-dynamic";

type AdminDemoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(value?: number) {
  if (!value) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value?: string) {
  if (!value) {
    return "Data não informada";
  }

  const date = new Date(`${value}T12:00:00`);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getStatusLabel(status: string) {
  if (status === "confirmed") {
    return "Confirmada";
  }

  if (status === "cancelled") {
    return "Cancelada";
  }

  if (status === "completed") {
    return "Finalizada";
  }

  return "Pendente";
}

function getStatusClasses(status: string) {
  if (status === "confirmed") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  }

  if (status === "cancelled") {
    return "border-red-400/20 bg-red-400/10 text-red-200";
  }

  if (status === "completed") {
    return "border-blue-400/20 bg-blue-400/10 text-blue-200";
  }

  return "border-amber-400/20 bg-amber-400/10 text-amber-200";
}

export default async function AdminDemoPage({ params }: AdminDemoPageProps) {
  const { slug } = await params;

  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const resources = await getActiveResourcesByBusinessId(business.id);
  const bookings = await getBookingsByBusinessId(business.id);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const estimatedRevenue = bookings.reduce((total, booking) => {
    return total + (booking.totalPrice ?? 0);
  }, 0);

  const demoBookings =
    bookings.length > 0
      ? bookings
      : [
          {
            id: "demo-1",
            businessName: business.name,
            resourceName: resources[0]?.name ?? "Quarto standard",
            customerName: "Cliente demonstração",
            customerPhone: "(45) 99999-0000",
            customerNotes:
              "Reserva demonstrativa para mostrar como o painel funciona.",
            bookingType: business.bookingMode,
            startDate: "2026-08-09",
            endDate: "2026-08-10",
            peopleCount: 2,
            status: "pending",
            totalPrice: resources[0]?.price ?? 199,
            createdAt: new Date().toISOString(),
          },
          {
            id: "demo-2",
            businessName: business.name,
            resourceName: resources[1]?.name ?? "Quarto duplo",
            customerName: "Família demonstração",
            customerPhone: "(45) 98888-0000",
            customerNotes: "Exemplo de reserva já confirmada pelo hotel.",
            bookingType: business.bookingMode,
            startDate: "2026-08-12",
            endDate: "2026-08-14",
            peopleCount: 3,
            status: "confirmed",
            totalPrice: resources[1]?.price ? resources[1].price * 2 : 440,
            createdAt: new Date().toISOString(),
          },
        ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-900">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Painel administrativo demonstrativo
            </p>

            <h1 className="mt-2 text-3xl font-black">{business.name}</h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Demonstração visual de como o hotel pode acompanhar reservas,
              quartos, preços e solicitações recebidas pelo site.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${business.slug}`}
              className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Ver página pública
            </Link>

            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-cyan-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-cyan-300"
            >
              WhatsApp do hotel
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-slate-400">
              Reservas recebidas
            </p>
            <p className="mt-3 text-3xl font-black">{totalBookings}</p>
            <p className="mt-2 text-xs text-slate-500">
              Na demo, exemplos aparecem quando ainda não há reservas reais.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-slate-400">Pendentes</p>
            <p className="mt-3 text-3xl font-black">{pendingBookings}</p>
            <p className="mt-2 text-xs text-slate-500">
              Pedidos aguardando confirmação.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-slate-400">Confirmadas</p>
            <p className="mt-3 text-3xl font-black">{confirmedBookings}</p>
            <p className="mt-2 text-xs text-slate-500">
              Reservas aprovadas pelo hotel.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-slate-400">
              Receita estimada
            </p>
            <p className="mt-3 text-3xl font-black">
              {formatPrice(estimatedRevenue)}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Valor estimado das reservas cadastradas.
            </p>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="self-start rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black">Reservas</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Lista de pedidos recebidos pelo formulário da página pública.
                </p>
              </div>

              <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200">
                Visual demonstrativo
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {demoBookings.map((booking) => (
                <article
                  key={booking.id}
                  className="rounded-3xl border border-white/10 bg-slate-950 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-black">
                          {booking.customerName}
                        </h3>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                            booking.status,
                          )}`}
                        >
                          {getStatusLabel(booking.status)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-400">
                        {booking.resourceName}
                      </p>

                      <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                        <p>
                          <span className="font-bold text-white">Entrada:</span>{" "}
                          {formatDate(booking.startDate)}
                        </p>

                        <p>
                          <span className="font-bold text-white">Saída:</span>{" "}
                          {formatDate(booking.endDate)}
                        </p>

                        <p>
                          <span className="font-bold text-white">Pessoas:</span>{" "}
                          {booking.peopleCount ?? "Não informado"}
                        </p>

                        <p>
                          <span className="font-bold text-white">Telefone:</span>{" "}
                          {booking.customerPhone}
                        </p>
                      </div>

                      {booking.customerNotes ? (
                        <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                          {booking.customerNotes}
                        </p>
                      ) : null}
                    </div>

                    <div className="min-w-[180px] rounded-2xl border border-white/10 bg-white/5 p-4 text-left lg:text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Total
                      </p>

                      <p className="mt-2 text-2xl font-black">
                        {formatPrice(booking.totalPrice)}
                      </p>

                      <div className="mt-4 flex flex-col gap-2">
                        <button
                          type="button"
                          className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 opacity-80"
                        >
                          Confirmar
                        </button>

                        <button
                          type="button"
                          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white opacity-80"
                        >
                          Cancelar
                        </button>
                      </div>

                      <p className="mt-3 text-xs text-slate-500">
                        Botões ilustrativos nesta demo pública.
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <h2 className="text-2xl font-black">Acomodações</h2>

              <p className="mt-1 text-sm text-slate-400">
                Quartos cadastrados para aparecerem na página pública.
              </p>

              <div className="mt-5 space-y-3">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="rounded-2xl border border-white/10 bg-slate-950 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black">{resource.name}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Até {resource.capacity ?? "-"} pessoas
                        </p>
                      </div>

                      <p className="text-sm font-black text-cyan-300">
                        {formatPrice(resource.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <h2 className="text-2xl font-black">Informações do hotel</h2>

              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <p>
                  <span className="font-bold text-white">Cidade:</span>{" "}
                  {business.city} - {business.state}
                </p>

                <p>
                  <span className="font-bold text-white">WhatsApp:</span>{" "}
                  {business.whatsapp}
                </p>

                <p>
                  <span className="font-bold text-white">Tipo:</span>{" "}
                  {business.businessType}
                </p>

                <p>
                  <span className="font-bold text-white">Confirmação:</span>{" "}
                  manual pelo painel
                </p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5">
              <h2 className="text-xl font-black text-amber-100">
                O que o cliente poderá fazer
              </h2>

              <ul className="mt-4 space-y-3 text-sm text-amber-50/90">
                <li>• Ver reservas recebidas pelo site.</li>
                <li>• Confirmar ou cancelar pedidos.</li>
                <li>• Editar quartos, preços e capacidades.</li>
                <li>• Alterar WhatsApp e informações do hotel.</li>
                <li>• Usar a página para receber reservas diretas.</li>
              </ul>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}