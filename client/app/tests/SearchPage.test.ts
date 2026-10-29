import { describe, expect, it } from "vitest";

import { getVisiblePages } from "../routes/SearchPage/SearchPage";

describe("Search pagination", () => {
  it("returns no pages when there are no results pages", () => {
    expect(getVisiblePages(0, 0)).toEqual([]);
  });

  it("shows the first, last, and nearby pages", () => {
    expect(getVisiblePages(5, 10)).toEqual([0, 4, 5, 6, 9]);
  });

  it("does not duplicate pages near the beginning", () => {
    expect(getVisiblePages(0, 3)).toEqual([0, 1, 2]);
  });
});
