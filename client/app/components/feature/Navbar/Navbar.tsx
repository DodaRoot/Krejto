import { Link, Form, useFetcher, Navigate, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import type {
  NavItemTypes,
  NotificationsDropdownTypes,
  ProfileMenuTypes,
  preferencesTypes,
} from "../../../types/navbar";
import {
  MessageCircleCheck,
  UserRound,
  LogOut,
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
import { useEffect, useState } from "react";
import { Button } from "@base-ui/react";
import postLogout from "~/apis/postLogout";

function NavItem({ icon, label, link, className }: NavItemTypes) {
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

function NotificationsDropdown({
  icon,
  label,
  t,
  isLoggedIn,
}: NotificationsDropdownTypes) {
  const navigate = useNavigate();
  return (
    <DropdownMenu
      onOpenChange={() => {
        if (!isLoggedIn) {
          navigate("/");
        }
      }}
    >
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

function ProfileMenu({
  icon,
  label,
  t,
  preferences,
  isLoggedIn,
}: ProfileMenuTypes) {
  const fetcher = useFetcher();
  const logoutMutation = postLogout();
  const navigate = useNavigate();
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logoutMutation.mutate(undefined, {
              onSuccess: () => {
                localStorage.removeItem("token");
                navigate("/");
              },
            });
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t("Profile")}</DropdownMenuLabel>
            <Link to={isLoggedIn ? "profile" : "loginregister"}>
              <DropdownMenuItem className="cursor-pointer">
                {icon}
                <p>{t("Profile")}</p>
              </DropdownMenuItem>
            </Link>
            <Link to={isLoggedIn ? "liked" : "loginregister"}>
              <DropdownMenuItem className="cursor-pointer">
                <Heart />
                <p>{t("Liked")}</p>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PaletteIcon />
                {t("Theme")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="ml-2">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{t("Appearance")}</DropdownMenuLabel>
                    <Form method="post">
                      <DropdownMenuRadioGroup
                        value={preferences?.theme ?? "light"}
                        onValueChange={(value) => {
                          fetcher.submit(
                            { theme: value },
                            { method: "POST", action: "/preferences" }, // or "/preferences"
                          );
                        }}
                      >
                        <DropdownMenuRadioItem value="light">
                          <SunIcon />
                          {t("Light")}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                          <MoonIcon />
                          {t("Dark")}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">
                          <MonitorIcon />
                          {t("System")}
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </Form>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Languages />
                {t("Language")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="ml-2">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{t("Language")}</DropdownMenuLabel>
                    <Form method="post">
                      <DropdownMenuRadioGroup
                        value={preferences?.lang ?? "al"}
                        onValueChange={(value) => {
                          fetcher.submit(
                            { lang: value },
                            { method: "POST", action: "/preferences" }, // or "/preferences"
                          );
                        }}
                      >
                        <DropdownMenuRadioItem value="en">
                          {t("En")}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="al">
                          {t("Al")}
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </Form>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {isLoggedIn && (
              <button type="submit">
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut />
                  <p>{"Logout"}</p>
                </DropdownMenuItem>
              </button>
            )}
          </DropdownMenuGroup>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar(preferences: preferencesTypes) {
  const [t] = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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
            link={"/"}
          />
          <NotificationsDropdown
            icon={<Bell />}
            label={t("Notifications")}
            t={t}
            isLoggedIn={isLoggedIn}
          />
          <NavItem
            link={isLoggedIn ? "messages" : "loginregister"}
            icon={<MessageCircleCheck />}
            label={t("Messages")}
          />
          <ProfileMenu
            icon={<UserRound />}
            label={t("Profile")}
            t={t}
            preferences={preferences}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </nav>
  );
}
