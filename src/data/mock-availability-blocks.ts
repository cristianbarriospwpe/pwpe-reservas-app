import type { AvailabilityBlock } from "../types/availability";

export const mockAvailabilityBlocks: AvailabilityBlock[] = [
  {
    id: "block-001",
    businessName: "Pousada Mar Azul",
    resourceName: "Suíte casal",
    startDate: "2026-07-25",
    endDate: "2026-07-27",
    reason: "Manutenção",
    createdAt: "2026-07-06",
  },
  {
    id: "block-002",
    businessName: "Pousada Mar Azul",
    resourceName: "Chalé vista mar",
    startDate: "2026-08-02",
    endDate: "2026-08-05",
    reason: "Indisponível para reforma",
    createdAt: "2026-07-06",
  },
];