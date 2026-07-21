"use client";

import { useMemo, useState } from "react";
import { AdminBusinessSettingsForm } from "@/components/admin/AdminBusinessSettingsForm";
import type { Business } from "@/types/business";

type AdminBusinessSettingsSelectorProps = {
  businesses: Business[];
};

export function AdminBusinessSettingsSelector({
  businesses,
}: AdminBusinessSettingsSelectorProps) {
  const [selectedBusinessId, setSelectedBusinessId] = useState(
    businesses[0]?.id ?? "",
  );

  const selectedBusiness = useMemo(
    () =>
      businesses.find((business) => business.id === selectedBusinessId) ??
      null,
    [businesses, selectedBusinessId],
  );

  if (businesses.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
        Nenhum negócio encontrado para editar.
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <label className="text-sm font-semibold text-slate-300">
          Negócio
        </label>

        <select
          value={selectedBusinessId}
          onChange={(event) => setSelectedBusinessId(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        >
          {businesses.map((business) => (
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))}
        </select>

        {selectedBusiness ? (
          <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
            <p>
              <span className="font-semibold text-white">Página pública:</span>{" "}
              /{selectedBusiness.slug}
            </p>

            <p className="mt-1">
              <span className="font-semibold text-white">Modo de reserva:</span>{" "}
              {selectedBusiness.bookingMode === "period"
                ? "Período"
                : "Horário"}
            </p>
          </div>
        ) : null}
      </div>

      {selectedBusiness ? (
        <AdminBusinessSettingsForm
          key={selectedBusiness.id}
          business={selectedBusiness}
        />
      ) : null}
    </section>
  );
}