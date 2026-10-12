import { useQuery } from "@tanstack/react-query";

import { getMyServices } from "../../apis/getMyServices";

export function useGetMyServicesQuery() {
  return useQuery({ queryKey: ["getMyServices"], queryFn: getMyServices });
}
