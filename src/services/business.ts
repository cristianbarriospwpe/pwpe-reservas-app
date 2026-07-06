import { supabase } from "@/lib/supabase";
import { mapBusinessRowToBusiness } from "@/mappers/businesses";
import type { Business, BusinessRow } from "@/types/business";

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