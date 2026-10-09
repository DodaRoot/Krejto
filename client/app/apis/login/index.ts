import { useMutation } from "@tanstack/react-query";

import type { LoginData } from "./types";

export default function postLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: postLoginFunction,
  });
}

export async function postLoginFunction(loginData: LoginData): Promise<string> {
  const response = await fetch("http://localhost:8080/api/v1/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  const token = await response.text();
  if (!response.ok) {
    throw new Error(token || `Login failed (${response.status})`);
  }

  return token;
}