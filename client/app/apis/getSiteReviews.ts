import { useQuery } from "@tanstack/react-query";

export default function getSiteReviewsQuery() {
  return useQuery({
    queryKey: ["siteReviews"],
    queryFn: getSiteReviews,
  });
}

export const getSiteReviews = () => {
  return new Promise<{ userDTO: any[]; reviewMessage: string; rating: number }>(
    (resolve, reject) => {
      fetch("http://localhost:8080/api/v1/reviews/getSiteReviews")
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    },
  );
};
