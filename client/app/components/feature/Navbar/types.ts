import type { ComponentProps, ReactNode } from "react";
import type { TFunction } from "i18next";

export interface NavItemProps {
  icon: ReactNode;
  label: string;
  link: string;
  className?: string;
}

export interface NotificationsDropdownProps {
  icon: ReactNode;
  label: string;
  t: TFunction;
  isLoggedIn: boolean;
}

export interface ProfileMenuProps {
  icon: ReactNode;
  label: string;
  t: TFunction;
  preferences?: NavbarPreferences;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export interface NavbarPreferences {
  theme?: string;
  lang?: string;
}

export interface MenuButtonProps extends ComponentProps<"button"> {
  icon: ReactNode;
  label: string;
}
