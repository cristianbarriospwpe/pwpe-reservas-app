import type { BookingStatus } from "../types/booking";

export const bookingStatusLabels: Record<BookingStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Finalizada",
};

export const bookingStatusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  confirmed: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  cancelled: "bg-red-400/10 text-red-300 border-red-400/20",
  completed: "bg-slate-400/10 text-slate-300 border-slate-400/20",
};