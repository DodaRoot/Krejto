import { describe, expect, it } from "vitest";
import { isRecord, isFilterService } from "../routes/ItemPage/ItemPage";

const filterService = {
  id: "service-001",
  description: "Professional house cleaning service",
  price: 50,
  address: "123 Main Street",
  getLocationsResponses: [
    {
      id: "location-001",
      location: "Pristina",
    },
  ],
  serviceReviews: [],
  getTypeOfServiceResponse: {
    serviceName: "Cleaning",
    serviceDescription: "Residential and commercial cleaning services",
  },
  getUserResponse: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+38344123456",
    createdAt: "2026-01-15T10:00:00.000Z",
  },
};

console.log(isFilterService(filterService)); // true

describe("Item Page Functions Tests", () => {
  it("isRecord works", () => {
    expect(isRecord("")).toBe(false);
    expect(isRecord({ randomString: "randomString" })).toBe(true);
  });
  it("isFilterService works", () => {
    expect(isFilterService("")).toBe(false);
    expect(isFilterService(filterService)).toBe(true);
  });
});
