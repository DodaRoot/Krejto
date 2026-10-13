import { useMutation } from "@tanstack/react-query";

import type { PatchMyServiceVariables } from "./types";

export default function patchMyServices() {
  return useMutation({
    mutationKey: ["patchMyServices"],
    mutationFn: patchMyServiceFunction,
  });
}

async function patchMyServiceFunction({
  id,
  ...serviceData
}: PatchMyServiceVariables): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const response = await fetch(
    `http://localhost:8080/api/v1/service/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to update service (${response.status})`);
  }
}
