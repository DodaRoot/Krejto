export interface SaveMyServiceData {
  locationsIds: string[];
  typeOfServiceId: string;
  description: string;
  price: number;
  address: string;
}

export interface SaveMyServiceVariables extends SaveMyServiceData {
  id?: string;
}
