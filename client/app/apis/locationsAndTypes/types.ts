export interface LocationDTO {
  id: string;
  location: string;
}

export interface TypeOfServiceDTO {
  id: string;
  serviceName: string;
  serviceDescription: string;
}

export interface LocationsAndTypesResponse {
  locationDTO: LocationDTO[];
  typeOfServiceDTO: TypeOfServiceDTO[];
}
