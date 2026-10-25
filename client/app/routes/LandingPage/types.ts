import type { NavigateFunction } from "react-router";
export interface CategoryCardProps {
  name: string;
  description: string;
  image: string;
  navigate: NavigateFunction;
}

export interface ReviewCardProps {
  name: string;
  comment: string;
  stars: number;
}
