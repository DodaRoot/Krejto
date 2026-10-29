import { describe, expect, it } from "vitest";

import { validateProfileForm } from "../routes/ProfilePage/Profile";

const translate = (key: string) => key;

describe("Profile form validation", () => {
  it("accepts valid profile details with an optional password", () => {
    expect(
      validateProfileForm(
        {
          name: "John Doe",
          number: "+38344123456",
          email: "john@example.com",
          password: "",
        },
        translate,
      ),
    ).toEqual({});
  });

  it("reports invalid profile details and passwords", () => {
    expect(
      validateProfileForm(
        {
          name: " ",
          number: "123",
          email: "invalid",
          password: "password",
        },
        translate,
      ),
    ).toEqual({
      name: "Full name must be at least 2 characters long.",
      number: "Enter a valid phone number.",
      email: "Enter a valid email address.",
      password: "Password must include at least one number.",
    });
  });
});
