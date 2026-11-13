import type { LocationsAndTypesResponse } from "./types";

export async function getLocationsAndTypes(): Promise<LocationsAndTypesResponse> {
  const response = await fetch(
    "http://localhost:3000/api/v1/locationsAndTypes/getAllLocationsAndTypes",
  );
  return (await response.json()) as LocationsAndTypesResponse;
}
