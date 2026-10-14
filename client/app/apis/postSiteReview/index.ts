import { useMutation } from "@tanstack/react-query";

import type { usePostSiteReviewData } from "./types";

export default function usePostSiteReview() {
  return useMutation({
    mutationKey: ["postSiteReview"],
    mutationFn: postSiteReview,
  });
}

async function postSiteReview({
  ...postSiteReviewData
}: usePostSiteReviewData): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const serviceUrl = "http://localhost:8080/api/v1/reviews/addSiteReview";
  const response = await fetch(serviceUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postSiteReviewData),
  });

  if (!response.ok) {
    throw new Error(`Unable to save service (${response.status})`);
  }
}
