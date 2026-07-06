export type ResourceType = "accommodation" | "vehicle" | "service" | "experience";

export type PriceUnit = "night" | "day" | "service" | "person";

export type Resource = {
  id: string;
  businessName: string;
  name: string;
  description: string;
  resourceType: ResourceType;
  capacity?: number;
  price: number;
  priceUnit: PriceUnit;
  isActive: boolean;
};