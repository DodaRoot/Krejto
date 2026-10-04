import { useQuery } from "@tanstack/react-query";

export default function getLocationsAndTypesQuery() {
  return useQuery({
    queryKey: ["locationsAndTypes"],
    queryFn: getLocationsAndTypes,
  });
}

export const getLocationsAndTypes = () => {
  return new Promise<{ locations: any[]; typesOfService: any[] }>(
    (resolve, reject) => {
      fetch("http://localhost:8080/api/v1/locationsAndTypes")
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    },
  );
};
