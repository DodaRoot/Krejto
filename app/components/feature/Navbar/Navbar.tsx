import { useState, useEffect } from "react";

import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  MessageCircleCheck,
  UserRound,
  Heart,
  Bell,
  SquarePlus,
  PaletteIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  Languages,
  Box,
  House,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuGroup,
  DropdownMenuSubContent,
  DropdownMenuLabel,
} from "../../../components/ui/dropdown-menu";

export function NavItem({
  icon,
  label,
  link,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  link: string;
  className?: string;
}) {
  return (
    <Link
      to={link}
      className={
        "flex flex-col items-center justify-center cursor-pointer group w-14 size-5 " +
        className
      }
    >
      <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-200">
        <div className="group-hover:rotate-4 duration-200">{icon}</div>
      </div>
      <p className="text-xs opacity-50 group-hover:opacity-100 transition-opacity duration-200">
        {label}
      </p>
    </Link>
  );
}

export function NotificationsDropdown({
  icon,
  label,
  t,
}: {
  icon: React.ReactNode;
  label: string;
  t: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col items-center justify-center cursor-pointer group w-14 size-5">
          <div
            className={
              "opacity-50 group-hover:opacity-100 transition-opacity duration-200 group-data-[state=open]:opacity-100"
            }
          >
            <div
              className={
                "group-hover:rotate-4 duration-200 group-data-[state=open]:rotate-4"
              }
            >
              {icon}
            </div>
          </div>
          <p
            className={
              "text-xs opacity-50 group-hover:opacity-100 transition-opacity duration-200 group-data-[state=open]:opacity-100"
            }
          >
            {label}
          </p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={25}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-72"
      >
        {/* This is a example replace with real data in future */}
        <DropdownMenuLabel>{t("Notifications")}</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link to="new-post">Your post was seen by 100 people</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProfileMenu({
  icon,
  label,
  t,
  i18n,
}: {
  icon: React.ReactNode;
  label: string;
  t: any;
  i18n: any;
}) {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("al");

  useEffect(() => {
    i18n.changeLanguage(lang);
  });

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
    console.log("theme set to " + theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col items-center justify-center cursor-pointer group w-14 size-5">
          <div
            className={
              "opacity-50 group-hover:opacity-100 transition-opacity duration-200 group-data-[state=open]:opacity-100"
            }
          >
            <div
              className={
                "group-hover:rotate-4 duration-200 group-data-[state=open]:rotate-4"
              }
            >
              {icon}
            </div>
          </div>
          <p
            className={
              "text-xs opacity-50 group-hover:opacity-100 transition-opacity duration-200 group-data-[state=open]:opacity-100"
            }
          >
            {label}
          </p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={25}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("Profile")}</DropdownMenuLabel>
          <DropdownMenuItem>
            {icon}
            <Link to="profile">{t("Profile")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Heart />
            <Link to="liked">{t("Liked")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Box />
            <Link to="my-posts">{t("MyPosts")}</Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <PaletteIcon />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="ml-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="light">
                      <SunIcon />
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <MoonIcon />
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <MonitorIcon />
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages />
              Language
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="ml-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Language</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
                    <DropdownMenuRadioItem value="en">
                      English
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="al">
                      Albanian
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  const [t, i18n] = useTranslation();

  return (
    <nav className="py-2 px-5 w-full h-15 justify-center items-center flex shadow-md">
      <div className="text-lg font-bold w-5xl flex justify-center items-center md:justify-between">
        <div className="text-3xl font-bold">
          <Link className="hidden md:block" to="">
            {t("Title")}
          </Link>
        </div>
        <div className="flex space-x-4">
          <NavItem
            className="block md:hidden"
            icon={<House />}
            label={t("Home")}
            link=""
          />
          <NavItem link="my-posts" icon={<SquarePlus />} label={t("Post")} />
          <NotificationsDropdown
            icon={<Bell />}
            label={t("Notifications")}
            t={t}
          />
          {/* <NavItem icon={<Heart />} label={t("Liked")} /> */}
          <NavItem
            link={"messages"}
            icon={<MessageCircleCheck />}
            label={t("Messages")}
          />
          <ProfileMenu
            icon={<UserRound />}
            label={t("Profile")}
            t={t}
            i18n={i18n}
          />
        </div>
      </div>
    </nav>
  );
}
