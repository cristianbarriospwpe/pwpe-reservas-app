import { supabase } from "@/lib/supabase";
import { mapBookingRowToBooking } from "@/mappers/booking";
import type { Booking, BookingRow, BookingStatus } from "@/types/booking";

type CreateBookingInput = {
  businessId: string;
  resourceId: string;
  customerName: string;
  customerPhone: string;
  bookingType: "period" | "time_slot";
  startDate: string;
  endDate?: string;
  startTime?: string;
  peopleCount?: number;
  totalPrice?: number;
  status?: BookingStatus;
};

type AvailabilityCheckInput = {
  resourceId: string;
  startDate: string;
  endDate: string;
};

type TimeSlotConflictInput = {
  resourceId: string;
  startDate: string;
  startTime: string;
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

export async function getAllBookings(): Promise<Booking[]> {
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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar todas as reservas:", error);
    return [];
  }

  return data.map((row) => mapBookingRowToBooking(row as BookingRow));
}

export async function hasBookingConflict({
  resourceId,
  startDate,
  endDate,
}: AvailabilityCheckInput): Promise<boolean> {
  const { data: conflictingBookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("id")
    .eq("resource_id", resourceId)
    .in("status", ["pending", "confirmed"])
    .lt("start_date", endDate)
    .gt("end_date", startDate);

  if (bookingsError) {
    console.error("Erro ao verificar reservas existentes:", bookingsError);
    return true;
  }

  if (conflictingBookings.length > 0) {
    return true;
  }

  const { data: conflictingBlocks, error: blocksError } = await supabase
    .from("availability_blocks")
    .select("id")
    .eq("resource_id", resourceId)
    .lt("start_date", endDate)
    .gt("end_date", startDate);

  if (blocksError) {
    console.error("Erro ao verificar bloqueios:", blocksError);
    return true;
  }

  return conflictingBlocks.length > 0;
}

export async function hasTimeSlotConflict({
  resourceId,
  startDate,
  startTime,
}: TimeSlotConflictInput): Promise<boolean> {
  const normalizedStartTime =
    startTime.length === 5 ? `${startTime}:00` : startTime;

  const { data: conflictingBookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("id")
    .eq("resource_id", resourceId)
    .eq("start_date", startDate)
    .eq("start_time", normalizedStartTime)
    .in("status", ["pending", "confirmed"]);

  if (bookingsError) {
    console.error("Erro ao verificar horário reservado:", bookingsError);
    return true;
  }

  if (conflictingBookings.length > 0) {
    return true;
  }

  const { data: conflictingBlocks, error: blocksError } = await supabase
    .from("availability_blocks")
    .select("id")
    .eq("resource_id", resourceId)
    .lte("start_date", startDate)
    .gt("end_date", startDate);

  if (blocksError) {
    console.error("Erro ao verificar bloqueios do horário:", blocksError);
    return true;
  }

  return conflictingBlocks.length > 0;
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
    start_time: input.startTime || null,
    people_count: input.peopleCount ?? null,
    status: input.status ?? "pending",
    total_price: input.totalPrice ?? null,
  });

  if (error) {
    console.error("Erro ao criar reserva:", error);
    return false;
  }

  return true;
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
): Promise<boolean> {
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);

  if (error) {
    console.error("Erro ao atualizar status da reserva:", error);
    return false;
  }

  return true;
}