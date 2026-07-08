import { AdminResourceForm } from "@/components/admin/AdminResourceForm";
import { getBusinessBySlug } from "@/services/businesses";

export default async function NewResourcePage() {
  const business = await getBusinessBySlug("pousada-mar-azul");

  if (!business) {
    return (
      <main>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Novo recurso
        </p>

        <h1 className="text-4xl font-bold">Negócio não encontrado</h1>

        <p className="mt-4 text-slate-400">
          Não foi possível carregar os dados para criar um novo recurso.
        </p>
      </main>
    );
  }

  return (
    <main>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Recursos
      </p>

      <h1 className="text-4xl font-bold">Novo recurso</h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Cadastre uma acomodação, veículo, serviço ou experiência disponível para
        reservas.
      </p>

      <AdminResourceForm businessId={business.id} />
    </main>
  );
}