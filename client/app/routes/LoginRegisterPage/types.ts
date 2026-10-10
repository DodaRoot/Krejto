import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import type { LucideIcon } from "lucide-react";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type LoginErrors = Partial<Record<keyof LoginData, string>>;
export type RegisterErrors = Partial<Record<keyof RegisterData, string>>;

export interface AuthFieldProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete: string;
  icon: LucideIcon;
  value: string;
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
