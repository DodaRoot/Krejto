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
}: SearchComboboxProps) {
  const [t] = useTranslation();

  return (
    <Combobox items={items}>
      <ComboboxInput placeholder={placeholder} className="min-w-1/5" />
      <ComboboxContent>
        <ComboboxEmpty>{t("No items found")}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}