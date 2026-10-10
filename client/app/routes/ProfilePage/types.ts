import type { MockService } from "../../mock";

export interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarPreview: string;
  activeDate: string;
}

export interface ProfileFormProps {
  name: string;
  number: string;
  email: string;
}

export interface ServiceCardProps {
  service: MockService;
}