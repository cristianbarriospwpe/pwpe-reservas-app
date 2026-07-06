import { supabase } from "@/lib/supabase";
import { mapResourceRowToResource } from "@/mappers/resource";
import type { Resource, ResourceRow } from "@/types/resource";

export async function getActiveResourcesByBusinessId(
  businessId: string,
): Promise<Resource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao buscar recursos:", error);
    return [];
  }

  return data.map((row) => mapResourceRowToResource(row as ResourceRow));
}