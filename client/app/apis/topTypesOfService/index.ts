import type { TopTypeOfServiceDTO } from "./types";

export async function getTopTypesOfService(): Promise<TopTypeOfServiceDTO[]> {
  const response = await fetch(
    "http://localhost:8080/api/v1/locationsAndTypes/getTopTypes",
  );
  return (await response.json()) as TopTypeOfServiceDTO[];
}
