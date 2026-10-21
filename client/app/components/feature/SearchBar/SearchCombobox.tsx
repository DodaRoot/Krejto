import { useTranslation } from "react-i18next";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "~/components/ui/combobox";
import type { SearchComboboxProps } from "./types";

export const ALL_OPTION_VALUE = "__all__";

export default function SearchCombobox({
  items,
  placeholder,
  name,
  id,
  defaultValue,
  itemLabels,
  includeAll = false,
}: SearchComboboxProps) {
  const [t] = useTranslation();
  const options = includeAll ? [...items, ALL_OPTION_VALUE] : items;
  const getItemLabel = (item: string) =>
    item === ALL_OPTION_VALUE && includeAll
      ? t("All")
      : (itemLabels?.[item] ?? item);

  return (
    <Combobox
      items={options}
      defaultValue={defaultValue ?? (includeAll ? ALL_OPTION_VALUE : undefined)}
      name={name}
      itemToStringLabel={getItemLabel}
      itemToStringValue={(item) => item}
    >
      <ComboboxInput id={id} placeholder={placeholder} className="min-w-1/5" />
      <ComboboxContent>
        <ComboboxEmpty>{t("No items found")}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {getItemLabel(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
