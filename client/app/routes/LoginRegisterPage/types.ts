import type { ChangeEvent } from "react";
import type { LucideIcon } from "lucide-react";

export interface AuthFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  icon: LucideIcon;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}