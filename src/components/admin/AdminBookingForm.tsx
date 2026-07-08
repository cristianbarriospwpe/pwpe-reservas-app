"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createBooking,
  hasBookingConflict,
  hasTimeSlotConflict,
} from "@/services/bookings";
import { getResourcesByBusinessId } from "@/services/resources";
import type { BookingStatus } from "@/types/booking";
import type { Business } from "@/types/business";
import type { Resource } from "@/types/resource";

type AdminBookingFormProps = {
  businesses: Business[];
};

function calculateNights(startDate: string, endDate: string): number {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  const differenceInMilliseconds = end.getTime() - start.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays > 0 ? differenceInDays : 0;
}

export function AdminBookingForm({ businesses }: AdminBookingFormProps) {
  const router = useRouter();

  const [businessId, setBusinessId] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [status, setStatus] = useState<BookingStatus>("confirmed");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingResources, setIsLoadingResources] = useState(false);

  const selectedBusiness = businesses.find(
    (business) => business.id === businessId,
  );

  const selectedResource = resources.find(
    (resource) => resource.id === resourceId,
  );

  const isPeriodBooking = selectedBusiness?.bookingMode === "period";
  const isTimeSlotBooking = selectedBusiness?.bookingMode === "time_slot";

  const nights = useMemo(
    () => calculateNights(startDate, endDate),
    [startDate, endDate],
  );

  const totalPrice = selectedResource
    ? isPeriodBooking
      ? selectedResource.price * nights
      : selectedResource.price
    : 0;

  useEffect(() => {
    async function loadResources() {
      if (!businessId) {
        setResources([]);
        setResourceId("");
        return;
      }

      setIsLoadingResources(true);

      const businessResources = await getResourcesByBusinessId(businessId);

      setResources(businessResources.filter((resource) => resource.isActive));
      setResourceId("");
      setIsLoadingResources(false);
    }

    loadResources();
  }, [businessId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    if (!businessId || !customerName || !customerPhone || !resourceId) {
      setErrorMessage("Preencha os campos obrigatórios antes de salvar.");
      return;
    }

    if (!selectedBusiness) {
      setErrorMessage("Selecione um negócio válido.");
      return;
    }

    if (!startDate) {
      setErrorMessage("Informe a data da reserva.");
      return;
    }

    if (isPeriodBooking && (!endDate || !peopleCount)) {
      setErrorMessage("Informe data de saída e quantidade de pessoas.");
      return;
    }

    if (isTimeSlotBooking && !startTime) {
      setErrorMessage("Informe o horário da reserva.");
      return;
    }

    if (isPeriodBooking && nights <= 0) {
      setErrorMessage("A data de saída deve ser depois da data de entrada.");
      return;
    }

    setIsSubmitting(true);

    const bookingConflict = isPeriodBooking
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

    if (bookingConflict) {
      setIsSubmitting(false);
      setErrorMessage(
        isPeriodBooking
          ? "Este período não está disponível para o recurso selecionado."
          : "Este horário não está disponível para o serviço selecionado.",
      );
      return;
    }

    const bookingCreated = await createBooking({
      businessId,
      resourceId,
      customerName,
      customerPhone,
      bookingType: selectedBusiness.bookingMode,
      startDate,
      endDate: isPeriodBooking ? endDate : undefined,
      startTime: isTimeSlotBooking ? startTime : undefined,
      peopleCount: isPeriodBooking ? Number(peopleCount) : 1,
      totalPrice,
      status,
    });

    setIsSubmitting(false);

    if (!bookingCreated) {
      setErrorMessage(
        "Não foi possível salvar a reserva. Tente novamente em alguns instantes.",
      );
      return;
    }

    router.push("/admin/bookings");
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
            <span className="font-semibold text-white">Tipo:</span>{" "}
            {selectedBusiness.businessType}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-white">Modo de reserva:</span>{" "}
            {selectedBusiness.bookingMode === "period"
              ? "Período"
              : "Horário"}
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-300">
            Nome do cliente
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="Ex: João Silva"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            WhatsApp do cliente
          </label>

          <input
            type="text"
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="Ex: +55 22 99999-9999"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
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
                {resource.name} - R$ {resource.price.toFixed(2)}
                {isPeriodBooking ? " / noite" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            Status inicial
          </label>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as BookingStatus)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmada</option>
          </select>
        </div>
      </div>

      {isPeriodBooking ? (
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-slate-300">
              Data de entrada
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
              Data de saída
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300">
              Pessoas
            </label>

            <input
              type="number"
              min="1"
              value={peopleCount}
              onChange={(event) => setPeopleCount(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="2"
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

      {selectedResource && isPeriodBooking && nights > 0 ? (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm text-cyan-100">
          <p className="font-bold text-white">Resumo da reserva</p>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <p>
              <span className="font-semibold">Noites:</span> {nights}
            </p>

            <p>
              <span className="font-semibold">Preço:</span> R${" "}
              {selectedResource.price.toFixed(2)}
            </p>

            <p>
              <span className="font-semibold">Total:</span> R${" "}
              {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      ) : null}

      {selectedResource && isTimeSlotBooking ? (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm text-cyan-100">
          <p className="font-bold text-white">Resumo da reserva</p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <p>
              <span className="font-semibold">Serviço:</span>{" "}
              {selectedResource.name}
            </p>

            <p>
              <span className="font-semibold">Total:</span> R${" "}
              {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      ) : null}

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
          {isSubmitting ? "Salvando..." : "Salvar reserva"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/bookings")}
          className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}