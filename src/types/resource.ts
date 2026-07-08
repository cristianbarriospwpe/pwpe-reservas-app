export type ResourceType = "accommodation" | "vehicle" | "service" | "experience";

export type PriceUnit = "night" | "day" | "service" | "person";

export type Resource = {
  id: string;
  businessId?: string;
  businessName: string;
  name: string;
  description: string;
  resourceType: ResourceType;
  capacity?: number;
  price: number;
  priceUnit: PriceUnit;
  isActive: boolean;
};

export type ResourceRow = {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  resource_type: ResourceType;
  capacity: number | null;
  price: number | string;
  price_unit: PriceUnit;
  is_active: boolean | null;
  created_at: string;
  businesses?: {
    name: string;
  } | null;
};