import { supabase } from "@/lib/supabase";
import { mapAvailabilityBlockRowToAvailabilityBlock } from "@/mappers/availability";
import type {
  AvailabilityBlock,
  AvailabilityBlockRow,
} from "@/types/availability";

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