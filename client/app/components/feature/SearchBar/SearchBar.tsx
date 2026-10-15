import { Form, useNavigate, useSearchParams } from "react-router";
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

  const navigate = useNavigate();

  function onFormSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const nextSearchParams = new URLSearchParams();

    nextSearchParams.set(
      "description",
      String(formData.get("description") ?? ""),
    );
    nextSearchParams.set(
      "typeOfService",
      String(formData.get("typeOfService") ?? ""),
    );
    nextSearchParams.set("location", String(formData.get("location") ?? ""));

    navigate({
      pathname: "/search",
      search: `?${nextSearchParams.toString()}`,
    });
  }

  return (
    <Form
      onSubmit={onFormSubmit}
      className="searchBar flex flex-col gap-3 md:flex-row w-full"
    >
      <InputGroup className="min-w-1/5">
        <InputGroupInput
          className="appearance-none "
          name="description"
          placeholder={t("Search placeholder")}
          autoComplete="off"
        />

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end" />
      </InputGroup>

      <SearchCombobox
        name="typeOfService"
        items={locationsDTO?.map((location) => location.location) || []}
        placeholder={t("Select a category")}
      />

      <SearchCombobox
        name="location"
        items={typesOfServiceDTO?.map((service) => service.serviceName) || []}
        placeholder={t("Select a city")}
      />

      <Button type="submit">{t("Search")}</Button>
    </Form>
  );
}
