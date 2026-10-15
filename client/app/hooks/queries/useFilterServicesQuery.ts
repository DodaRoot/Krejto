import { useQuery } from "@tanstack/react-query";

import { filterServices } from "../../apis/filterServices";

export function useFilterServicesQuery(query: string) {
  return useQuery({
    queryKey: ["filterServices"],
    queryFn: () => filterServices(query),
  });
}
