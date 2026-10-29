import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Liked from "../routes/LikedPage/Liked";

describe("Liked page", () => {
  it("renders its page title", () => {
    render(<Liked />);

    expect(screen.getByRole("heading", { name: "Liked" })).toBeTruthy();
  });
});
