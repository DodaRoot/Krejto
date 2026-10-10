import type { MockService } from "../../mock";

export interface ProfileHeaderProps {
  name: string;
  activeDate: string;
}

export interface ProfileFormProps {
  nameData: string;
  numberData: string;
  emailData: string;
}

export interface ServiceCardProps {
  service: MockService;
}
