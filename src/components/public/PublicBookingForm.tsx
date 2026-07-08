"use client";

import { useMemo, useState } from "react";
import { createBooking, hasBookingConflict } from "@/services/bookings";
import type { BookingMode } from "@/types/business";
import type { Resource } from "@/types/resource";

type PublicBookingFormProps = {
  businessId: string;
  businessName: string;
  businessWhatsapp: string;
  bookingMode: BookingMode;
  resources: Resource[];
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

export function PublicBookingForm({
  businessId,
  businessName,
  businessWhatsapp,
  bookingMode,
  resources,
}: PublicBookingFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPeriodBooking = bookingMode === "period";
  const isTimeSlotBooking = bookingMode === "time_slot";

  const selectedResource = resources.find(
    (resource) => resource.id === resourceId,
  );

  const nights = useMemo(
    () => calculateNights(startDate, endDate),
    [startDate, endDate],
  );

  const totalPrice = selectedResource
    ? isPeriodBooking
      ? selectedResource.price * nights
      : selectedResource.price
    : 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!customerName || !customerWhatsapp || !startDate || !resourceId) {
      setErrorMessage("Preencha todos os campos obrigatórios antes de enviar.");
      return;
    }

    if (isPeriodBooking && (!endDate || !peopleCount)) {
      setErrorMessage("Preencha todos os campos antes de enviar a solicitação.");
      return;
    }

    if (isTimeSlotBooking && !bookingTime) {
      setErrorMessage("Informe o horário desejado antes de enviar.");
      return;
    }

    if (isPeriodBooking && nights <= 0) {
      setErrorMessage("A data de saída deve ser depois da data de entrada.");
      return;
    }

    setIsSubmitting(true);

    const conflictEndDate = isPeriodBooking ? endDate : startDate;

    const bookingConflict = await hasBookingConflict({
      resourceId,
      startDate,
      endDate: conflictEndDate,
    });

    if (bookingConflict) {
      setIsSubmitting(false);
      setErrorMessage(
        "Este período não está disponível para a opção selecionada.",
      );
      return;
    }

    const bookingCreated = await createBooking({
  businessId,
  resourceId,
  customerName,
  customerPhone: customerWhatsapp,
  bookingType: bookingMode,
  startDate,
  endDate: isPeriodBooking ? endDate : undefined,
  startTime: isTimeSlotBooking ? bookingTime : undefined,
  peopleCount: isPeriodBooking ? Number(peopleCount) : 1,
  totalPrice,
});

    setIsSubmitting(false);

    if (!bookingCreated) {
      setErrorMessage(
        "Não foi possível salvar a reserva. Tente novamente em alguns instantes.",
      );
      return;
    }

    const periodMessage = `Entrada: ${startDate}
Saída: ${endDate}
Noites: ${nights}
Pessoas: ${peopleCount}`;

    const timeSlotMessage = `Data: ${startDate}
Horário: ${bookingTime}`;

    const message = `Olá! Gostaria de solicitar uma reserva.

Negócio: ${businessName}
Opção: ${selectedResource?.name ?? "Não informada"}
${isPeriodBooking ? periodMessage : timeSlotMessage}
Total estimado: R$ ${totalPrice.toFixed(2)}

Nome: ${customerName}
WhatsApp: ${customerWhatsapp}`;

    const cleanWhatsapp = businessWhatsapp.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
      message,
    )}`;

    setSuccessMessage("Reserva salva com sucesso. Abrindo WhatsApp...");

    window.open(whatsappUrl, "_blank");

    setCustomerName("");
    setCustomerWhatsapp("");
    setStartDate("");
    setEndDate("");
    setBookingTime("");
    setPeopleCount("");
    setResourceId("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 grid gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Nome completo
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            WhatsApp
          </label>

          <input
            type="text"
            value={customerWhatsapp}
            onChange={(event) => setCustomerWhatsapp(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
            placeholder="(22) 99999-9999"
          />
        </div>
      </div>

      {isPeriodBooking ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Data de entrada
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Data de saída
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>
      ) : null}

      {isTimeSlotBooking ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Data
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Horário
            </label>

            <input
              type="time"
              value={bookingTime}
              onChange={(event) => setBookingTime(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        {isPeriodBooking ? (
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Pessoas
            </label>

            <input
              type="number"
              min="1"
              value={peopleCount}
              onChange={(event) => setPeopleCount(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
              placeholder="2"
            />
          </div>
        ) : null}

        <div>
          <label className="text-sm font-semibold text-slate-700">
            {isPeriodBooking ? "Acomodação" : "Serviço"}
          </label>

          <select
            value={resourceId}
            onChange={(event) => setResourceId(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
          >
            <option value="">
              {isPeriodBooking
                ? "Selecione uma acomodação"
                : "Selecione um serviço"}
            </option>

            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.name} - R$ {resource.price.toFixed(2)}
                {isPeriodBooking ? " / noite" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedResource && isPeriodBooking && nights > 0 ? (
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Resumo da reserva</p>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
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
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Resumo da reserva</p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
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
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar solicitação pelo WhatsApp"}
      </button>
    </form>
  );
}