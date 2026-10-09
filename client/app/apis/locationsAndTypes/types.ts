export interface LocationDTO {
  location: string;
}

export interface TypeOfServiceDTO {
  serviceName: string;
  serviceDescription: string;
}

export interface LocationsAndTypesResponse {
  locationDTO: LocationDTO[];
  typeOfServiceDTO: TypeOfServiceDTO[];
}