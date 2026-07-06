import {
  bookingStatusLabels,
  bookingStatusStyles,
} from "../../../data/booking-labels";
import { mockBookings } from "../../../data/mock-bookings";

export default function AdminBookingsPage() {
  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Gestão
            </p>

            <h1 className="text-4xl font-bold">Reservas</h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Aqui o negócio poderá acompanhar solicitações de reserva,
              confirmar, cancelar e revisar detalhes.
            </p>
          </div>

          <a
  href="/admin/bookings/new"
  className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
>
  Nova reserva
</a>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-slate-300">
                <tr>
                  <th className="px-5 py-4 font-medium">Cliente</th>
                  <th className="px-5 py-4 font-medium">Recurso</th>
                  <th className="px-5 py-4 font-medium">Datas</th>
                  <th className="px-5 py-4 font-medium">Pessoas</th>
                  <th className="px-5 py-4 font-medium">Total</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {mockBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">
                        {booking.customerName}
                      </p>
                      <p className="mt-1 text-slate-400">
                        {booking.customerPhone}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {booking.resourceName}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {booking.startDate}
                      {booking.endDate ? ` até ${booking.endDate}` : ""}
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
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          bookingStatusStyles[booking.status]
                        }`}
                      >
                        {bookingStatusLabels[booking.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}