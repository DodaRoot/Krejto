export interface filterServicesData {
  content: {
    address: string;
    description: string;
    getLocationsResponses: string[];
    getTypeOfServiceResponse: {
      serviceName: string;
      serviceDescription: string;
    };
    getUserResponse: {
      fullName: string;
      email: string;
      phoneNumber: string;
      createdAt: string;
    };
    id: string;
    price: number;
    serviceReviews: string[];
  }[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
