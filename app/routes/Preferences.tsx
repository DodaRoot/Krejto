import { userPrefs } from "../cookies.server";
import type { Route } from "./+types/Preferences";

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const formData = await request.formData();

  const theme = formData.get("theme");
  const lang = formData.get("lang");

  if (typeof theme === "string") {
    cookie.theme = theme;
  }

  if (typeof lang === "string") {
    cookie.lang = lang;
  }

  return new Response(null, {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
}
