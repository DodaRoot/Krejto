import type { GetMyServicesResponse } from "./types.ts";

export async function getMyServices(): Promise<GetMyServicesResponse[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:3000/api/v1/service/myServices",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return (await response.json()) as GetMyServicesResponse[];
}
