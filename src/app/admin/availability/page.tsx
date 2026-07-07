import Link from "next/link";
import { getAvailabilityBlocksByBusinessId } from "@/services/availability";
import { getBusinessBySlug } from "@/services/businesses";

export default async function AvailabilityPage() {
  const business = await getBusinessBySlug("pousada-mar-azul");

  if (!business) {
    return (
      <main>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Disponibilidade
        </p>

        <h1 className="text-4xl font-bold">Negócio não encontrado</h1>

        <p className="mt-4 text-slate-400">
          Não foi possível carregar os bloqueios porque o negócio não foi
          encontrado.
        </p>
      </main>
    );
  }

  const availabilityBlocks = await getAvailabilityBlocksByBusinessId(
    business.id,
  );

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Disponibilidade
          </p>

          <h1 className="text-4xl font-bold">Bloqueios de disponibilidade</h1>

          <p className="mt-4 text-slate-400">
            Marque períodos em que um recurso não deve receber reservas.
          </p>
        </div>

        <Link
          href="/admin/availability/new"
          className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Novo bloqueio
        </Link>
      </div>

      {availabilityBlocks.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
          Nenhum bloqueio encontrado.
        </div>
      ) : (
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="px-5 py-4 font-semibold">Recurso</th>
                <th className="px-5 py-4 font-semibold">Início</th>
                <th className="px-5 py-4 font-semibold">Fim</th>
                <th className="px-5 py-4 font-semibold">Motivo</th>
                <th className="px-5 py-4 font-semibold">Ações</th>
              </tr>
            </thead>

            <tbody>
              {availabilityBlocks.map((block) => (
                <tr key={block.id} className="border-t border-white/10">
                  <td className="px-5 py-4 font-semibold text-white">
                    {block.resourceName}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {block.startDate}
                  </td>

                  <td className="px-5 py-4 text-slate-300">{block.endDate}</td>

                  <td className="px-5 py-4 text-slate-300">
                    {block.reason || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10">
                      Editar
                    </button>
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