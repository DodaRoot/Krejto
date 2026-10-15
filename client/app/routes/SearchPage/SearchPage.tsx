import { useState } from "react";

import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import { Slider } from "../../components/ui/slider";

import { getMockServices } from "../../mock";
import SearchCombobox from "../../components/feature/SearchBar/SearchCombobox";
import type { PriceRange } from "./types";
import { Form, useLocation, useNavigate, useSearchParams } from "react-router";
import { useFilterServicesQuery } from "~/hooks/queries/useFilterServicesQuery";
import { useLocationsAndTypesQuery } from "~/hooks/queries/useLocationsAndTypesQuery";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const locationsAndTypes = state ? state : useLocationsAndTypesQuery();
  console.log("🚀 ~ SearchPage ~ locationsAndTypes:", locationsAndTypes);

  const { data } = useFilterServicesQuery(searchParams.toString());
  const [value, setValue] = useState<PriceRange>([0, 100]);
  const [t] = useTranslation();
  const locationsDTO = locationsAndTypes.locationsDTO;
  const typesOfServiceDTO = locationsAndTypes.typesOfServiceDTO;

  function onFormSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nextSearchParams = new URLSearchParams();
    const typeOfService = String(formData.get("typeOfService"));
    const location = String(formData.get("location"));

    typeOfService
      ? nextSearchParams.set("typeOfService", typeOfService)
      : false;
    location ? nextSearchParams.set("location", location) : false;

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
    <div className="mt-4 w-full">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {t("Search Results")}
          </h1>
          <div className="flex gap-3">
            <p className="text-sm">
              {getMockServices.length} {t("Results")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("Showing results for")} {searchParams.get("typeOfService")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <Form
          onSubmit={onFormSubmit}
          className="rounded-3xl border border-border bg-card p-5 shadow-sm h-fit md:sticky md:top-8"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2 text-primary">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">{t("Filter by")}</p>
              <p className="text-xs text-muted-foreground">
                {t("Refine your search using categories and location")}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
              <SearchCombobox
                name="location"
                items={
                  locationsDTO?.map((location: any) => location.location) || []
                }
                placeholder={t("Select a city")}
              />
              <SearchCombobox
                name="typeOfService"
                items={
                  typesOfServiceDTO?.map(
                    (service: any) => service.serviceName,
                  ) || []
                }
                placeholder={t("Select a category")}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("Price")}:<span>{value.join(" - ")}</span>
              </Label>
              <Slider
                id="slider-demo-temperature"
                value={value}
                onValueChange={setValue}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("Sort by")}
              </Label>
              <SearchCombobox name="sort-by" items={[]} placeholder="" />
            </div>
            <div className="space-y-2 flex gap-4">
              <Button variant="outline" type="submit">
                {t("Filter")}
              </Button>
              <Button variant="outline" disabled>
                {t("Clear filters")}
              </Button>
            </div>
          </div>
        </Form>

        <section className="space-y-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {data?.map((service) => (
              <Card
                key={service.id}
                className="border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardContent className="flex flex-col h-full p-0 group">
                  <div className="h-40 overflow-hidden bg-muted m-2 rounded-2xl">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={""}
                      alt={service.getTypeOfServiceResponse.serviceName}
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-4 grow">
                    <div>
                      <CardTitle className="text-base font-semibold text-foreground">
                        {service.description}
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {service.getUserResponse.fullName}
                      </CardDescription>
                    </div>
                    <div className="text-base font-semibold text-primary mt-auto">
                      {service.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
