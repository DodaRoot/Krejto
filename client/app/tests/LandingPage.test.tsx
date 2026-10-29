import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Landing from "../routes/LandingPage/Landing";

vi.mock("react-i18next", () => ({
  useTranslation: () => [(key: string) => key],
}));

vi.mock("react-router", () => ({
  Link: () => null,
  useNavigate: () => vi.fn(),
}));

vi.mock("embla-carousel-react", () => ({
  default: () => [vi.fn(), undefined],
}));

vi.mock("~/components/feature/SearchBar/SearchBar", () => ({
  default: () => null,
}));

vi.mock("~/hooks/queries/useTopTypesOfServiceQuery", () => ({
  useTopTypesOfServiceQuery: () => ({ data: [] }),
}));

vi.mock("~/hooks/queries/useSiteReviewsQuery", () => ({
  useSiteReviewsQuery: () => ({ data: [] }),
}));

describe("Landing page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the page heading and banner carousel", () => {
    render(<Landing />);

    expect(screen.getByRole("heading", { name: "Header" })).toBeTruthy();
    expect(screen.getByAltText("Banner 1")).toBeTruthy();
  });
});
