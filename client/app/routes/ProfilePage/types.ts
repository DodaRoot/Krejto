import type { MockService } from "../../mock";

export interface ProfileHeaderProps {
  name: string;
  activeDate: string;
}

export interface ProfileFormProps {
  fullName: string;
  number: string;
  email: string;
}

export interface ServiceCardProps {
  service: MockService;
}
