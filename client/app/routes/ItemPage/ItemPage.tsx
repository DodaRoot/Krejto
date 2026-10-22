import { ArrowLeft, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

import type { FilterService } from "~/apis/filterServices/types";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import type { Route } from "./+types/ItemPage";
import type { ItemPageLocationState } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFilterService(value: unknown): value is FilterService {
  if (!isRecord(value)) {
    return false;
  }

  const locations = value.getLocationsResponses;
  const typeOfService = value.getTypeOfServiceResponse;
  const user = value.getUserResponse;

  return (
    typeof value.id === "string" &&
    typeof value.description === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    (typeof value.address === "string" || value.address === null) &&
    Array.isArray(locations) &&
    locations.every(
      (location: unknown) =>
        isRecord(location) &&
        typeof location.id === "string" &&
        typeof location.location === "string",
    ) &&
    Array.isArray(value.serviceReviews) &&
    isRecord(typeOfService) &&
    typeof typeOfService.serviceName === "string" &&
    typeof typeOfService.serviceDescription === "string" &&
    isRecord(user) &&
    typeof user.fullName === "string" &&
    typeof user.email === "string" &&
    typeof user.phoneNumber === "string" &&
    typeof user.createdAt === "string"
  );
}

const euroFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}

export default function ItemPage({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const state = location.state as ItemPageLocationState;
  const service = isFilterService(state?.service) ? state.service : null;

  if (!service || service.id !== loaderData) {
    return (
      <div className="mx-auto max-w-3xl py-8">
        <Alert>
          <AlertTitle>{t("Service details unavailable")}</AlertTitle>
          <AlertDescription>
            {t(
              "Open this service from the search results to view its details.",
            )}
          </AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/search">
            <ArrowLeft aria-hidden="true" />
            {t("Back to search results")}
          </Link>
        </Button>
      </div>
    );
  }

  const memberSinceDate = new Date(service.getUserResponse.createdAt);
  const memberSince = Number.isNaN(memberSinceDate.getTime())
    ? null
    : memberSinceDate.toLocaleDateString();

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 py-6">
      <Button asChild variant="ghost" className="-ml-3">
        <Link to="/search">
          <ArrowLeft aria-hidden="true" />
          {t("Back to search results")}
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,1fr)]">
        <section className="space-y-6" aria-label={t("Service photos")}>
          <Carousel opts={{ loop: false }} className="mx-12">
            <CarouselContent>
              {Array.from({ length: 3 }, (_, index) => (
                <CarouselItem key={index}>
                  <Skeleton
                    className="aspect-[16/10] w-full rounded-xl"
                    role="img"
                    aria-label={t("Service photo placeholder {{number}}", {
                      number: index + 1,
                    })}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="outline"
              className="left-[-3rem]"
              aria-label={t("Previous photo")}
            />
            <CarouselNext
              variant="outline"
              className="right-[-3rem]"
              aria-label={t("Next photo")}
            />
          </Carousel>

          <Card>
            <CardHeader>
              <CardTitle>{t("About this service")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">
                  {t("Description")}
                </h2>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">
                  {t("Category")}
                </h2>
                <p className="mt-1 text-sm">
                  {service.getTypeOfServiceResponse.serviceName}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {service.getTypeOfServiceResponse.serviceDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader className="space-y-3">
              <Badge variant="secondary" className="w-fit">
                {service.getTypeOfServiceResponse.serviceName}
              </Badge>
              <CardTitle className="text-2xl">{service.description}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-lg font-semibold text-primary">
                {euroFormatter.format(service.price)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-2">
                <h2 className="text-sm font-medium">{t("Locations")}</h2>
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  <span>
                    {service.getLocationsResponses.length > 0
                      ? service.getLocationsResponses
                          .map((location) => location.location)
                          .join(", ")
                      : t("Location not specified")}
                    {service.address && ` · ${service.address}`}
                  </span>
                </p>
                {service.address && (
                  <p className="pl-6 text-sm text-muted-foreground">
                    {t("Address")}: {service.address}
                  </p>
                )}
              </div>
              <Separator />
              <div className="space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-medium">
                  <UserRound aria-hidden="true" className="size-4" />
                  {t("Provider")}
                </h2>
                <p className="text-sm font-medium">
                  {service.getUserResponse.fullName}
                </p>
                <a
                  className="flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
                  href={`mailto:${service.getUserResponse.email}`}
                >
                  <Mail aria-hidden="true" className="size-4" />
                  {service.getUserResponse.email}
                </a>
                <a
                  className="flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
                  href={`tel:${service.getUserResponse.phoneNumber}`}
                >
                  <Phone aria-hidden="true" className="size-4" />
                  {service.getUserResponse.phoneNumber}
                </a>
                {memberSince && (
                  <p className="text-sm text-muted-foreground">
                    {t("Member since")}: {memberSince}
                  </p>
                )}
              </div>
              <Separator />
              <Badge variant="outline">
                {t("Service reviews")} ({service.serviceReviews.length})
              </Badge>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
