import { useMutation, useQuery } from "@tanstack/react-query";

export default function postLogout() {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: postLogoutFunction,
  });
}

export const postLogoutFunction = () => {
  return new Promise<{ locations: any[]; typesOfService: any[] }>(
    (resolve, reject) => {
      fetch("http://localhost:8080/api/v1/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    },
  );
};
