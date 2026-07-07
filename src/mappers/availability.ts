import type {
  AvailabilityBlock,
  AvailabilityBlockRow,
} from "@/types/availability";

export function mapAvailabilityBlockRowToAvailabilityBlock(
  row: AvailabilityBlockRow,
): AvailabilityBlock {
  return {
    id: row.id,
    businessName: row.businesses?.name ?? "",
    resourceName: row.resources?.name ?? "Recurso não informado",
    startDate: row.start_date,
    endDate: row.end_date,
    reason: row.reason ?? "",
    createdAt: row.created_at,
  };
}