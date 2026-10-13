export interface GetMyServicesResponse {
  id: string;
  getLocationsResponses: {
    id: string;
    location: string;
  }[];
  getTypeOfServiceResponse: {
    id: string;
    serviceName: string;
  };
  description: string;
  price: number;
  address: string;
}
