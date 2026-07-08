"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createResource } from "@/services/resources";
import type { PriceUnit, ResourceType } from "@/types/resource";

type AdminResourceFormProps = {
  businessId: string;
};

export function AdminResourceForm({ businessId }: AdminResourceFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] =
    useState<ResourceType>("accommodation");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState<PriceUnit>("night");
  const [isActive, setIsActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    if (!name || !description || !resourceType || !price || !priceUnit) {
      setErrorMessage("Preencha os campos obrigatórios antes de salvar.");
      return;
    }

    const numericPrice = Number(price);
    const numericCapacity = capacity ? Number(capacity) : undefined;

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      setErrorMessage("Informe um preço válido.");
      return;
    }

    if (
      capacity &&
      (Number.isNaN(numericCapacity) || Number(numericCapacity) < 1)
    ) {
      setErrorMessage("Informe uma capacidade válida.");
      return;
    }

    setIsSubmitting(true);

    const resourceCreated = await createResource({
      businessId,
      name,
      description,
      resourceType,
      capacity: numericCapacity,
      price: numericPrice,
      priceUnit,
      isActive,
    });

    setIsSubmitting(false);

    if (!resourceCreated) {
      setErrorMessage(
        "Não foi possível salvar o recurso. Tente novamente em alguns instantes.",
      );
      return;
    }

    router.push("/admin/resources");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-300">
            Nome do recurso
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="Ex: Suíte premium"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            Tipo de recurso
          </label>

          <select
            value={resourceType}
            onChange={(event) =>
              setResourceType(event.target.value as ResourceType)
            }
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="accommodation">Acomodação</option>
            <option value="vehicle">Veículo</option>
            <option value="service">Serviço</option>
            <option value="experience">Experiência</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-300">
          Descrição
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          placeholder="Descreva o recurso de forma clara para o cliente."
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
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
            placeholder="Ex: 2"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">Preço</label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="Ex: 250"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            Unidade do preço
          </label>

          <select
            value={priceUnit}
            onChange={(event) => setPriceUnit(event.target.value as PriceUnit)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="night">Noite</option>
            <option value="day">Dia</option>
            <option value="service">Serviço</option>
            <option value="person">Pessoa</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(event) => setIsActive(event.target.checked)}
          className="h-4 w-4"
        />

        Recurso ativo e visível para reservas
      </label>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-300">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Salvando..." : "Salvar recurso"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/resources")}
          className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}