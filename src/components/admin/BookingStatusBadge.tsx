import {
  bookingStatusLabels,
  bookingStatusStyles,
} from "../../data/booking-labels";
import type { BookingStatus } from "../../types/booking";

type BookingStatusBadgeProps = {
  status: BookingStatus;
};

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${bookingStatusStyles[status]}`}
    >
      {bookingStatusLabels[status]}
    </span>
  );
}