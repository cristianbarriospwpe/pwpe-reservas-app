import { BookingStatusBadge } from "@/components/admin/BookingStatusBadge";
import { ResourceStatusBadge } from "@/components/admin/ResourceStatusBadge";
import { StatCard } from "@/components/admin/StatCard";
import { mockAvailabilityBlocks } from "@/data/mock-availability-blocks";
import { getBookingsByBusinessId } from "@/services/bookings";
import { getBusinessBySlug } from "@/services/businesses";
import { getResourcesByBusinessId } from "@/services/resources";

export default async function AdminDashboardPage() {
  const business = await getBusinessBySlug("pousada-mar-azul");

  if (!business) {
    return (
      <main>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Dashboard
        </p>

        <h1 className="text-4xl font-bold">Negócio não encontrado</h1>

        <p className="mt-4 text-slate-400">
          Não foi possível carregar as informações do painel administrativo.
        </p>
      </main>
    );
  }

  const bookings = await getBookingsByBusinessId(business.id);
  const resources = await getResourcesByBusinessId(business.id);

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const activeResources = resources.filter((resource) => resource.isActive).length;

  const blockedDates = mockAvailabilityBlocks.length;

  return (
    <main>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Dashboard
      </p>

      <h1 className="text-4xl font-bold">Visão geral</h1>

      <p className="mt-4 text-slate-400">
        Acompanhe reservas, recursos cadastrados e bloqueios de disponibilidade
        de {business.name}.
      </p>

      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Reservas pendentes" value={pendingBookings} />
        <StatCard label="Confirmadas" value={confirmedBookings} />
        <StatCard label="Recursos ativos" value={activeResources} />
        <StatCard label="Bloqueios" value={blockedDates} />
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">Últimas reservas</h2>

          <div className="mt-6 space-y-4">
            {bookings.length === 0 ? (
              <p className="text-sm text-slate-400">
                Nenhuma reserva encontrada.
              </p>
            ) : (
              bookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{booking.customerName}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {booking.resourceName}
                      </p>
                    </div>

                    <BookingStatusBadge status={booking.status} />
                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    {booking.startDate}
                    {booking.endDate ? ` até ${booking.endDate}` : ""}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">Recursos cadastrados</h2>

          <div className="mt-6 space-y-4">
            {resources.length === 0 ? (
              <p className="text-sm text-slate-400">
                Nenhum recurso encontrado.
              </p>
            ) : (
              resources.slice(0, 3).map((resource) => (
                <div
                  key={resource.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{resource.name}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        R$ {resource.price.toFixed(2)}
                      </p>
                    </div>

                    <ResourceStatusBadge isActive={resource.isActive} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}