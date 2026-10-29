import type { RouterContextProvider } from "react-router";
import { loader } from "../routes/IndexPage/Index";
import { describe, expect, it } from "vitest";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { userPrefs } from "~/cookies.server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const cookieHeader = await userPrefs.serialize({
  theme: "dark",
  lang: "al",
});

const mockRequest = {
  request: new Request("http://localhost", {
    headers: { Cookie: cookieHeader },
  }),
  url: new URL("http://localhost"),
  params: {},
  pattern: "/",
  context: {} as Readonly<RouterContextProvider>,
};

describe("Cookie Loader Tests", () => {
  it("loader is callable", () => {
    const testLoader = loader(mockRequest);
    expect(testLoader).toStrictEqual(Promise.resolve());
  });
  it("loader returns theme and lang", async () => {
    const testLoader = await loader(mockRequest);
    const { theme, lang } = testLoader;
    expect(theme).toBe("dark");
    expect(lang).toBe("al");
  });
});
