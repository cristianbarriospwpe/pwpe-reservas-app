import { mockResources } from "../../../data/mock-resources";
import type { PriceUnit, ResourceType } from "../../../types/resource";

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

export default function AdminResourcesPage() {
  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Gestão
            </p>

            <h1 className="text-4xl font-bold">Recursos</h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Aqui serão administradas as acomodações, veículos, serviços ou
              experiências que o negócio oferece para reserva.
            </p>
          </div>

          <a
  href="/admin/resources/new"
  className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
>
  Novo recurso
</a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockResources.map((resource) => (
            <article
              key={resource.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-400">
                    {resourceTypeLabels[resource.resourceType]}
                  </p>

                  <h2 className="mt-3 text-xl font-bold">{resource.name}</h2>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    resource.isActive
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                      : "border-red-400/20 bg-red-400/10 text-red-300"
                  }`}
                >
                  {resource.isActive ? "Ativo" : "Inativo"}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                {resource.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                {resource.capacity ? (
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    Até {resource.capacity} pessoas
                  </span>
                ) : null}

                <span className="rounded-full bg-white/10 px-3 py-1">
                  R$ {resource.price.toFixed(2)} /{" "}
                  {priceUnitLabels[resource.priceUnit]}
                </span>
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
      </section>
    </main>
  );
}