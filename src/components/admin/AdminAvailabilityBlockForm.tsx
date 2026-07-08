"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAvailabilityBlock } from "@/services/availability";
import { hasBookingConflict, hasTimeSlotConflict } from "@/services/bookings";
import { getResourcesByBusinessId } from "@/services/resources";
import type { Business } from "@/types/business";
import type { Resource } from "@/types/resource";

type AdminAvailabilityBlockFormProps = {
  businesses: Business[];
};

export function AdminAvailabilityBlockForm({
  businesses,
}: AdminAvailabilityBlockFormProps) {
  const router = useRouter();

  const [businessId, setBusinessId] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceId, setResourceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingResources, setIsLoadingResources] = useState(false);

  const selectedBusiness = businesses.find(
    (business) => business.id === businessId,
  );

  const isPeriodBooking = selectedBusiness?.bookingMode === "period";
  const isTimeSlotBooking = selectedBusiness?.bookingMode === "time_slot";

  useEffect(() => {
    async function loadResources() {
      if (!businessId) {
        setResources([]);
        setResourceId("");
        return;
      }

      setIsLoadingResources(true);

      const businessResources = await getResourcesByBusinessId(businessId);

      setResources(businessResources);
      setResourceId("");
      setIsLoadingResources(false);
    }

    loadResources();
  }, [businessId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    if (!businessId || !resourceId || !startDate || !reason) {
      setErrorMessage("Preencha os campos obrigatórios antes de salvar.");
      return;
    }

    if (!selectedBusiness) {
      setErrorMessage("Selecione um negócio válido.");
      return;
    }

    if (isPeriodBooking && !endDate) {
      setErrorMessage("Informe a data final do bloqueio.");
      return;
    }

    if (isTimeSlotBooking && !startTime) {
      setErrorMessage("Informe o horário do bloqueio.");
      return;
    }

    if (isPeriodBooking) {
      const start = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T00:00:00`);

      if (end <= start) {
        setErrorMessage("A data final deve ser depois da data inicial.");
        return;
      }
    }

    setIsSubmitting(true);

    const conflict = isPeriodBooking
      ? await hasBookingConflict({
          resourceId,
          startDate,
          endDate,
        })
      : await hasTimeSlotConflict({
          resourceId,
          startDate,
          startTime,
        });

    if (conflict) {
      setIsSubmitting(false);
      setErrorMessage(
        isPeriodBooking
          ? "Este período já possui reserva ou bloqueio para o recurso selecionado."
          : "Este horário já possui reserva ou bloqueio para o serviço selecionado.",
      );
      return;
    }

    const blockCreated = await createAvailabilityBlock({
      businessId,
      resourceId,
      startDate,
      endDate: isPeriodBooking ? endDate : startDate,
      reason: isTimeSlotBooking ? `${reason} - Horário: ${startTime}` : reason,
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
        <label className="text-sm font-semibold text-slate-300">Negócio</label>

        <select
          value={businessId}
          onChange={(event) => setBusinessId(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        >
          <option value="">Selecione um negócio</option>

          {businesses.map((business) => (
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))}
        </select>
      </div>

      {selectedBusiness ? (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
          <p>
            <span className="font-semibold text-white">Negócio:</span>{" "}
            {selectedBusiness.name}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-white">Modo de reserva:</span>{" "}
            {selectedBusiness.bookingMode === "period" ? "Período" : "Horário"}
          </p>
        </div>
      ) : null}

      <div>
        <label className="text-sm font-semibold text-slate-300">
          {isTimeSlotBooking ? "Serviço" : "Recurso"}
        </label>

        <select
          value={resourceId}
          onChange={(event) => setResourceId(event.target.value)}
          disabled={!businessId || isLoadingResources}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">
            {isLoadingResources
              ? "Carregando opções..."
              : "Selecione uma opção"}
          </option>

          {resources.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>
      </div>

      {isPeriodBooking ? (
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
      ) : null}

      {isTimeSlotBooking ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              Data
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
              Horário
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>
      ) : null}

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