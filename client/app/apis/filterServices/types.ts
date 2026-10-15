export interface filterServicesData {
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
  price: 33333;
  serviceReviews: string[];
}
