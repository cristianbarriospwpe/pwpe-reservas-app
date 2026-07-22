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
export async function getResourceById(id: string): Promise<Resource | null> {
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
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro ao buscar recurso:", error);
    return null;
  }

  return mapResourceRowToResource(data as ResourceRow);
}

export type UpdateResourceInput = {
  id: string;
  name: string;
  description: string;
  capacity?: number;
  price: number;
  isActive: boolean;
};

export async function updateResource(input: UpdateResourceInput) {
  const { error } = await supabase
    .from("resources")
    .update({
      name: input.name,
      description: input.description,
      capacity: input.capacity ?? null,
      price: input.price,
      is_active: input.isActive,
    })
    .eq("id", input.id);

  if (error) {
    console.error("Erro ao atualizar recurso:", error);
    throw new Error("Não foi possível atualizar o recurso.");
  }
}