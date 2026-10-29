import { describe, expect, it } from "vitest";

import { userPrefs } from "../cookies.server";
import { action } from "../routes/PreferencesPage/Preferences";

describe("Preferences action", () => {
  it("updates submitted preferences while preserving existing cookie values", async () => {
    const cookieHeader = await userPrefs.serialize({
      theme: "dark",
      lang: "al",
    });
    const formData = new FormData();
    formData.set("theme", "light");
    const request = new Request("http://localhost/preferences", {
      method: "POST",
      headers: { Cookie: cookieHeader },
      body: formData,
    });

    const response = await action({
      request,
    } as Parameters<typeof action>[0]);
    const updatedCookie = await userPrefs.parse(
      response.headers.get("Set-Cookie"),
    );

    expect(response.status).toBe(200);
    expect(updatedCookie).toMatchObject({ theme: "light", lang: "al" });
  });
});
