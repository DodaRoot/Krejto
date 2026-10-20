import { useTranslation } from "react-i18next";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../ui/combobox";
import type { SearchComboboxProps } from "./types";

export default function SearchCombobox({
  items,
  placeholder,
  name,
  defaultValue,
  itemLabels,
}: SearchComboboxProps) {
  const [t] = useTranslation();

  return (
    <Combobox
      items={items}
      defaultValue={defaultValue}
      name={name}
      itemToStringLabel={(item) => itemLabels?.[item] ?? item}
      itemToStringValue={(item) => item}
    >
      <ComboboxInput
        placeholder={placeholder}
        className="min-w-1/5"
      />
      <ComboboxContent>
        <ComboboxEmpty>{t("No items found")}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {itemLabels?.[item] ?? item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
