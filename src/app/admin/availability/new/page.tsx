import { AdminAvailabilityBlockForm } from "@/components/admin/AdminAvailabilityBlockForm";
import { getAllBusinesses } from "@/services/businesses";

export default async function NewAvailabilityBlockPage() {
  const businesses = await getAllBusinesses();

  return (
    <main>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Disponibilidade
      </p>

      <h1 className="text-4xl font-bold">Novo bloqueio</h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Marque um período ou horário em que um recurso não deve receber
        reservas.
      </p>

      {businesses.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
          Nenhum negócio encontrado para criar bloqueios.
        </div>
      ) : (
        <AdminAvailabilityBlockForm businesses={businesses} />
      )}
    </main>
  );
}