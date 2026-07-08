import { AdminBusinessSettingsForm } from "@/components/admin/AdminBusinessSettingsForm";
import { getBusinessBySlug } from "@/services/businesses";

export default async function SettingsPage() {
  const business = await getBusinessBySlug("pousada-mar-azul");

  if (!business) {
    return (
      <main>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Configurações
        </p>

        <h1 className="text-4xl font-bold">Negócio não encontrado</h1>

        <p className="mt-4 text-slate-400">
          Não foi possível carregar as configurações do negócio.
        </p>
      </main>
    );
  }

  return (
    <main>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Configurações
      </p>

      <h1 className="text-4xl font-bold">Configurações do negócio</h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Edite informações principais, contato, pagamentos e preferências de
        reserva.
      </p>

      <AdminBusinessSettingsForm business={business} />
    </main>
  );
}