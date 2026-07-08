import Link from "next/link";
import { BookingStatusActions } from "@/components/admin/BookingStatusActions";
import { BookingStatusBadge } from "@/components/admin/BookingStatusBadge";
import { getBusinessBySlug } from "@/services/businesses";
import { getBookingsByBusinessId } from "@/services/bookings";

export default async function BookingsPage() {
  const business = await getBusinessBySlug("pousada-mar-azul");

  if (!business) {
    return (
      <main>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Reservas
        </p>

        <h1 className="text-4xl font-bold">Negócio não encontrado</h1>

        <p className="mt-4 text-slate-400">
          Não foi possível carregar as reservas porque o negócio não foi
          encontrado.
        </p>
      </main>
    );
  }

  const bookings = await getBookingsByBusinessId(business.id);

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Reservas
          </p>

          <h1 className="text-4xl font-bold">Reservas recebidas</h1>

          <p className="mt-4 text-slate-400">
            Visualize as solicitações e acompanhe o status das reservas.
          </p>
        </div>

        <Link
          href="/admin/bookings/new"
          className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Nova reserva
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
          Nenhuma reserva encontrada.
        </div>
      ) : (
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="px-5 py-4 font-semibold">Cliente</th>
                <th className="px-5 py-4 font-semibold">Recurso</th>
                <th className="px-5 py-4 font-semibold">Datas</th>
                <th className="px-5 py-4 font-semibold">Pessoas</th>
                <th className="px-5 py-4 font-semibold">Total</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Ações</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-white/10">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">
                      {booking.customerName}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {booking.customerPhone}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {booking.resourceName}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    <p>{booking.startDate}</p>
                    {booking.endDate ? (
                      <p className="text-xs text-slate-500">
                        até {booking.endDate}
                      </p>
                    ) : null}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {booking.peopleCount ?? "-"}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {booking.totalPrice
                      ? `R$ ${booking.totalPrice.toFixed(2)}`
                      : "-"}
                  </td>

                  <td className="px-5 py-4">
                    <BookingStatusBadge status={booking.status} />
                  </td>
                  <td className="px-5 py-4">
                    <BookingStatusActions
                      bookingId={booking.id}
                      currentStatus={booking.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}