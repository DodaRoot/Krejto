import type { SiteReviewDTO } from "./types";

export async function getSiteReviews(): Promise<SiteReviewDTO[]> {
  const response = await fetch(
    "http://localhost:8080/api/v1/reviews/getSiteReviews",
  );
  return (await response.json()) as SiteReviewDTO[];
}
