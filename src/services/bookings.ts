import { supabase } from "@/lib/supabase";
import { mapBookingRowToBooking } from "@/mappers/booking";
import type { Booking, BookingRow } from "@/types/booking";

type CreateBookingInput = {
  businessId: string;
  resourceId: string;
  customerName: string;
  customerPhone: string;
  bookingType: "period" | "time_slot";
  startDate: string;
  endDate?: string;
  peopleCount?: number;
  totalPrice?: number;
};

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

export async function createBooking(
  input: CreateBookingInput,
): Promise<boolean> {
  const { error } = await supabase.from("bookings").insert({
    business_id: input.businessId,
    resource_id: input.resourceId,
    customer_name: input.customerName,
    customer_phone: input.customerPhone,
    booking_type: input.bookingType,
    start_date: input.startDate,
    end_date: input.endDate || null,
    people_count: input.peopleCount ?? null,
    status: "pending",
    total_price: input.totalPrice ?? null,
  });

  if (error) {
    console.error("Erro ao criar reserva:", error);
    return false;
  }

  return true;
}