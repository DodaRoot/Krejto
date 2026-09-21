export interface CardComponentProps {
  name: string;
  description: string;
  image: string;
}

export interface SearchComboboxProps {
  items: string[];
  placeholder: string;
}

export interface ReviewProps {
  name: string;
  comment: string;
  stars: number;
}
