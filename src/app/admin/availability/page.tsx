import { mockAvailabilityBlocks } from "../../../data/mock-availability-blocks";

export default function AdminAvailabilityPage() {
  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Gestão
            </p>

            <h1 className="text-4xl font-bold">Disponibilidade</h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Aqui será possível bloquear datas, horários ou recursos para
              evitar reservas quando não houver disponibilidade.
            </p>
          </div>

          <a
  href="/admin/availability/new"
  className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
>
  Novo bloqueio
</a>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-slate-300">
                <tr>
                  <th className="px-5 py-4 font-medium">Recurso</th>
                  <th className="px-5 py-4 font-medium">Início</th>
                  <th className="px-5 py-4 font-medium">Fim</th>
                  <th className="px-5 py-4 font-medium">Motivo</th>
                  <th className="px-5 py-4 font-medium">Ações</th>
                </tr>
              </thead>

              <tbody>
                {mockAvailabilityBlocks.map((block) => (
                  <tr
                    key={block.id}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">
                        {block.resourceName}
                      </p>
                      <p className="mt-1 text-slate-400">
                        {block.businessName}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {block.startDate}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {block.endDate}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {block.reason}
                    </td>

                    <td className="px-5 py-4">
                      <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                        Remover
                      </button>
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