import type { Resource } from "../types/resource";

export const mockResources: Resource[] = [
  {
    id: "resource-001",
    businessName: "Pousada Mar Azul",
    name: "Suíte casal",
    description: "Acomodação para casal com cama de casal e banheiro privativo.",
    resourceType: "accommodation",
    capacity: 2,
    price: 250,
    priceUnit: "night",
    isActive: true,
  },
  {
    id: "resource-002",
    businessName: "Pousada Mar Azul",
    name: "Quarto família",
    description: "Quarto espaçoso para famílias, com capacidade para até 4 pessoas.",
    resourceType: "accommodation",
    capacity: 4,
    price: 400,
    priceUnit: "night",
    isActive: true,
  },
  {
    id: "resource-003",
    businessName: "Pousada Mar Azul",
    name: "Chalé vista mar",
    description: "Chalé confortável com vista para o mar.",
    resourceType: "accommodation",
    capacity: 2,
    price: 450,
    priceUnit: "night",
    isActive: false,
  },
];