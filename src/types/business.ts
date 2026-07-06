export type BusinessType =
  | "pousada"
  | "vehicle_rental"
  | "barbershop"
  | "tourism"
  | "service";

export type BookingMode = "period" | "time_slot";

export type Business = {
  id: string;
  name: string;
  slug: string;
  businessType: BusinessType;
  bookingMode: BookingMode;
  description: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pixKey?: string;
  primaryColor: string;
  language: "pt-BR" | "es";
  requiresManualConfirmation: boolean;
  openWhatsappAfterRequest: boolean;
};

export type BusinessRow = {
  id: string;
  name: string;
  slug: string;
  business_type: BusinessType;
  booking_mode: BookingMode;
  description: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pix_key: string | null;
  primary_color: string | null;
  language: "pt-BR" | "es" | null;
  requires_manual_confirmation: boolean | null;
  open_whatsapp_after_request: boolean | null;
  is_active: boolean | null;
  created_at: string;
};