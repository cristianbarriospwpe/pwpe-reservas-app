import type { Resource, ResourceRow } from "@/types/resource";

export function mapResourceRowToResource(row: ResourceRow): Resource {
  return {
    id: row.id,
    businessId: row.business_id,
    businessName: row.businesses?.name ?? "",
    name: row.name,
    description: row.description ?? "",
    resourceType: row.resource_type,
    capacity: row.capacity ?? undefined,
    price: Number(row.price),
    priceUnit: row.price_unit,
    isActive: row.is_active ?? true,
  };
}