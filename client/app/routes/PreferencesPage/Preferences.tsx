import { userPrefs } from "../../cookies.server";
import type { Route } from "./+types/Preferences";
import type { PreferenceUpdates } from "./types";

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const formData = await request.formData();

  const updates: PreferenceUpdates = {};
  const theme = formData.get("theme");
  const lang = formData.get("lang");

  if (typeof theme === "string") {
    updates.theme = theme;
  }

  if (typeof lang === "string") {
    updates.lang = lang;
  }

  Object.assign(cookie, updates);

  return new Response(null, {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
}
