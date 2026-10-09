import { Form } from "react-router";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../ui/input-group";
import { useLocationsAndTypesQuery } from "../../../hooks/queries/useLocationsAndTypesQuery";
import SearchCombobox from "../SearchBar/SearchCombobox";

export default function SearchBar() {
  const { data } = useLocationsAndTypesQuery();

  const locationsDTO = data?.locationDTO;
  const typesOfServiceDTO = data?.typeOfServiceDTO;

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
        items={locationsDTO?.map((location) => location.location) || []}
        placeholder={t("Select a category")}
      />

      <SearchCombobox
        items={typesOfServiceDTO?.map((service) => service.serviceName) || []}
        placeholder={t("Select a city")}
      />

      <Button type="submit">{t("Search")}</Button>
    </Form>
  );
}
