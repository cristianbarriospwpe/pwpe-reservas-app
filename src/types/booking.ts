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
  peopleCount?: number;
  status: BookingStatus;
  totalPrice?: number;
  createdAt: string;
};