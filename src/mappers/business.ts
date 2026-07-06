import type { Business, BusinessRow } from "@/types/business";

export function mapBusinessRowToBusiness(row: BusinessRow): Business {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    businessType: row.business_type,
    bookingMode: row.booking_mode,
    description: row.description ?? "",
    whatsapp: row.whatsapp ?? "",
    email: row.email ?? "",
    address: row.address ?? "",
    city: row.city ?? "",
    state: row.state ?? "",
    country: row.country ?? "Brasil",
    pixKey: row.pix_key ?? "",
    primaryColor: row.primary_color ?? "#22d3ee",
    language: row.language ?? "pt-BR",
    requiresManualConfirmation: row.requires_manual_confirmation ?? true,
    openWhatsappAfterRequest: row.open_whatsapp_after_request ?? true,
  };
}