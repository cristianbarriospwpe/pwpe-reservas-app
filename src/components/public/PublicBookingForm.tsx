"use client";

import { useMemo, useState } from "react";
import { BookingDateRangePicker } from "@/components/public/BookingDateRangePicker";
import {
  createBooking,
  hasBookingConflict,
  hasTimeSlotConflict,
} from "@/services/bookings";
import type { BookingMode } from "@/types/business";
import type { Resource } from "@/types/resource";

type PublicBookingFormProps = {
  businessId: string;
  businessName: string;
  businessWhatsapp: string;
  bookingMode: BookingMode;
  resources: Resource[];
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getPriceUnitLabel(priceUnit: Resource["priceUnit"]) {
  if (priceUnit === "night") {
    return "noite";
  }

  if (priceUnit === "day") {
    return "dia";
  }

  if (priceUnit === "person") {
    return "pessoa";
  }

  return "serviço";
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function buildWhatsAppUrl({
  businessWhatsapp,
  businessName,
  customerName,
  customerPhone,
  resourceName,
  startDate,
  endDate,
  startTime,
  peopleCount,
  customerNotes,
}: {
  businessWhatsapp: string;
  businessName: string;
  customerName: string;
  customerPhone: string;
  resourceName: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  peopleCount?: string;
  customerNotes?: string;
}) {
  const phone = normalizePhone(businessWhatsapp);

  const lines = [
    `Olá, gostaria de solicitar uma reserva em ${businessName}.`,
    "",
    `Nome: ${customerName}`,
    `WhatsApp: ${customerPhone}`,
    `Acomodação: ${resourceName}`,
    `Entrada: ${startDate}`,
  ];

  if (endDate) {
    lines.push(`Saída: ${endDate}`);
  }

  if (startTime) {
    lines.push(`Horário: ${startTime}`);
  }

  if (peopleCount) {
    lines.push(`Quantidade de pessoas: ${peopleCount}`);
  }

  if (customerNotes) {
    lines.push("");
    lines.push(`Observações: ${customerNotes}`);
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function PublicBookingForm({
  businessId,
  businessName,
  businessWhatsapp,
  bookingMode,
  resources,
}: PublicBookingFormProps) {
  const [selectedResourceId, setSelectedResourceId] = useState(
    resources[0]?.id ?? "",
  );
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedResource = useMemo(() => {
    return resources.find((resource) => resource.id === selectedResourceId);
  }, [resources, selectedResourceId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!selectedResource) {
      setErrorMessage("Selecione uma acomodação.");
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
      setErrorMessage("Selecione a data de entrada.");
      return;
    }

    if (bookingMode === "period" && !endDate) {
      setErrorMessage("Selecione a data de saída.");
      return;
    }

    if (bookingMode === "time_slot" && !startTime) {
      setErrorMessage("Selecione um horário.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (bookingMode === "period") {
        const hasConflict = await hasBookingConflict({
          resourceId: selectedResource.id,
          startDate,
          endDate,
        });

        if (hasConflict) {
          setErrorMessage(
            "Essa acomodação já possui uma reserva nesse período. Escolha outras datas.",
          );
          return;
        }
      }

      if (bookingMode === "time_slot") {
        const hasConflict = await hasTimeSlotConflict({
          resourceId: selectedResource.id,
          startDate,
          startTime,
        });

        if (hasConflict) {
          setErrorMessage(
            "Esse horário já possui uma reserva. Escolha outro horário.",
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
        peopleCount: peopleCount ? Number(peopleCount) : undefined,
        totalPrice: selectedResource.price,
      });

      setSuccessMessage(
        "Solicitação enviada com sucesso. Você será redirecionado para o WhatsApp.",
      );

      const whatsappUrl = buildWhatsAppUrl({
        businessWhatsapp,
        businessName,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        resourceName: selectedResource.name,
        startDate,
        endDate: bookingMode === "period" ? endDate : undefined,
        startTime: bookingMode === "time_slot" ? startTime : undefined,
        peopleCount,
        customerNotes: customerNotes.trim(),
      });

      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Não foi possível enviar sua solicitação. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (resources.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-700 bg-slate-900 p-6 text-white">
        <p className="text-lg font-black">Nenhuma acomodação disponível.</p>
        <p className="mt-2 text-sm text-slate-300">
          Entre em contato pelo WhatsApp para consultar disponibilidade.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-700 bg-slate-900 p-5 text-white shadow-2xl shadow-slate-950/20 sm:p-8"
    >
      <p className="text-sm font-black uppercase tracking-[0.35em] text-sky-300">
        Solicitar reserva
      </p>

      <h2 className="mt-4 text-3xl font-black">{businessName}</h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        Preencha os dados abaixo para enviar sua solicitação pelo WhatsApp.
      </p>

      <div className="mt-8 grid gap-5">
        <label className="block">
          <span className="mb-2 block text-sm font-black text-white">Nome</span>

          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-black text-white">
            WhatsApp
          </span>

          <input
            type="tel"
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            placeholder="Ex: 88999999999"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
          />
        </label>

        <BookingDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        {bookingMode === "time_slot" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-black text-white">
              Horário
            </span>

            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-sky-400"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-black text-white">
            Quantidade de pessoas
          </span>

          <input
            type="number"
            min="1"
            value={peopleCount}
            onChange={(event) => setPeopleCount(event.target.value)}
            placeholder="Ex: 2"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
          />
        </label>

        <div>
          <p className="mb-3 text-sm font-black text-white">Acomodação</p>

          <div className="grid gap-3">
            {resources.map((resource) => {
              const isSelected = selectedResourceId === resource.id;

              return (
                <button
                  key={resource.id}
                  type="button"
                  onClick={() => setSelectedResourceId(resource.id)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    isSelected
                      ? "border-sky-400 bg-sky-400/10"
                      : "border-slate-700 bg-slate-950 hover:border-sky-400/60"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-lg font-black text-white">
                        {resource.name}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {resource.description}
                      </p>

                      <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-sky-300">
                        Até {resource.capacity ?? "-"} pessoas
                      </p>
                    </div>

                    <div className="w-fit rounded-full bg-sky-400 px-4 py-2 text-sm font-black text-slate-950">
                      {formatPrice(resource.price)}
                    </div>
                  </div>

                  <p className="mt-3 text-xs font-semibold text-slate-500">
                    Valor por {getPriceUnitLabel(resource.priceUnit)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-black text-white">
            Observações
          </span>

          <textarea
            value={customerNotes}
            onChange={(event) => setCustomerNotes(event.target.value)}
            placeholder="Ex: horário de chegada, dúvidas ou observações da reserva"
            rows={4}
            className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
          />
        </label>

        {errorMessage ? (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-200">
            {errorMessage}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm font-bold text-emerald-200">
            {successMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-sky-400 px-6 py-4 text-center text-base font-black text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : "Solicitar reserva pelo WhatsApp"}
        </button>

        <p className="text-center text-xs leading-6 text-slate-400">
          Sua reserva será enviada como solicitação e ficará aguardando
          confirmação.
        </p>
      </div>
    </form>
  );
}