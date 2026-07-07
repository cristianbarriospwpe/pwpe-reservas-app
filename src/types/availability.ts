export type AvailabilityBlock = {
  id: string;
  businessName: string;
  resourceName: string;
  startDate: string;
  endDate: string;
  reason: string;
  createdAt: string;
};

export type AvailabilityBlockRow = {
  id: string;
  business_id: string;
  resource_id: string | null;
  start_date: string;
  end_date: string;
  reason: string | null;
  created_at: string;
  businesses?: {
    name: string;
  } | null;
  resources?: {
    name: string;
  } | null;
};