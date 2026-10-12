export interface GetMyServicesResponse {
  getLocationResponse: {
    location: string;
  };
  getTypeOfServiceResponse: {
    serviceName: string;
  };
  description: string;
  price: number;
  address: string;
}
