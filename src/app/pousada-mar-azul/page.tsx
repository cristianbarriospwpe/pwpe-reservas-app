import { PublicBookingForm } from "@/components/public/PublicBookingForm";
import { getBusinessBySlug } from "@/services/businesses";
import { getActiveResourcesByBusinessId } from "@/services/resources";
import type { PriceUnit } from "@/types/resource";

const priceUnitLabels: Record<PriceUnit, string> = {
  night: "noite",
  day: "dia",
  service: "serviço",
  person: "pessoa",
};

export default async function PousadaMarAzulPage() {
  const business = await getBusinessBySlug("pousada-mar-azul");

  if (!business) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <section className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            PWPE Reservas
          </p>

          <h1 className="text-4xl font-bold">Negócio não encontrado</h1>

          <p className="mt-4 text-slate-300">
            Não foi possível carregar as informações deste negócio.
          </p>
        </section>
      </main>
    );
  }

  const activeResources = await getActiveResourcesByBusinessId(business.id);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Pousada em {business.city}
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            {business.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {business.description} Consulte disponibilidade e solicite sua
            reserva diretamente pelo WhatsApp.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#reserva"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Solicitar reserva
            </a>

            <a
              href="#acomodacoes"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver acomodações
            </a>
          </div>
        </div>
      </section>

      <section id="acomodacoes" className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
          Acomodações
        </p>

        <h2 className="text-3xl font-bold">Escolha sua acomodação</h2>

        <p className="mt-4 max-w-2xl text-slate-600">
          As acomodações agora são carregadas diretamente do Supabase.
        </p>

        {activeResources.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            Nenhuma acomodação disponível no momento.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {activeResources.map((resource) => (
              <article
                key={resource.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {resource.capacity ? (
                  <p className="text-sm font-semibold text-cyan-600">
                    Até {resource.capacity} pessoas
                  </p>
                ) : null}

                <h3 className="mt-3 text-xl font-bold">{resource.name}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {resource.description}
                </p>

                <p className="mt-5 text-lg font-bold">
                  R$ {resource.price.toFixed(2)} /{" "}
                  {priceUnitLabels[resource.priceUnit]}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="reserva" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
            Reserva
          </p>

          <h2 className="text-3xl font-bold">Solicitar reserva</h2>

          <p className="mt-4 max-w-2xl text-slate-600">
            Preencha os dados abaixo para abrir uma mensagem pronta no WhatsApp
            da pousada.
          </p>

          <PublicBookingForm
  businessId={business.id}
  businessName={business.name}
  businessWhatsapp={business.whatsapp}
  resources={activeResources}
/>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{business.name}</p>
          <p>{business.address}</p>
          <p>WhatsApp: {business.whatsapp}</p>
        </div>
      </footer>
    </main>
  );
}