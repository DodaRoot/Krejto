import { useQuery } from "@tanstack/react-query";

import { getSiteReviews } from "../../apis/siteReviews";

export function useSiteReviewsQuery() {
  return useQuery({
    queryKey: ["siteReviews"],
    queryFn: getSiteReviews,
  });
}
