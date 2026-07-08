import { supabase } from "@/lib/supabase";
import { mapAvailabilityBlockRowToAvailabilityBlock } from "@/mappers/availability";
import type {
  AvailabilityBlock,
  AvailabilityBlockRow,
} from "@/types/availability";

type CreateAvailabilityBlockInput = {
  businessId: string;
  resourceId: string;
  startDate: string;
  endDate: string;
  reason: string;
};

export async function getAvailabilityBlocksByBusinessId(
  businessId: string,
): Promise<AvailabilityBlock[]> {
  const { data, error } = await supabase
    .from("availability_blocks")
    .select(
      `
      *,
      businesses (
        name
      ),
      resources (
        name
      )
    `,
    )
    .eq("business_id", businessId)
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Erro ao buscar bloqueios:", error);
    return [];
  }

  return data.map((row) =>
    mapAvailabilityBlockRowToAvailabilityBlock(row as AvailabilityBlockRow),
  );
}

export async function createAvailabilityBlock(
  input: CreateAvailabilityBlockInput,
): Promise<boolean> {
  const { error } = await supabase.from("availability_blocks").insert({
    business_id: input.businessId,
    resource_id: input.resourceId,
    start_date: input.startDate,
    end_date: input.endDate,
    reason: input.reason,
  });

  if (error) {
    console.error("Erro ao criar bloqueio:", error);
    return false;
  }

  return true;
}