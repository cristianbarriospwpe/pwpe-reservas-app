import { AdminBookingForm } from "@/components/admin/AdminBookingForm";
import { getAllBusinesses } from "@/services/businesses";

export default async function NewBookingPage() {
  const businesses = await getAllBusinesses();

  return (
    <main>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Reservas
      </p>

      <h1 className="text-4xl font-bold">Nova reserva</h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Cadastre manualmente uma reserva recebida por WhatsApp, telefone,
        Instagram ou atendimento presencial.
      </p>

      {businesses.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
          Nenhum negócio encontrado para criar reservas.
        </div>
      ) : (
        <AdminBookingForm businesses={businesses} />
      )}
    </main>
  );
}