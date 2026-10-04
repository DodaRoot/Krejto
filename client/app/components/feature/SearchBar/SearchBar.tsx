import { Form } from "react-router";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../../ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../ui/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../ui/input-group";
import type { SearchComboboxProps } from "../../../types/landing";
import getLocationsAndTypesQuery from "~/apis/getLocationsAndTypes";

function SearchCombobox({ items, placeholder }: SearchComboboxProps) {
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

export default function SearchBar() {
  const { data } = getLocationsAndTypesQuery();

  const locations = data?.locations;
  const typesOfService = data?.typesOfService;

  const [t] = useTranslation();

  return (
    <Form
      method="get"
      action="/search"
      className="searchBar flex flex-col gap-3 md:flex-row w-full"
    >
      <InputGroup className="min-w-1/5">
        <InputGroupInput
          className="appearance-none "
          name="query"
          placeholder={t("Search placeholder")}
          autoComplete="off"
        />

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end" />
      </InputGroup>

      <SearchCombobox
        items={
          typesOfService?.map(
            (service: { serviceName: string }) => service.serviceName,
          ) || []
        }
        placeholder={t("Select a category")}
      />

      <SearchCombobox
        items={
          locations?.map(
            (location: { location: string }) => location.location,
          ) || []
        }
        placeholder={t("Select a city")}
      />

      <Button type="submit">{t("Search")}</Button>
    </Form>
  );
}
