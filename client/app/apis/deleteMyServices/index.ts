import { useMutation } from "@tanstack/react-query";

import type { DeleteMyServiceVariables } from "./types";

export default function deleteMyServices() {
  return useMutation({
    mutationKey: ["deleteMyService"],
    mutationFn: deleteMyServiceFunction,
  });
}

async function deleteMyServiceFunction({
  id,
}: DeleteMyServiceVariables): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const response = await fetch(
    `http://localhost:8080/api/v1/service/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to delete service (${response.status})`);
  }
}
