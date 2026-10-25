import { useMutation } from "@tanstack/react-query";

import type { SaveMyServiceVariables } from "./types";

export default function useSaveMyService() {
  return useMutation({
    mutationKey: ["saveMyService"],
    mutationFn: saveMyService,
  });
}

async function saveMyService({ ...serviceData }: SaveMyServiceVariables) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const serviceUrl = "http://localhost:8080/api/v1/service";
  const response = await fetch(serviceUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    throw new Error(`Unable to save service (${response.status})`);
  }
}
