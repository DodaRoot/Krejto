import { useQuery } from "@tanstack/react-query";

import { getLocationsAndTypes } from "../../apis/locationsAndTypes";

export function useLocationsAndTypesQuery() {
  return useQuery({
    queryKey: ["locationsAndTypes"],
    queryFn: getLocationsAndTypes,
    staleTime: 1000 * 60 * 10,
  });
}
