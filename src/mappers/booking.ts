import type { Booking, BookingRow } from "@/types/booking";

export function mapBookingRowToBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    businessName: row.businesses?.name ?? "",
    resourceName: row.resources?.name ?? "Recurso não informado",
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    bookingType: row.booking_type,
    startDate: row.start_date,
    endDate: row.end_date ?? undefined,
    peopleCount: row.people_count ?? undefined,
    status: row.status,
    totalPrice:
      row.total_price === null || row.total_price === undefined
        ? undefined
        : Number(row.total_price),
    createdAt: row.created_at,
  };
}