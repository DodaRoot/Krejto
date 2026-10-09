import { useQuery } from "@tanstack/react-query";

import { getTopTypesOfService } from "../../apis/topTypesOfService";

export function useTopTypesOfServiceQuery() {
  return useQuery({
    queryKey: ["topTypesOfService"],
    queryFn: getTopTypesOfService,
  });
}
