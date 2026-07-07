import { supabase } from "@/lib/supabase";
import { mapBookingRowToBooking } from "@/mappers/booking";
import type { Booking, BookingRow } from "@/types/booking";

export async function getBookingsByBusinessId(
  businessId: string,
): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      businesses (
        name
      ),
      resources (
        name
      )
    `,
    )
    .eq("business_id", businessId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar reservas:", error);
    return [];
  }

  return data.map((row) => mapBookingRowToBooking(row as BookingRow));
}