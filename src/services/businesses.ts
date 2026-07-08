import { supabase } from "@/lib/supabase";
import { mapBusinessRowToBusiness } from "@/mappers/business";
import type {
  BookingMode,
  Business,
  BusinessRow,
  BusinessType,
} from "@/types/business";

type UpdateBusinessInput = {
  businessId: string;
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
  pixKey: string;
  primaryColor: string;
  language: "pt-BR" | "es";
  requiresManualConfirmation: boolean;
  openWhatsappAfterRequest: boolean;
};

export async function getBusinessBySlug(
  slug: string,
): Promise<Business | null> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single<BusinessRow>();

  if (error) {
    console.error("Erro ao buscar negócio:", error);
    return null;
  }

  return mapBusinessRowToBusiness(data);
}

export async function getAllBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao buscar negócios:", error);
    return [];
  }

  return data.map((row) => mapBusinessRowToBusiness(row as BusinessRow));
}

export async function updateBusiness(
  input: UpdateBusinessInput,
): Promise<boolean> {
  const { error } = await supabase
    .from("businesses")
    .update({
      name: input.name,
      slug: input.slug,
      business_type: input.businessType,
      booking_mode: input.bookingMode,
      description: input.description,
      whatsapp: input.whatsapp,
      email: input.email,
      address: input.address,
      city: input.city,
      state: input.state,
      country: input.country,
      pix_key: input.pixKey,
      primary_color: input.primaryColor,
      language: input.language,
      requires_manual_confirmation: input.requiresManualConfirmation,
      open_whatsapp_after_request: input.openWhatsappAfterRequest,
    })
    .eq("id", input.businessId);

  if (error) {
    console.error("Erro ao atualizar negócio:", error);
    return false;
  }

  return true;
}