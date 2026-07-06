import { supabase } from "@/lib/supabase";
import { mapBusinessRowToBusiness } from "@/mappers/business";
import type { BusinessRow } from "@/types/business";

export default async function BusinessTestPage() {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", "pousada-mar-azul")
    .single<BusinessRow>();

  if (error) {
    return (
      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            Supabase
          </p>

          <h1 className="text-4xl font-bold">Erro ao carregar negócio</h1>

          <pre className="mt-6 overflow-x-auto rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-sm text-red-200">
            {JSON.stringify(error, null, 2)}
          </pre>
        </section>
      </main>
    );
  }

  const business = mapBusinessRowToBusiness(data);

  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Supabase
        </p>

        <h1 className="text-4xl font-bold">Negócio carregado</h1>

        <p className="mt-4 text-slate-300">
          Esta página lê o negócio diretamente da tabela businesses.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Nome</p>
          <p className="mt-2 text-xl font-bold text-white">{business.name}</p>

          <p className="mt-6 text-sm text-slate-400">Slug</p>
          <p className="mt-2 text-white">{business.slug}</p>

          <p className="mt-6 text-sm text-slate-400">Tipo de negócio</p>
          <p className="mt-2 text-white">{business.businessType}</p>

          <p className="mt-6 text-sm text-slate-400">Tipo de reserva</p>
          <p className="mt-2 text-white">{business.bookingMode}</p>

          <p className="mt-6 text-sm text-slate-400">WhatsApp</p>
          <p className="mt-2 text-white">{business.whatsapp}</p>

          <p className="mt-6 text-sm text-slate-400">Cidade</p>
          <p className="mt-2 text-white">
            {business.city}, {business.state}
          </p>
        </div>
      </section>
    </main>
  );
}