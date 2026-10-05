export interface NavItemTypes {
  icon: React.ReactNode;
  label: string;
  link: string;
  className?: string;
}

export interface NotificationsDropdownTypes {
  icon: React.ReactNode;
  label: string;
  t: any;
  isLoggedIn: boolean;
}

export interface ProfileMenuTypes {
  icon: React.ReactNode;
  label: string;
  t: any;
  preferences?: preferencesTypes;
  isLoggedIn: boolean;
}

export type preferencesTypes = {
  theme: any;
  lang: any;
};
