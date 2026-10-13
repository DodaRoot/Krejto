export interface PatchMyServiceData {
  locationsIds: string[];
  typeOfServiceId: string;
  description: string;
  price: number;
  address: string;
}

export interface PatchMyServiceVariables extends PatchMyServiceData {
  id: string;
}
