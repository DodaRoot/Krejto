export interface SearchComboboxProps {
  items: string[];
  placeholder: string;
  name: string;
  id?: string;
  defaultValue?: string;
  itemLabels?: Record<string, string>;
  includeAll?: boolean;
}
