import { useQuery } from "@tanstack/react-query";

export default function getTopTypesOfServiceQuery() {
  return useQuery({
    queryKey: ["topTypesOfService"],
    queryFn: getTopTypesOfServiceFunction,
  });
}

export const getTopTypesOfServiceFunction = () => {
  return new Promise<{ serviceName: string; serviceDescription: string }>(
    (resolve, reject) => {
      fetch("http://localhost:8080/api/v1/locationsAndTypes/getTopTypes")
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    },
  );
};
