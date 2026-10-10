import { parsePhoneNumberFromString } from "libphonenumber-js";

import type {
  LoginData,
  LoginErrors,
  RegisterData,
  RegisterErrors,
} from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(
  values: LoginData,
  t: (key: string) => string,
): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.email.trim()) {
    errors.email = t("Email is required.");
  }

  if (!values.password.trim()) {
    errors.password = t("Password is required.");
  }

  return errors;
}

export function validateRegisterForm(
  values: RegisterData,
  t: (key: string) => string,
): RegisterErrors {
  const errors: RegisterErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const phoneNumber = values.phoneNumber.trim();

  if (fullName.length < 2) {
    errors.fullName = t("Full name must be at least 2 characters long.");
  }

  if (!email) {
    errors.email = t("Email is required.");
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = t("Enter a valid email address.");
  }

  if (!values.password) {
    errors.password = t("Password is required.");
  } else if (values.password.length < 8) {
    errors.password = t("Password must be at least 8 characters long.");
  } else if (!/[A-Za-z]/.test(values.password)) {
    errors.password = t("Password must include at least one letter.");
  } else if (!/\d/.test(values.password)) {
    errors.password = t("Password must include at least one number.");
  }

  if (!phoneNumber) {
    errors.phoneNumber = t("Phone number is required.");
  } else if (!parsePhoneNumberFromString(phoneNumber)?.isValid()) {
    errors.phoneNumber = t("Enter a valid phone number.");
  }

  return errors;
}
