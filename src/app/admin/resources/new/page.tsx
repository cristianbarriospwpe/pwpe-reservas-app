import { AdminResourceForm } from "@/components/admin/AdminResourceForm";
import { getAllBusinesses } from "@/services/businesses";

export default async function NewResourcePage() {
  const businesses = await getAllBusinesses();

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

      {businesses.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
          Nenhum negócio encontrado para criar recursos.
        </div>
      ) : (
        <AdminResourceForm businesses={businesses} />
      )}
    </main>
  );
}