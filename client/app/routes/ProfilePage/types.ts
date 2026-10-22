import type { GetMyServicesResponse } from "~/apis/getMyServices/types";

export interface ProfileHeaderProps {
  activeDate: string;
}

export interface ProfileFormProps {
  fullName: string;
  number: string;
  email: string;
}

export interface ServiceCardProps {
  service: GetMyServicesResponse;
}

export interface ProfileFormValues {
  name: string;
  number: string;
  email: string;
  password: string;
}

export type ProfileFormErrors = Partial<
  Record<keyof ProfileFormValues, string>
>;
