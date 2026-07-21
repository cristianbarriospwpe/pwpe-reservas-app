import { AdminBusinessSettingsSelector } from "@/components/admin/AdminBusinessSettingsSelector";
import { getAllBusinesses } from "@/services/businesses";

export default async function SettingsPage() {
  const businesses = await getAllBusinesses();

  return (
    <main>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Configurações
      </p>

      <h1 className="text-4xl font-bold">Configurações dos negócios</h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Escolha um negócio para editar informações principais, contato,
        pagamentos e preferências de reserva.
      </p>

      <AdminBusinessSettingsSelector businesses={businesses} />
    </main>
  );
}