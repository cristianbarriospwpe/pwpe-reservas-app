import { bookingStatusLabels } from "../../data/booking-labels";
import { mockBookings } from "../../data/mock-bookings";
import { mockResources } from "../../data/mock-resources";

export default function AdminPage() {
  const pendingBookings = mockBookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const confirmedBookings = mockBookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const activeResources = mockResources.filter(
    (resource) => resource.isActive,
  ).length;

  const blockedDates = 0;

  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Visão geral
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Dashboard
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Neste painel o negócio poderá acompanhar reservas, administrar
          recursos, bloquear disponibilidade e configurar o WhatsApp.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Reservas pendentes</p>
            <p className="mt-3 text-3xl font-bold">{pendingBookings}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Confirmadas</p>
            <p className="mt-3 text-3xl font-bold">{confirmedBookings}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Recursos ativos</p>
            <p className="mt-3 text-3xl font-bold">{activeResources}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Bloqueios</p>
            <p className="mt-3 text-3xl font-bold">{blockedDates}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Últimas reservas</h2>

            <div className="mt-6 space-y-4">
              {mockBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">
                        {booking.customerName}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {booking.resourceName}
                      </p>
                    </div>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                      {bookingStatusLabels[booking.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Recursos cadastrados</h2>

            <div className="mt-6 space-y-4">
              {mockResources.map((resource) => (
                <div
                  key={resource.id}
                  className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">
                        {resource.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        R$ {resource.price.toFixed(2)}
                      </p>
                    </div>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                      {resource.isActive ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}