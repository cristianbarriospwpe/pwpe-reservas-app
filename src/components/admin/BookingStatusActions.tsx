"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateBookingStatus } from "@/services/bookings";
import type { BookingStatus } from "@/types/booking";

type BookingStatusActionsProps = {
  bookingId: string;
  currentStatus: BookingStatus;
};

export function BookingStatusActions({
  bookingId,
  currentStatus,
}: BookingStatusActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(status: BookingStatus) {
    setIsUpdating(true);

    const updated = await updateBookingStatus(bookingId, status);

    setIsUpdating(false);

    if (!updated) {
      alert("Não foi possível atualizar o status da reserva.");
      return;
    }

    router.refresh();
  }

  if (currentStatus === "cancelled" || currentStatus === "completed") {
    return (
      <p className="text-xs text-slate-500">
        Nenhuma ação disponível
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {currentStatus !== "confirmed" ? (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => handleStatusChange("confirmed")}
          className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Confirmar
        </button>
      ) : null}

      {currentStatus === "confirmed" ? (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => handleStatusChange("completed")}
          className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Finalizar
        </button>
      ) : null}

      <button
        type="button"
        disabled={isUpdating}
        onClick={() => handleStatusChange("cancelled")}
        className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Cancelar
      </button>
    </div>
  );
}