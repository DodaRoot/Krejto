import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import LeaveReview from "../routes/LeaveReviewPage/LeaveReview";

const mutate = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => [(key: string) => key],
}));

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("~/apis/postSiteReview", () => ({
  default: () => ({ mutate, isPending: false, isError: false }),
}));

describe("Leave review page", () => {
  it("requires a rating and review before submission", () => {
    render(<LeaveReview />);

    fireEvent.click(screen.getByRole("button", { name: "Confirm review" }));

    expect(screen.getByText("Rating is required.")).toBeTruthy();
    expect(screen.getByText("Review text is required.")).toBeTruthy();
    expect(mutate).not.toHaveBeenCalled();
  });
});
