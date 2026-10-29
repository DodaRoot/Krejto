import i18next from "i18next";
import { beforeAll, describe, expect, it } from "vitest";

import { validateServiceForm } from "../routes/MyServicePage/validation";

let translate: ReturnType<typeof i18next.getFixedT>;

beforeAll(async () => {
  const instance = i18next.createInstance();
  await instance.init({ lng: "en", resources: { en: { translation: {} } } });
  translate = instance.getFixedT("en");
});

describe("Service form validation", () => {
  it("accepts complete service details", () => {
    expect(
      validateServiceForm(
        {
          serviceTypeId: "service-1",
          price: "25",
          description: "Professional cleaning",
          locationIds: ["location-1"],
        },
        translate,
      ),
    ).toEqual({});
  });

  it("reports missing and invalid service details", () => {
    expect(
      validateServiceForm(
        {
          price: "-1",
          description: " ",
          locationIds: [],
        },
        translate,
      ),
    ).toEqual({
      serviceType: "Type of service is required.",
      price: "Enter a valid non-negative price.",
      description: "Description is required.",
      locations: "Select at least one location.",
    });
  });
});
