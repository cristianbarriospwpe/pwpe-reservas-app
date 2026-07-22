import { notFound } from "next/navigation";
import { AdminResourceEditForm } from "@/components/admin/AdminResourceEditForm";
import { getResourceById } from "@/services/resources";

export const dynamic = "force-dynamic";

type ResourceEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResourceEditPage({
  params,
}: ResourceEditPageProps) {
  const { id } = await params;

  const resource = await getResourceById(id);

  if (!resource) {
    notFound();
  }

  return (
    <main>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Recursos
      </p>

      <h1 className="text-4xl font-bold">Editar acomodação</h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Altere nome, descrição, capacidade, preço e status da acomodação.
      </p>

      <AdminResourceEditForm resource={resource} />
    </main>
  );
}