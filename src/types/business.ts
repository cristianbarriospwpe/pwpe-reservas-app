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