import { AdminAvailabilityBlockForm } from "@/components/admin/AdminAvailabilityBlockForm";
import { getBusinessBySlug } from "@/services/businesses";
import { getResourcesByBusinessId } from "@/services/resources";

export default async function NewAvailabilityBlockPage() {
  const business = await getBusinessBySlug("pousada-mar-azul");

  if (!business) {
    return (
      <main>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Novo bloqueio
        </p>

        <h1 className="text-4xl font-bold">Negócio não encontrado</h1>

        <p className="mt-4 text-slate-400">
          Não foi possível carregar os dados para criar um novo bloqueio.
        </p>
      </main>
    );
  }

  const resources = await getResourcesByBusinessId(business.id);

  return (
    <main>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Disponibilidade
      </p>

      <h1 className="text-4xl font-bold">Novo bloqueio</h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Marque um período em que um recurso não deve receber reservas.
      </p>

      <AdminAvailabilityBlockForm
        businessId={business.id}
        resources={resources}
      />
    </main>
  );
}