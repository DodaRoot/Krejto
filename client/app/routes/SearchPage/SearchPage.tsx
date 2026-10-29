import { Fragment, useEffect, type SubmitEvent } from "react";
import {
  Image as ImageIcon,
  MapPin,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Form, Link, useNavigate, useSearchParams } from "react-router";

import SearchCombobox, {
  ALL_OPTION_VALUE,
} from "~/components/feature/SearchBar/SearchCombobox";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Skeleton } from "~/components/ui/skeleton";
import { useFilterServicesQuery } from "~/hooks/queries/useFilterServicesQuery";
import { useLocationsAndTypesQuery } from "~/hooks/queries/useLocationsAndTypesQuery";
import type { SearchFilterName, SearchSortOption } from "./types";

const sortOptions = [
  "priceAsc",
  "priceDesc",
  "createdAtAsc",
  "createdAtDesc",
] satisfies readonly SearchSortOption[];
const filterNames = [
  "typeOfService",
  "location",
  "priceStart",
  "priceEnd",
] satisfies readonly SearchFilterName[];
const filterLabelClassName =
  "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground";
const euroFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

export function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 0) {
    return [];
  }

  const pages = new Set([0, totalPages - 1]);

  for (
    let page = Math.max(0, currentPage - 1);
    page <= Math.min(totalPages - 1, currentPage + 1);
    page += 1
  ) {
    pages.add(page);
  }

  return [...pages].sort((a, b) => a - b);
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const parsedPage = Number(searchParams.get("page") ?? 0);
  const pageIndex =
    Number.isSafeInteger(parsedPage) && parsedPage >= 0 ? parsedPage : 0;
  const parsedSize = Number(searchParams.get("size") ?? 6);
  const pageSize =
    Number.isSafeInteger(parsedSize) && parsedSize > 0 ? parsedSize : 6;
  const requestSearchParams = new URLSearchParams(searchParams);
  requestSearchParams.set("page", pageIndex.toString());
  requestSearchParams.set("size", pageSize.toString());

  const { data: locationsAndTypes } = useLocationsAndTypesQuery();

  const { data, isLoading, isError } = useFilterServicesQuery(
    requestSearchParams.toString(),
  );
  const { t } = useTranslation();
  const locationsDTO = locationsAndTypes?.locationDTO;
  const typesOfServiceDTO = locationsAndTypes?.typeOfServiceDTO;
  const selectedServiceType = searchParams.get("typeOfService");
  const searchTerm =
    searchParams.get("description") || searchParams.get("location");
  const requestedSort = searchParams.get("sort");
  const selectedSort = sortOptions.find((option) => option === requestedSort);
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (isLoading || isError || !data || pageIndex < data.totalPages) {
      return;
    }

    const lastPage = Math.max(0, data.totalPages - 1);
    if (pageIndex === lastPage) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", lastPage.toString());
    nextSearchParams.set("size", pageSize.toString());
    navigate(
      {
        pathname: "/search",
        search: `?${nextSearchParams.toString()}`,
      },
      { replace: true },
    );
  }, [data, isError, isLoading, navigate, pageIndex, pageSize, searchParams]);

  const pageNumbers = getVisiblePages(pageIndex, totalPages);

  function onFormSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nextSearchParams = new URLSearchParams();
    const description = searchParams.get("description");
    if (description) {
      nextSearchParams.set("description", description);
    }

    for (const name of filterNames) {
      const value = String(formData.get(name) ?? "").trim();
      if (value && value !== ALL_OPTION_VALUE) {
        nextSearchParams.set(name, value);
      }
    }

    const selectedSort = sortOptions.find(
      (option) => option === formData.get("sort"),
    );
    if (selectedSort) {
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

  function getPageLocation(page: number) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", page.toString());
    nextSearchParams.set("size", pageSize.toString());

    return {
      pathname: "/search",
      search: `?${nextSearchParams.toString()}`,
    };
  }

  return (
    <div className="mt-4 w-full">
      <div className="mb-6 space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {selectedServiceType ? (
              <>
                {t("Results for")} {selectedServiceType}
              </>
            ) : (
              t("Search Results")
            )}
          </h1>
          {data && (
            <Badge variant="outline">
              {t("Results", { count: data.totalElements })}
            </Badge>
          )}
        </div>
        {!selectedServiceType && searchTerm && (
          <p className="text-sm text-muted-foreground">
            {t("Showing results for")} {searchTerm}
          </p>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <Form
          key={searchParams.toString()}
          onSubmit={onFormSubmit}
          className="h-fit md:sticky md:top-8"
        >
          <Card className="gap-0">
            <CardHeader className="flex items-center gap-3 px-5 py-5">
              <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <CardTitle>{t("Filter by")}</CardTitle>
                <CardDescription className="text-xs">
                  {t("Refine your search using categories and location")}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 px-5 pb-5">
              <Field>
                <FieldLabel
                  htmlFor="location-filter"
                  className={filterLabelClassName}
                >
                  {t("Location")}
                </FieldLabel>
                <SearchCombobox
                  name="location"
                  id="location-filter"
                  items={
                    locationsDTO?.map((location) => location.location) ?? []
                  }
                  includeAll
                  placeholder={t("Select a city")}
                  defaultValue={searchParams.get("location") ?? undefined}
                />
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="service-type-filter"
                  className={filterLabelClassName}
                >
                  {t("Category")}
                </FieldLabel>
                <SearchCombobox
                  name="typeOfService"
                  id="service-type-filter"
                  items={
                    typesOfServiceDTO?.map((service) => service.serviceName) ??
                    []
                  }
                  includeAll
                  placeholder={t("Select a category")}
                  defaultValue={selectedServiceType ?? undefined}
                />
              </Field>

              <FieldSet className="gap-2">
                <FieldLegend
                  variant="label"
                  className={`mb-2 ${filterLabelClassName} text-xs`}
                >
                  {t("Price")}
                </FieldLegend>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="price-start" className="sr-only">
                      {t("Lowest Price")}
                    </FieldLabel>
                    <Input
                      id="price-start"
                      type="number"
                      min="0"
                      step="any"
                      placeholder={t("Lowest Price")}
                      name="priceStart"
                      defaultValue={searchParams.get("priceStart") ?? ""}
                    />
                  </Field>
                  <span aria-hidden="true" className="text-muted-foreground">
                    /
                  </span>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="price-end" className="sr-only">
                      {t("Highest Price")}
                    </FieldLabel>
                    <Input
                      id="price-end"
                      type="number"
                      min="0"
                      step="any"
                      placeholder={t("Highest Price")}
                      name="priceEnd"
                      defaultValue={searchParams.get("priceEnd") ?? ""}
                    />
                  </Field>
                </div>
              </FieldSet>

              <Field>
                <FieldLabel
                  htmlFor="sort-filter"
                  className={filterLabelClassName}
                >
                  {t("Sort by")}
                </FieldLabel>
                <SearchCombobox
                  name="sort"
                  id="sort-filter"
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
              </Field>
            </CardContent>
            <CardFooter className="flex gap-3 border-t px-5 py-4">
              <Button className="flex-1" type="submit">
                {t("Filter")}
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                type="button"
                onClick={onClearFilters}
              >
                {t("Clear filters")}
              </Button>
            </CardFooter>
          </Card>
        </Form>

        <section aria-label={t("Search Results")} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {data?.content.map((service) => (
              <Link
                key={service.id}
                to={`/itemPage/${service.id}`}
                state={{ service }}
                className="group/search-result rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Card className="h-full overflow-hidden py-0 shadow-sm transition-shadow group-hover/search-result:shadow-md">
                  <div
                    className="flex aspect-video items-center justify-center bg-muted text-muted-foreground"
                    role="img"
                    aria-label={t("Service image coming soon")}
                  >
                    <ImageIcon aria-hidden="true" className="h-8 w-8" />
                  </div>

                  <CardContent className="flex h-full flex-col gap-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 space-y-1">
                        <Badge variant="secondary">
                          {service.getTypeOfServiceResponse.serviceName}
                        </Badge>
                        <CardTitle className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                          {service.description}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {service.getTypeOfServiceResponse.serviceDescription}
                        </CardDescription>
                      </div>
                      <span className="shrink-0 text-base font-semibold text-primary">
                        {euroFormatter.format(service.price)}
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
                            ? service.getLocationsResponses
                                .map((location) => location.location)
                                .join(", ")
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
                      <Badge variant="outline" className="self-start">
                        {t("Service reviews")} ({service.serviceReviews.length})
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
            {isLoading && (
              <div className="col-span-full" role="status">
                <span className="sr-only">{t("Loading...")}</span>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {Array.from({ length: 4 }, (_, index) => (
                    <Card key={index} className="overflow-hidden py-0">
                      <Skeleton className="aspect-video w-full rounded-none" />
                      <CardContent className="space-y-3 p-4">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex justify-between border-t pt-3">
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {isError && (
              <Alert variant="destructive" className="col-span-full">
                <AlertTitle>{t("Unable to load search results.")}</AlertTitle>
              </Alert>
            )}
            {!isLoading && !isError && data?.content.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                  <ImageIcon
                    aria-hidden="true"
                    className="size-8 text-muted-foreground"
                  />
                  <CardTitle>{t("No results found")}</CardTitle>
                </CardContent>
              </Card>
            )}
          </div>
          {!isLoading && !isError && data && totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    to={getPageLocation(Math.max(0, pageIndex - 1))}
                    disabled={pageIndex === 0}
                  />
                </PaginationItem>
                {pageNumbers.map((page, index, pages) => (
                  <Fragment key={page}>
                    {index > 0 && page - pages[index - 1] > 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        to={getPageLocation(page)}
                        isActive={page === pageIndex}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  </Fragment>
                ))}
                <PaginationItem>
                  <PaginationNext
                    to={getPageLocation(
                      Math.min(totalPages - 1, pageIndex + 1),
                    )}
                    disabled={pageIndex >= totalPages - 1}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </div>
    </div>
  );
}
