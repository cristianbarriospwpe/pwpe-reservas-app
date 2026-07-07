"use client";

import { useState } from "react";
import { createBooking } from "@/services/bookings";
import type { Resource } from "@/types/resource";

type PublicBookingFormProps = {
  businessId: string;
  businessName: string;
  businessWhatsapp: string;
  resources: Resource[];
};

export function PublicBookingForm({
  businessId,
  businessName,
  businessWhatsapp,
  resources,
}: PublicBookingFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedResource = resources.find((resource) => resource.id === resourceId);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !customerName ||
      !customerWhatsapp ||
      !startDate ||
      !endDate ||
      !peopleCount ||
      !resourceId
    ) {
      setErrorMessage("Preencha todos os campos antes de enviar a solicitação.");
      return;
    }

    setIsSubmitting(true);

    const bookingCreated = await createBooking({
      businessId,
      resourceId,
      customerName,
      customerPhone: customerWhatsapp,
      bookingType: "period",
      startDate,
      endDate,
      peopleCount: Number(peopleCount),
    });

    setIsSubmitting(false);

    if (!bookingCreated) {
      setErrorMessage(
        "Não foi possível salvar a reserva. Tente novamente em alguns instantes.",
      );
      return;
    }

    const message = `Olá! Gostaria de solicitar uma reserva.

Negócio: ${businessName}
Acomodação: ${selectedResource?.name ?? "Não informada"}
Entrada: ${startDate}
Saída: ${endDate}
Pessoas: ${peopleCount}

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

      <div className="grid gap-5 md:grid-cols-2">
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

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Acomodação
          </label>
          <select
            value={resourceId}
            onChange={(event) => setResourceId(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
          >
            <option value="">Selecione uma acomodação</option>
            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.name}
              </option>
            ))}
          </select>
        </div>
      </div>

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