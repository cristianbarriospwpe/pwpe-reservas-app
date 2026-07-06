"use client";

import { useState } from "react";
import type { Resource } from "@/types/resource";

type PublicBookingFormProps = {
  businessName: string;
  businessWhatsapp: string;
  resources: Resource[];
};

export function PublicBookingForm({
  businessName,
  businessWhatsapp,
  resources,
}: PublicBookingFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [resourceId, setResourceId] = useState(resources[0]?.id ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedResource = resources.find(
      (resource) => resource.id === resourceId,
    );

    const whatsappNumber = businessWhatsapp.replace(/\D/g, "");

    const message = `
Olá! Gostaria de solicitar uma reserva.

Negócio: ${businessName}
Acomodação: ${selectedResource?.name ?? "Não informada"}
Entrada: ${startDate || "Não informada"}
Saída: ${endDate || "Não informada"}
Pessoas: ${peopleCount || "Não informado"}

Nome: ${customerName || "Não informado"}
WhatsApp: ${customerWhatsapp || "Não informado"}
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Nome completo
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Ex: Mariana Souza"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">WhatsApp</label>
          <input
            type="text"
            value={customerWhatsapp}
            onChange={(event) => setCustomerWhatsapp(event.target.value)}
            placeholder="Ex: (22) 99999-1111"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Data de entrada
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Data de saída
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Pessoas</label>
          <input
            type="number"
            value={peopleCount}
            onChange={(event) => setPeopleCount(event.target.value)}
            placeholder="Ex: 2"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Acomodação
          </label>
          <select
            value={resourceId}
            onChange={(event) => setResourceId(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
          >
            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
      >
        Enviar solicitação pelo WhatsApp
      </button>
    </form>
  );
}