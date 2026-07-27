import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/services/businesses";
import { getBookingsByBusinessId } from "@/services/bookings";
import { getActiveResourcesByBusinessId } from "@/services/resources";

export const dynamic = "force-dynamic";

type AdminDemoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type DemoBooking = {
  id: string;
  resourceName: string;
  customerName: string;
  customerPhone: string;
  customerNotes?: string;
  startDate: string;
  endDate?: string;
  peopleCount?: number;
  status: string;
  totalPrice?: number;
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

function formatBusinessType(value: string) {
  if (value === "pousada") {
    return "Hotel / pousada";
  }

  if (value === "vehicle_rental") {
    return "Aluguel de veículos";
  }

  if (value === "barbershop") {
    return "Barbearia";
  }

  if (value === "tourism") {
    return "Turismo";
  }

  return "Serviço";
}

function formatWhatsApp(value: string) {
  const numbers = value.replace(/\D/g, "");

  if (numbers.length === 13) {
    return `+${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(
      4,
      9,
    )}-${numbers.slice(9)}`;
  }

  if (numbers.length === 12) {
    return `+${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(
      4,
      8,
    )}-${numbers.slice(8)}`;
  }

  return value;
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

  const realBookings: DemoBooking[] = bookings.map((booking) => ({
    id: booking.id,
    resourceName: booking.resourceName,
    customerName: booking.customerName,
    customerPhone: booking.customerPhone,
    customerNotes: booking.customerNotes,
    startDate: booking.startDate,
    endDate: booking.endDate,
    peopleCount: booking.peopleCount,
    status: booking.status,
    totalPrice: booking.totalPrice,
  }));

  const demoBookings: DemoBooking[] = [
    {
      id: "demo-1",
      resourceName: resources[0]?.name ?? "Quarto standard",
      customerName: "Cliente demonstração",
      customerPhone: "(45) 99999-0000",
      customerNotes:
        "Reserva demonstrativa para mostrar como o hotel pode acompanhar uma solicitação recebida pelo site.",
      startDate: "2026-08-09",
      endDate: "2026-08-10",
      peopleCount: 2,
      status: "pending",
      totalPrice: resources[0]?.price ?? 199,
    },
    {
      id: "demo-2",
      resourceName: resources[1]?.name ?? "Quarto duplo",
      customerName: "Família demonstração",
      customerPhone: "(45) 98888-0000",
      customerNotes:
        "Exemplo de reserva confirmada pelo hotel depois do contato com o hóspede.",
      startDate: "2026-08-12",
      endDate: "2026-08-14",
      peopleCount: 3,
      status: "confirmed",
      totalPrice: resources[1]?.price ? resources[1].price * 2 : 440,
    },
  ];

  const displayedBookings = realBookings.length > 0 ? realBookings : demoBookings;

  const totalBookings = displayedBookings.length;
  const pendingBookings = displayedBookings.filter(
    (booking) => booking.status === "pending",
  ).length;
  const confirmedBookings = displayedBookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const estimatedRevenue = displayedBookings.reduce((total, booking) => {
    return total + (booking.totalPrice ?? 0);
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-900">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Painel administrativo demonstrativo
            </p>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              {business.name}
            </h1>

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
              Pedidos recebidos pela página pública.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-slate-400">Pendentes</p>
            <p className="mt-3 text-3xl font-black">{pendingBookings}</p>
            <p className="mt-2 text-xs text-slate-500">
              Aguardando confirmação do hotel.
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
              Valor estimado das reservas.
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black">Reservas</h2>
              <p className="mt-1 text-sm text-slate-400">
                Lista de pedidos recebidos pelo formulário da página pública.
              </p>
            </div>

            <span className="w-fit rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200">
              Visual demonstrativo
            </span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {displayedBookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-3xl border border-white/10 bg-slate-950 p-5"
              >
                <div className="flex flex-col gap-4">
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
                  </div>

                  <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
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
                    <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                      {booking.customerNotes}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Total
                      </p>

                      <p className="mt-1 text-2xl font-black">
                        {formatPrice(booking.totalPrice)}
                      </p>
                    </div>

                    <div className="flex gap-2">
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
                  </div>

                  <p className="text-xs text-slate-500">
                    Botões ilustrativos nesta demo pública.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-2xl font-black">Acomodações</h2>

            <p className="mt-1 text-sm text-slate-400">
              Quartos cadastrados para aparecerem na página pública.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
                {formatWhatsApp(business.whatsapp)}
              </p>

              <p>
                <span className="font-bold text-white">Tipo:</span>{" "}
                {formatBusinessType(business.businessType)}
              </p>

              <p>
                <span className="font-bold text-white">Confirmação:</span>{" "}
                manual pelo painel
              </p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5">
          <h2 className="text-xl font-black text-amber-100">
            O que o cliente poderá fazer
          </h2>

          <div className="mt-4 grid gap-3 text-sm text-amber-50/90 sm:grid-cols-2 lg:grid-cols-5">
            <p>• Ver reservas recebidas pelo site.</p>
            <p>• Confirmar ou cancelar pedidos.</p>
            <p>• Editar quartos, preços e capacidades.</p>
            <p>• Alterar WhatsApp e informações do hotel.</p>
            <p>• Usar a página para receber reservas diretas.</p>
          </div>
        </section>
      </section>
    </main>
  );
}