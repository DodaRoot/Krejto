import { Outlet, useNavigation, useLocation } from "react-router";
import type { Route } from "./+types/Index";
import { userPrefs } from "../cookies.server";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/feature/Navbar/Navbar";
import Banner from "../components/feature/Banner/Banner";
import Footer from "../components/feature/Footer/Footer";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  return { theme: cookie.theme, lang: cookie.lang };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const [t, i18n] = useTranslation();
  const { theme, lang } = loaderData;
  const location = useLocation();
  const hideFooterRoutes = ["/messages"];

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (theme == "system" && typeof window !== "undefined") {
      let systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Banner />
      <Navbar theme={theme} lang={lang} />
      <div className="w-full justify-center items-center flex py-2 px-5">
        <div className="w-5xl flex justify-center items-center md:justify-between">
          <Outlet />
        </div>
      </div>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}
