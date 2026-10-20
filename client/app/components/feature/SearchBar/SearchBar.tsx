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
    const description = String(formData.get("description"));
    const typeOfService = String(formData.get("typeOfService"));
    const location = String(formData.get("location"));
    const page = "0";
    const size = "6";

    description ? nextSearchParams.set("description", description) : false;
    typeOfService
      ? nextSearchParams.set("typeOfService", typeOfService)
      : false;
    location ? nextSearchParams.set("location", location) : false;
    page ? nextSearchParams.set("page", page) : false;
    size ? nextSearchParams.set("size", size) : false;

    navigate(
      {
        pathname: "/search",
        search: `?${nextSearchParams.toString()}`,
      },
      {
        state: {
          locationsDTO: locationsDTO,
          typesOfServiceDTO: typesOfServiceDTO,
        },
      },
    );
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
        name="location"
        items={locationsDTO?.map((location) => location.location) || []}
        placeholder={t("Select a city")}
      />

      <SearchCombobox
        name="typeOfService"
        items={typesOfServiceDTO?.map((service) => service.serviceName) || []}
        placeholder={t("Select a category")}
      />

      <Button type="submit">{t("Search")}</Button>
    </Form>
  );
}
