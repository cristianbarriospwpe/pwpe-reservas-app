export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type BookingType = "period" | "time_slot";

export type Booking = {
  id: string;
  businessName: string;
  resourceName: string;
  customerName: string;
  customerPhone: string;
  bookingType: BookingType;
  startDate: string;
  endDate?: string;
  startTime?: string;
  peopleCount?: number;
  status: BookingStatus;
  totalPrice?: number;
  createdAt: string;
};

export type BookingRow = {
  id: string;
  business_id: string;
  resource_id: string | null;
  customer_name: string;
  customer_phone: string;
  booking_type: BookingType;
  start_date: string;
  end_date: string | null;
  start_time: string | null;
  people_count: number | null;
  status: BookingStatus;
  total_price: number | string | null;
  created_at: string;
  businesses?: {
    name: string;
  } | null;
  resources?: {
    name: string;
  } | null;
};