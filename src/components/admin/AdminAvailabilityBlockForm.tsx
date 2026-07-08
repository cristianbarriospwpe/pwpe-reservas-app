"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createAvailabilityBlock } from "@/services/availability";
import { hasBookingConflict } from "@/services/bookings";
import type { Resource } from "@/types/resource";

type AdminAvailabilityBlockFormProps = {
  businessId: string;
  resources: Resource[];
};

export function AdminAvailabilityBlockForm({
  businessId,
  resources,
}: AdminAvailabilityBlockFormProps) {
  const router = useRouter();

  const [resourceId, setResourceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    if (!resourceId || !startDate || !endDate || !reason) {
      setErrorMessage("Preencha todos os campos antes de salvar o bloqueio.");
      return;
    }

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (end <= start) {
      setErrorMessage("A data final deve ser depois da data inicial.");
      return;
    }

    setIsSubmitting(true);

    const conflict = await hasBookingConflict({
      resourceId,
      startDate,
      endDate,
    });

    if (conflict) {
      setIsSubmitting(false);
      setErrorMessage(
        "Este período já possui reserva ou bloqueio para o recurso selecionado.",
      );
      return;
    }

    const blockCreated = await createAvailabilityBlock({
      businessId,
      resourceId,
      startDate,
      endDate,
      reason,
    });

    setIsSubmitting(false);

    if (!blockCreated) {
      setErrorMessage(
        "Não foi possível salvar o bloqueio. Tente novamente em alguns instantes.",
      );
      return;
    }

    router.push("/admin/availability");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div>
        <label className="text-sm font-semibold text-slate-300">Recurso</label>

        <select
          value={resourceId}
          onChange={(event) => setResourceId(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        >
          <option value="">Selecione um recurso</option>

          {resources.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-300">
            Data inicial
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            Data final
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-300">Motivo</label>

        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          placeholder="Ex: Manutenção, reforma, indisponível, folga..."
        />
      </div>

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
          {isSubmitting ? "Salvando..." : "Salvar bloqueio"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/availability")}
          className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}