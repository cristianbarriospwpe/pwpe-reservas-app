import Link from "next/link";
import { ResourceStatusBadge } from "@/components/admin/ResourceStatusBadge";
import { getAllResources } from "@/services/resources";

export const dynamic = "force-dynamic";

const resourceTypeLabels = {
  accommodation: "Acomodação",
  vehicle: "Veículo",
  service: "Serviço",
  experience: "Experiência",
};

const priceUnitLabels = {
  night: "noite",
  day: "dia",
  service: "serviço",
  person: "pessoa",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Recursos
          </p>

          <h1 className="text-4xl font-bold">Recursos cadastrados</h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Gerencie acomodações, veículos, serviços ou experiências disponíveis
            para reserva.
          </p>
        </div>

        <Link
          href="/admin/resources/new"
          className="rounded-2xl bg-cyan-400 px-5 py-3 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Novo recurso
        </Link>
      </div>

      {resources.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-400">
          Nenhum recurso cadastrado ainda.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-cyan-400">
                    {resourceTypeLabels[resource.resourceType]}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold">{resource.name}</h2>

                  <p className="mt-3 text-sm text-slate-400">
                    {resource.businessName}
                  </p>
                </div>

                <ResourceStatusBadge isActive={resource.isActive} />
              </div>

              <p className="mt-5 min-h-12 text-sm leading-6 text-slate-400">
                {resource.description}
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div>
                  <p className="text-sm text-slate-400">Capacidade</p>

                  <p className="mt-1 font-semibold text-white">
                    {resource.capacity
                      ? `Até ${resource.capacity} pessoas`
                      : "Não informada"}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-slate-400">Preço</p>

                  <p className="mt-1 font-semibold text-white">
                    {formatPrice(resource.price)} /{" "}
                    {priceUnitLabels[resource.priceUnit]}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/admin/resources/${resource.id}/edit`}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Editar
                </Link>

                <Link
                  href="/admin/bookings"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Ver reservas
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}