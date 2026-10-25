export type ServiceFormValues = {
  serviceTypeId?: string;
  price: string;
  description: string;
  locationIds: string[];
};

export type ServiceFormErrorKey =
  "serviceType" | "price" | "description" | "locations";

export type ServiceFormErrors = Partial<Record<ServiceFormErrorKey, string>>;
