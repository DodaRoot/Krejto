import type { ProfileDataResponse } from "./types";

export async function getProfileData(): Promise<ProfileDataResponse> {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api/v1/users/myself", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await response.json()) as ProfileDataResponse;
}
