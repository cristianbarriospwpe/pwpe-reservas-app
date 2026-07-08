import { AdminBookingForm } from "@/components/admin/AdminBookingForm";
import { getBusinessBySlug } from "@/services/businesses";
import { getActiveResourcesByBusinessId } from "@/services/resources";

export default async function NewBookingPage() {
  const business = await getBusinessBySlug("pousada-mar-azul");

  if (!business) {
    return (
      <main>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Nova reserva
        </p>

        <h1 className="text-4xl font-bold">Negócio não encontrado</h1>

        <p className="mt-4 text-slate-400">
          Não foi possível carregar os dados para criar uma nova reserva.
        </p>
      </main>
    );
  }

  const resources = await getActiveResourcesByBusinessId(business.id);

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

      <AdminBookingForm businessId={business.id} resources={resources} />
    </main>
  );
}