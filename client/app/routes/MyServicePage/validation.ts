import type { TFunction } from "i18next";

import type { ServiceFormErrors, ServiceFormValues } from "./types";

export function validateServiceForm(
  values: ServiceFormValues,
  t: TFunction,
): ServiceFormErrors {
  const errors: ServiceFormErrors = {};

  if (!values.serviceTypeId) {
    errors.serviceType = t("Type of service is required.");
  }

  if (!values.price.trim()) {
    errors.price = t("Price is required.");
  } else {
    const price = Number(values.price);
    if (!Number.isFinite(price) || price < 0 || !Number.isInteger(price)) {
      errors.price = t("Enter a valid non-negative price.");
    }
  }

  if (!values.description.trim()) {
    errors.description = t("Description is required.");
  }

  if (values.locationIds.length === 0) {
    errors.locations = t("Select at least one location.");
  }

  return errors;
}
