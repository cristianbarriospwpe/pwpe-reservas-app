import { supabase } from "@/lib/supabase";
import { mapResourceRowToResource } from "@/mappers/resource";
import type {
  PriceUnit,
  Resource,
  ResourceRow,
  ResourceType,
} from "@/types/resource";

type CreateResourceInput = {
  businessId: string;
  name: string;
  description: string;
  resourceType: ResourceType;
  capacity?: number;
  price: number;
  priceUnit: PriceUnit;
  isActive: boolean;
};

export async function getActiveResourcesByBusinessId(
  businessId: string,
): Promise<Resource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select(
      `
      *,
      businesses (
        name
      )
    `,
    )
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao buscar recursos ativos:", error);
    return [];
  }

  return data.map((row) => mapResourceRowToResource(row as ResourceRow));
}

export async function getResourcesByBusinessId(
  businessId: string,
): Promise<Resource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select(
      `
      *,
      businesses (
        name
      )
    `,
    )
    .eq("business_id", businessId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao buscar recursos:", error);
    return [];
  }

  return data.map((row) => mapResourceRowToResource(row as ResourceRow));
}

export async function getAllResources(): Promise<Resource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select(
      `
      *,
      businesses (
        name
      )
    `,
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao buscar todos os recursos:", error);
    return [];
  }

  return data.map((row) => mapResourceRowToResource(row as ResourceRow));
}

export async function createResource(
  input: CreateResourceInput,
): Promise<boolean> {
  const { error } = await supabase.from("resources").insert({
    business_id: input.businessId,
    name: input.name,
    description: input.description,
    resource_type: input.resourceType,
    capacity: input.capacity ?? null,
    price: input.price,
    price_unit: input.priceUnit,
    is_active: input.isActive,
  });

  if (error) {
    console.error("Erro ao criar recurso:", error);
    return false;
  }

  return true;
}