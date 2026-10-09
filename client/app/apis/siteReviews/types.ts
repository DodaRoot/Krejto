export interface SiteReviewDTO {
  reviewId: string;
  userDTO: { fullName: string };
  reviewMessage: string;
  rating: number;
}
