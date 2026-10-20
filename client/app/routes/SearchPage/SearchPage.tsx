import {
  Image as ImageIcon,
  MapPin,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import SearchCombobox from "../../components/feature/SearchBar/SearchCombobox";
import { Form, useNavigate, useSearchParams } from "react-router";
import { useFilterServicesQuery } from "~/hooks/queries/useFilterServicesQuery";
import { useLocationsAndTypesQuery } from "~/hooks/queries/useLocationsAndTypesQuery";
import { Input } from "~/components/ui/input";

const sortOptions = [
  "priceAsc",
  "priceDesc",
  "createdAtAsc",
  "createdAtDesc",
] as const;

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const locationsAndTypes = useLocationsAndTypesQuery();

  const { data, isLoading, isError } = useFilterServicesQuery(
    searchParams.toString(),
  );
  const { t } = useTranslation();
  const locationsDTO = locationsAndTypes.data?.locationDTO;
  const typesOfServiceDTO = locationsAndTypes.data?.typeOfServiceDTO;
  const searchTerm =
    searchParams.get("typeOfService") ||
    searchParams.get("description") ||
    searchParams.get("location");
  const requestedSort = searchParams.get("sort");
  const selectedSort = sortOptions.find((option) => option === requestedSort);

  function onFormSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nextSearchParams = new URLSearchParams();
    const description = searchParams.get("description");
    if (description) {
      nextSearchParams.set("description", description);
    }

    const filterNames = ["typeOfService", "location", "priceStart", "priceEnd"];

    for (const name of filterNames) {
      const value = String(formData.get(name) ?? "").trim();
      if (value) {
        nextSearchParams.set(name, value);
      }
    }

    const selectedSort = formData.get("sort");
    if (
      typeof selectedSort === "string" &&
      sortOptions.some((option) => option === selectedSort)
    ) {
      nextSearchParams.set("sort", selectedSort);
    }

    nextSearchParams.set("page", "0");
    nextSearchParams.set("size", "6");

    navigate({
      pathname: "/search",
      search: `?${nextSearchParams.toString()}`,
    });
  }

  function onClearFilters() {
    navigate({
      pathname: "/search",
      search: "?page=0&size=6",
    });
  }

  return (
    <div className="mt-4 w-full">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {t("Search Results")}
          </h1>
          <div className="flex gap-3">
            {data && (
              <p className="text-sm">
                {t("Results", { count: data.totalElements })}
              </p>
            )}
            {searchTerm && (
              <p className="text-sm text-muted-foreground">
                {t("Showing results for")} {searchTerm}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <Form
          key={searchParams.toString()}
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
                items={locationsDTO?.map((location) => location.location) ?? []}
                placeholder={t("Select a city")}
                defaultValue={searchParams.get("location") ?? undefined}
              />
              <SearchCombobox
                name="typeOfService"
                items={
                  typesOfServiceDTO?.map((service) => service.serviceName) ?? []
                }
                placeholder={t("Select a category")}
                defaultValue={searchParams.get("typeOfService") ?? undefined}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("Price")}
              </Label>
              <div className="flex gap-3 justify-center items-center">
                <Input
                  type="number"
                  min="0"
                  step="any"
                  placeholder={t("Lowest Price")}
                  name="priceStart"
                  defaultValue={searchParams.get("priceStart") ?? ""}
                />
                <span>/</span>
                <Input
                  type="number"
                  min="0"
                  step="any"
                  placeholder={t("Highest Price")}
                  name="priceEnd"
                  defaultValue={searchParams.get("priceEnd") ?? ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("Sort by")}
              </Label>
              <SearchCombobox
                name="sort"
                items={[...sortOptions]}
                itemLabels={{
                  priceAsc: t("Price: Low to High"),
                  priceDesc: t("Price: High to Low"),
                  createdAtAsc: t("Oldest first"),
                  createdAtDesc: t("Newest first"),
                }}
                placeholder={t("Sort by")}
                defaultValue={selectedSort ?? "createdAtDesc"}
              />
            </div>
            <div className="space-y-2 flex gap-4">
              <Button variant="outline" type="submit">
                {t("Filter")}
              </Button>
              <Button variant="outline" type="button" onClick={onClearFilters}>
                {t("Clear filters")}
              </Button>
            </div>
          </div>
        </Form>

        <section className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {data?.content.map((service) => (
              <Link
                key={service.id}
                to={`/itemPage/${service.id}`}
                className="group/card rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Card className="h-full overflow-hidden border border-border py-0 shadow-sm transition-shadow group-hover/card:shadow-md">
                  <div
                    className="flex aspect-video items-center justify-center bg-muted text-muted-foreground"
                    aria-label={t("Service image coming soon")}
                  >
                    <ImageIcon aria-hidden="true" className="h-8 w-8" />
                  </div>

                  <CardContent className="flex h-full flex-col gap-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 space-y-1">
                        <span className="text-xs font-medium text-primary">
                          {service.getTypeOfServiceResponse.serviceName}
                        </span>
                        <CardTitle className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                          {service.description}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {service.getTypeOfServiceResponse.serviceDescription}
                        </CardDescription>
                      </div>
                      <span className="shrink-0 text-base font-semibold text-primary">
                        {new Intl.NumberFormat(undefined, {
                          style: "currency",
                          currency: "EUR",
                        }).format(service.price)}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t pt-3 text-sm text-muted-foreground">
                      <span className="flex min-w-0 items-center gap-2">
                        <MapPin
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0"
                        />
                        <span className="truncate">
                          {service.getLocationsResponses.length > 0
                            ? service.getLocationsResponses.join(", ")
                            : t("Location not specified")}
                          {service.address && ` · ${service.address}`}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <UserRound aria-hidden="true" className="h-4 w-4" />
                        <span className="max-w-28 truncate">
                          {service.getUserResponse.fullName}
                        </span>
                      </span>
                    </div>
                    {service.serviceReviews.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {t("Service reviews")} ({service.serviceReviews.length})
                      </span>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
            {isLoading && <p>{t("Loading...")}</p>}
            {isError && (
              <p role="alert">{t("Unable to load search results.")}</p>
            )}
            {!isLoading && !isError && data?.content.length === 0 && (
              <p>{t("No results found")}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
