import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound, { loader } from "../routes/NotFoundPage/NotFound";

describe("Not found page", () => {
  it("renders the not found message", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { name: "404 - Not Found" }),
    ).toBeTruthy();
  });

  it("throws a 404 response from its loader", () => {
    let response: unknown;

    try {
      loader();
    } catch (error) {
      response = error;
    }

    expect(response).toBeInstanceOf(Response);
    expect((response as Response).status).toBe(404);
  });
});
