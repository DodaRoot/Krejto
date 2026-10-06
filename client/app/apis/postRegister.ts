import { useMutation } from "@tanstack/react-query";

type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export default function postRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: postRegisterFunction,
  });
}

export async function postRegisterFunction(
  registerData: RegisterData,
): Promise<string> {
  const response = await fetch("http://localhost:8080/api/v1/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData),
  });

  const token = await response.text();
  if (!response.ok) {
    throw new Error(token || `Login failed (${response.status})`);
  }

  return token;
}
