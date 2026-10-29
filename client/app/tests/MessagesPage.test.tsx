import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Messages from "../routes/MessagesPage/Messages";

vi.mock("react-i18next", () => ({
  useTranslation: () => [(key: string) => key],
}));

describe("Messages page", () => {
  it("shows the inbox and initial conversation", () => {
    render(<Messages />);

    expect(screen.getByRole("heading", { name: "Inbox" })).toBeTruthy();
    expect(
      screen.getAllByRole("heading", { name: "Arta Krasniqi" }).length,
    ).toBe(2);
    expect(
      screen.getByText("Përshëndetje, a jeni e lirë për një instalim nesër?"),
    ).toBeTruthy();
  });
});
