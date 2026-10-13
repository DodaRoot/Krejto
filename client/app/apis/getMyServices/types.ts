export interface GetMyServicesResponse {
  id: string;
  getLocationsResponses: {
    location: string;
  }[];
  getTypeOfServiceResponse: {
    serviceName: string;
  };
  description: string;
  price: number;
  address: string;
}
