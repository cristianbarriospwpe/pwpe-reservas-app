"use client";

import { useMemo, useState } from "react";
import type { BookingMode } from "@/types/business";
import type { Resource } from "@/types/resource";
import {
  createBooking,
  hasBookingConflict,
  hasTimeSlotConflict,
} from "@/services/bookings";

type PublicBookingFormProps = {
  businessId: string;
  businessName: string;
  businessWhatsapp: string;
  bookingMode: BookingMode;
  resources: Resource[];
};

function calculateNights(startDate: string, endDate: string) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end.getTime() - start.getTime();
  const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 0;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDateForMessage(date: string) {
  if (!date) {
    return "";
  }

  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export function PublicBookingForm({
  businessId,
  businessName,
  businessWhatsapp,
  bookingMode,
  resources,
}: PublicBookingFormProps) {
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [peopleCount, setPeopleCount] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedResource = useMemo(
    () => resources.find((resource) => resource.id === selectedResourceId),
    [resources, selectedResourceId],
  );

  const nights = calculateNights(startDate, endDate);

  const totalPrice = useMemo(() => {
    if (!selectedResource) {
      return 0;
    }

    if (bookingMode === "period") {
      return nights > 0 ? selectedResource.price * nights : 0;
    }

    return selectedResource.price;
  }, [bookingMode, nights, selectedResource]);

  const buttonLabel = isSubmitting
    ? "Enviando solicitação..."
    : "Enviar solicitação pelo WhatsApp";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!selectedResource) {
      setErrorMessage("Selecione uma opção antes de enviar.");
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage("Informe seu nome.");
      return;
    }

    if (!customerPhone.trim()) {
      setErrorMessage("Informe seu WhatsApp.");
      return;
    }

    if (!startDate) {
      setErrorMessage("Informe a data da reserva.");
      return;
    }

    if (bookingMode === "period" && !endDate) {
      setErrorMessage("Informe a data de saída.");
      return;
    }

    if (bookingMode === "period" && nights <= 0) {
      setErrorMessage("A data de saída precisa ser depois da data de entrada.");
      return;
    }

    if (bookingMode === "time_slot" && !startTime) {
      setErrorMessage("Informe o horário da reserva.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (bookingMode === "period") {
        const hasConflict = await hasBookingConflict({
          businessId,
          resourceId: selectedResource.id,
          startDate,
          endDate,
        });

        if (hasConflict) {
          setErrorMessage(
            "Esta acomodação não está disponível nesse período. Escolha outra data ou opção.",
          );
          return;
        }
      }

      if (bookingMode === "time_slot") {
        const hasConflict = await hasTimeSlotConflict({
          businessId,
          resourceId: selectedResource.id,
          startDate,
          startTime,
        });

        if (hasConflict) {
          setErrorMessage(
            "Este horário não está disponível. Escolha outro horário.",
          );
          return;
        }
      }

      await createBooking({
        businessId,
        resourceId: selectedResource.id,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerNotes: customerNotes.trim(),
        bookingType: bookingMode,
        startDate,
        endDate: bookingMode === "period" ? endDate : undefined,
        startTime: bookingMode === "time_slot" ? startTime : undefined,
        peopleCount: Number(peopleCount),
        totalPrice,
      });

      const periodText =
        bookingMode === "period"
          ? `Entrada: ${formatDateForMessage(startDate)}%0ASaída: ${formatDateForMessage(
              endDate,
            )}%0ANoites: ${nights}`
          : `Data: ${formatDateForMessage(startDate)}%0AHorário: ${startTime}`;

      const peopleText =
        bookingMode === "period" ? `%0APessoas: ${peopleCount}` : "";

      const notesText = customerNotes.trim()
        ? `%0AObservações: ${encodeURIComponent(customerNotes.trim())}`
        : "";

      const message = `Olá, quero solicitar uma reserva no ${encodeURIComponent(
        businessName,
      )}.%0A%0ANome: ${encodeURIComponent(
        customerName.trim(),
      )}%0AWhatsApp: ${encodeURIComponent(
        customerPhone.trim(),
      )}%0AOpção: ${encodeURIComponent(
        selectedResource.name,
      )}%0A${periodText}${peopleText}%0ATotal estimado: ${encodeURIComponent(
        formatPrice(totalPrice),
      )}${notesText}`;

      const cleanWhatsapp = businessWhatsapp.replace(/\D/g, "");
      const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${message}`;

      setSuccessMessage(
        "Reserva enviada com sucesso. Vamos abrir o WhatsApp para continuar o atendimento.",
      );

      window.open(whatsappUrl, "_blank");

      setSelectedResourceId("");
      setCustomerName("");
      setCustomerPhone("");
      setCustomerNotes("");
      setStartDate("");
      setEndDate("");
      setStartTime("");
      setPeopleCount("1");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Não foi possível enviar a solicitação. Tente novamente em alguns instantes.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-white/10 bg-slate-950 p-5 text-white shadow-2xl"
    >
      <div>
        <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
          Solicitar reserva
        </p>

        <h3 className="mt-3 text-2xl font-black">{businessName}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Preencha os dados abaixo para enviar sua solicitação pelo WhatsApp.
        </p>
      </div>

      {errorMessage ? (
        <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
          {successMessage}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-300">Nome</label>

          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Seu nome"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            WhatsApp
          </label>

          <input
            type="tel"
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            placeholder="Ex: 88999999999"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
          />
        </div>

        {bookingMode === "period" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-300">
                Entrada
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
                Saída
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
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
        )}

        <div>
          <label className="text-sm font-semibold text-slate-300">
            {bookingMode === "period" ? "Acomodação" : "Serviço"}
          </label>

          <select
            value={selectedResourceId}
            onChange={(event) => setSelectedResourceId(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="">
              {bookingMode === "period"
                ? "Selecione uma acomodação"
                : "Selecione um serviço"}
            </option>

            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.name} - {formatPrice(resource.price)}
              </option>
            ))}
          </select>
        </div>

        {bookingMode === "period" ? (
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
            />
          </div>
        ) : null}

        <div>
          <label className="text-sm font-semibold text-slate-300">
            Observações
          </label>

          <textarea
            value={customerNotes}
            onChange={(event) => setCustomerNotes(event.target.value)}
            placeholder="Ex: Vou chegar à noite, preciso de cama extra..."
            rows={4}
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
          />
        </div>

        {selectedResource ? (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
            <p className="text-sm font-semibold text-cyan-100">
              {selectedResource.name}
            </p>

            {bookingMode === "period" ? (
              <p className="mt-2 text-sm text-slate-300">
                {nights > 0
                  ? `${nights} diária(s) · Total estimado: ${formatPrice(
                      totalPrice,
                    )}`
                  : `Valor da diária: ${formatPrice(selectedResource.price)}`}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-300">
                Total estimado: {formatPrice(totalPrice)}
              </p>
            )}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}