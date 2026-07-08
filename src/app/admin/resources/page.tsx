import Link from "next/link";
import { ResourceStatusBadge } from "@/components/admin/ResourceStatusBadge";
import { getAllResources } from "@/services/resources";
import type { PriceUnit, ResourceType } from "@/types/resource";

const resourceTypeLabels: Record<ResourceType, string> = {
  accommodation: "Acomodação",
  vehicle: "Veículo",
  service: "Serviço",
  experience: "Experiência",
};

const priceUnitLabels: Record<PriceUnit, string> = {
  night: "noite",
  day: "dia",
  service: "serviço",
  person: "pessoa",
};

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Recursos
          </p>

          <h1 className="text-4xl font-bold">Recursos cadastrados</h1>

          <p className="mt-4 text-slate-400">
            Gerencie acomodações, veículos, serviços ou experiências disponíveis
            para reserva.
          </p>
        </div>

        <Link
          href="/admin/resources/new"
          className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Novo recurso
        </Link>
      </div>

      {resources.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
          Nenhum recurso encontrado.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-400">
                    {resourceTypeLabels[resource.resourceType]}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold">{resource.name}</h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {resource.businessName || "Negócio não informado"}
                  </p>
                </div>

                <ResourceStatusBadge isActive={resource.isActive} />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {resource.description}
              </p>

              <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm">
                <div>
                  <p className="text-slate-500">Capacidade</p>
                  <p className="mt-1 font-semibold text-white">
                    {resource.capacity
                      ? `Até ${resource.capacity} pessoas`
                      : "Não informado"}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Preço</p>
                  <p className="mt-1 font-semibold text-white">
                    R$ {resource.price.toFixed(2)} /{" "}
                    {priceUnitLabels[resource.priceUnit]}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                  Editar
                </button>

                <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                  Ver reservas
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}