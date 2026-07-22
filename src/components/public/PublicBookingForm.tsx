"use client";

import { useMemo, useState } from "react";
import { BookingDateRangePicker } from "@/components/public/BookingDateRangePicker";
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
      )}%0ADiárias: ${nights}`
    : `Data: ${formatDateForMessage(startDate)}%0AHorário: ${startTime}`;

      const peopleText =
        bookingMode === "period" ? `%0APessoas: ${peopleCount}` : "";

      const notesText = customerNotes.trim()
        ? `%0AObservações: ${encodeURIComponent(customerNotes.trim())}`
        : "";


      const message = `Olá! Gostaria de solicitar uma reserva no ${encodeURIComponent(
        businessName,
      )}.%0A%0A${encodeURIComponent(
        "Dados da reserva:",
      )}%0ANome: ${encodeURIComponent(
        customerName.trim(),
      )}%0AWhatsApp: ${encodeURIComponent(
        customerPhone.trim(),
      )}%0AAcomodação: ${encodeURIComponent(
        selectedResource.name,
      )}%0A${periodText}${peopleText}%0ATotal estimado: ${encodeURIComponent(
        formatPrice(totalPrice),
      )}${notesText}%0A%0AAguardo confirmação da disponibilidade.`;
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
      className="rounded-[1.5rem] border border-[#E8D8BD] bg-[#FFF7E8] p-5 text-[#1F1A17] shadow-2xl shadow-[#6B3A00]/10"
    >
      <div>
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C90000]">
          Solicitar reserva
        </p>

        <h3 className="mt-3 text-2xl font-black text-[#1F1A17]">
          {businessName}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#4D4038]">
          Preencha os dados abaixo para enviar sua solicitação pelo WhatsApp.
        </p>
      </div>

      {errorMessage ? (
        <div className="mt-5 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mt-5 rounded-2xl border border-green-300 bg-green-50 p-4 text-sm font-semibold text-green-700">
          {successMessage}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        <div>
          <label className="text-sm font-black text-[#1F1A17]">Nome</label>

          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Seu nome"
            className="mt-2 w-full rounded-2xl border border-[#E8D8BD] bg-white px-4 py-3 text-[#1F1A17] outline-none transition placeholder:text-[#8A7B6D] focus:border-[#C90000] focus:ring-4 focus:ring-[#C90000]/10"
          />
        </div>

        <div>
          <label className="text-sm font-black text-[#1F1A17]">
            WhatsApp
          </label>

          <input
            type="tel"
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            placeholder="Ex: 88999999999"
            className="mt-2 w-full rounded-2xl border border-[#E8D8BD] bg-white px-4 py-3 text-[#1F1A17] outline-none transition placeholder:text-[#8A7B6D] focus:border-[#C90000] focus:ring-4 focus:ring-[#C90000]/10"
          />
        </div>

        {bookingMode === "period" ? (
          <BookingDateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(range) => {
              setStartDate(range.startDate);
              setEndDate(range.endDate);
            }}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-black text-[#1F1A17]">
                Data
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#E8D8BD] bg-white px-4 py-3 text-[#1F1A17] outline-none transition focus:border-[#C90000] focus:ring-4 focus:ring-[#C90000]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#1F1A17]">
                Horário
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#E8D8BD] bg-white px-4 py-3 text-[#1F1A17] outline-none transition focus:border-[#C90000] focus:ring-4 focus:ring-[#C90000]/10"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-black text-[#1F1A17]">
            {bookingMode === "period" ? "Acomodação" : "Serviço"}
          </label>

          <div className="mt-2 grid gap-3">
            {resources.length === 0 ? (
              <div className="rounded-2xl border border-[#E8D8BD] bg-white p-4 text-sm font-semibold text-[#4D4038]">
                Nenhuma opção disponível no momento.
              </div>
            ) : (
              resources.map((resource) => {
                const isSelected = selectedResourceId === resource.id;

                return (
                  <button
                    key={resource.id}
                    type="button"
                    onClick={() => setSelectedResourceId(resource.id)}
                    className={`rounded-2xl border p-4 text-left transition ${isSelected
                        ? "border-[#C90000] bg-[#FFF0D6] shadow-lg shadow-[#6B3A00]/10"
                        : "border-[#E8D8BD] bg-white hover:border-[#D4A23A] hover:bg-[#FFF7E8]"
                      }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-black text-[#1F1A17]">{resource.name}</p>

                        {resource.description ? (
                          <p className="mt-1 text-sm leading-5 text-[#4D4038]">
                            {resource.description}
                          </p>
                        ) : null}
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${isSelected
                            ? "bg-[#C90000] text-white"
                            : "bg-[#F6D77A] text-[#4A0606]"
                          }`}
                      >
                        {formatPrice(resource.price)}
                      </span>
                    </div>

                    {resource.capacity ? (
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-[#0B5D2A]">
                        Até {resource.capacity} pessoas
                      </p>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {bookingMode === "period" ? (
          <div>
            <label className="text-sm font-black text-[#1F1A17]">
              Pessoas
            </label>

            <input
              type="number"
              min="1"
              value={peopleCount}
              onChange={(event) => setPeopleCount(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#E8D8BD] bg-white px-4 py-3 text-[#1F1A17] outline-none transition focus:border-[#C90000] focus:ring-4 focus:ring-[#C90000]/10"
            />
          </div>
        ) : null}

        <div>
          <label className="text-sm font-black text-[#1F1A17]">
            Observações
          </label>

          <textarea
            value={customerNotes}
            onChange={(event) => setCustomerNotes(event.target.value)}
            placeholder="Ex: Vou chegar à noite, preciso de cama extra..."
            rows={4}
            className="mt-2 w-full resize-none rounded-2xl border border-[#E8D8BD] bg-white px-4 py-3 text-[#1F1A17] outline-none transition placeholder:text-[#8A7B6D] focus:border-[#C90000] focus:ring-4 focus:ring-[#C90000]/10"
          />
        </div>

        {selectedResource ? (
          <div className="rounded-2xl border border-[#F6D77A] bg-[#F6D77A]/35 p-4">
            <p className="text-sm font-black text-[#7A0909]">
              {selectedResource.name}
            </p>

            {bookingMode === "period" ? (
              <p className="mt-2 text-sm font-semibold text-[#4D4038]">
                {nights > 0
                  ? `${nights} diária(s) · Total estimado: ${formatPrice(
                    totalPrice,
                  )}`
                  : `Valor da diária: ${formatPrice(selectedResource.price)}`}
              </p>
            ) : (
              <p className="mt-2 text-sm font-semibold text-[#4D4038]">
                Total estimado: {formatPrice(totalPrice)}
              </p>
            )}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-[#0B5D2A] px-5 py-3 font-black text-white shadow-lg shadow-[#0B5D2A]/20 transition hover:-translate-y-0.5 hover:bg-[#0A4D24] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}