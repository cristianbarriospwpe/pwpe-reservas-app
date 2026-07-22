"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Resource } from "@/types/resource";
import { updateResource } from "@/services/resources";

type AdminResourceEditFormProps = {
  resource: Resource;
};

export function AdminResourceEditForm({ resource }: AdminResourceEditFormProps) {
  const router = useRouter();

  const [name, setName] = useState(resource.name);
  const [description, setDescription] = useState(resource.description);
  const [capacity, setCapacity] = useState(String(resource.capacity ?? ""));
  const [price, setPrice] = useState(String(resource.price));
  const [isActive, setIsActive] = useState(resource.isActive);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Informe o nome da acomodação.");
      return;
    }

    if (!price || Number(price) < 0) {
      setErrorMessage("Informe um preço válido.");
      return;
    }

    try {
      setIsSaving(true);

      await updateResource({
        id: resource.id,
        name: name.trim(),
        description: description.trim(),
        capacity: capacity ? Number(capacity) : undefined,
        price: Number(price),
        isActive,
      });

      setSuccessMessage("Acomodação atualizada com sucesso.");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Não foi possível salvar as alterações. Tente novamente.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      {errorMessage ? (
        <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mb-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
          {successMessage}
        </div>
      ) : null}

      <div className="grid gap-5">
        <div>
          <label className="text-sm font-semibold text-slate-300">
            Nome da acomodação
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            Descrição
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              Capacidade
            </label>

            <input
              type="number"
              min="1"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300">
              Preço
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            className="h-4 w-4"
          />

          <span className="text-sm font-semibold text-slate-300">
            Acomodação ativa
          </span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar alterações"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/resources")}
            className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/10"
          >
            Voltar
          </button>
        </div>
      </div>
    </form>
  );
}