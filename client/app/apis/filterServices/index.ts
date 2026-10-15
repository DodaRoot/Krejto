import type { filterServicesData } from "./types.ts";

export async function filterServices(
  query: string,
): Promise<filterServicesData[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:8080/api/v1/service?" + query,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return (await response.json()) as filterServicesData[];
}
