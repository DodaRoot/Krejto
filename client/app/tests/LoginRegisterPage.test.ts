import { describe, expect, it } from "vitest";

import {
  validateLoginForm,
  validateRegisterForm,
} from "../routes/LoginRegisterPage/validation";

const translate = (key: string) => key;

describe("Login and registration validation", () => {
  it("requires login credentials", () => {
    expect(validateLoginForm({ email: "  ", password: "" }, translate)).toEqual(
      {
        email: "Email is required.",
        password: "Password is required.",
      },
    );
  });

  it("accepts valid registration details", () => {
    expect(
      validateRegisterForm(
        {
          fullName: "John Doe",
          email: "john@example.com",
          password: "secure123",
          phoneNumber: "+38344123456",
        },
        translate,
      ),
    ).toEqual({});
  });

  it("reports invalid registration details", () => {
    expect(
      validateRegisterForm(
        {
          fullName: "J",
          email: "not-an-email",
          password: "short",
          phoneNumber: "123",
        },
        translate,
      ),
    ).toEqual({
      fullName: "Full name must be at least 2 characters long.",
      email: "Enter a valid email address.",
      password: "Password must be at least 8 characters long.",
      phoneNumber: "Enter a valid phone number.",
    });
  });
});
