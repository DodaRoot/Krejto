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
}

export interface ProfileMenuTypes {
  icon: React.ReactNode;
  label: string;
  t: any;
  preferences?: preferencesTypes;
}

export type preferencesTypes = {
  theme: any;
  lang: any;
};
