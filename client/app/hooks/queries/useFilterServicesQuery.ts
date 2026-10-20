import { useQuery } from "@tanstack/react-query";

import { filterServices } from "../../apis/filterServices";

export function useFilterServicesQuery(query: string) {
  return useQuery({
    queryKey: ["filterServices", query],
    queryFn: () => filterServices(query),
  });
}
