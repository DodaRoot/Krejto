import { useState, type SubmitEvent } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

import usePostSiteReview from "~/apis/postSiteReview";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FieldError } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useNavigate } from "react-router";
import type { ReviewRating } from "./types";

export default function LeaveReview() {
  const [t] = useTranslation();
  const [rating, setRating] = useState<ReviewRating>(0);
  const [review, setReview] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const reviewMutation = usePostSiteReview();
  const navigate = useNavigate();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextRatingError = rating === 0 ? t("Rating is required.") : "";
    const nextReviewError = review.trim() ? "" : t("Review text is required.");
    setRatingError(nextRatingError);
    setReviewError(nextReviewError);

    if (nextRatingError || nextReviewError) {
      return;
    }

    reviewMutation.mutate(
      { rating, reviewMessage: review.trim() },
      { onSuccess: () => navigate("/") },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-center items-center pt-10 pb-4"
    >
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
              {t("Leave a review")}
            </h1>
          </CardTitle>
          <CardDescription>
            {t(
              "Tell us about your experience with Krejto. Your feedback helps us make the site better for everyone.",
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div
              className="flex items-center gap-1 justify-center sm:justify-start"
              role="group"
              aria-label={t("Star rating")}
              aria-describedby={ratingError ? "rating-error" : undefined}
              aria-invalid={Boolean(ratingError)}
            >
              {([1, 2, 3, 4, 5] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  className="size-12 text-amber-500 hover:text-amber-600"
                  aria-label={t("Star {{count}}", { count: value })}
                  aria-pressed={rating === value}
                  onClick={() => {
                    setRating(value);
                    setRatingError("");
                  }}
                >
                  <Star
                    aria-hidden="true"
                    className={`size-8 ${
                      value <= rating ? "fill-current" : ""
                    }`}
                  />
                </Button>
              ))}
            </div>
            <FieldError id="rating-error">{ratingError}</FieldError>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-text" className="text-base">
              {t("Write your review")}
            </Label>
            <p className="text-xs leading-5 text-muted-foreground">
              {t("Please keep your review respectful and helpful.")}
            </p>
            <Textarea
              id="review-text"
              name="review"
              rows={3}
              maxLength={200}
              placeholder={t("Share your thoughts about using Krejto...")}
              className="resize-y"
              aria-invalid={Boolean(reviewError)}
              aria-describedby={reviewError ? "review-error" : undefined}
              value={review}
              onChange={(event) => {
                const value = event.target.value;
                setReview(value);

                if (value.trim()) {
                  setReviewError("");
                }
              }}
            />
            <FieldError id="review-error">{reviewError}</FieldError>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4 border-t pt-6 sm:flex-row sm:justify-between">
          <div className="flex w-full flex-col gap-2 sm:w-auto">
            <Button
              type="submit"
              size="lg"
              className="w-min"
              disabled={reviewMutation.isPending}
            >
              {reviewMutation.isPending
                ? t("Submitting...")
                : t("Confirm review")}
            </Button>
            {reviewMutation.isError && (
              <FieldError>
                {t("Unable to submit your review. Please try again.")}
              </FieldError>
            )}
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
