import { ArrowLeft, ImagePlus, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router";

import { Button } from "~/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import { useLocationsAndTypesQuery } from "~/hooks/queries/useLocationsAndTypesQuery";

export default function MyService() {
  const [t] = useTranslation();
  const { id } = useParams();

  const { state } = useLocation();

  const { data: options } = useLocationsAndTypesQuery();

  const isEditing = Boolean(id);

  if (useLocationsAndTypesQuery().isFetching) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 p-2 md:p-4">
      <header className="space-y-3">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("Back to profile")}
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">
            {isEditing ? t("Edit service") : t("Add a service")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("Share the details of the service you offer.")}
          </p>
        </div>
      </header>

      <form
        key={`${id ?? "new"}`}
        onSubmit={(event) => event.preventDefault()}
        className="space-y-7 rounded-lg bg-background p-5 shadow md:p-7"
      >
        <FieldSet>
          <FieldGroup className="gap-6">
            <section className="space-y-3">
              <div>
                <h2 className="text-base font-medium">{t("Photos")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("Add up to 3 photos of your service.")}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((index) => (
                  <label
                    key={index}
                    htmlFor={`service-photo-${index}`}
                    className="relative flex aspect-4/3 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-muted-foreground/30 bg-muted/30 text-center transition-colors hover:border-muted-foreground/60 hover:bg-muted/50"
                  >
                    <input
                      id={`service-photo-${index}`}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                    />
                    <ImagePlus
                      className="size-6 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">
                      {t("Add photo")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t("Photo {{number}}", { number: index + 1 })}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="service-type">
                  {t("Type of service")}
                </FieldLabel>
                {options?.typeOfServiceDTO.length ? (
                  <select
                    id="service-type"
                    defaultValue={
                      state?.getTypeOfServiceResponse?.serviceName ?? "default"
                    }
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="default" disabled>
                      {t("Select a service type")}
                    </option>
                    {options.typeOfServiceDTO.map((type) => (
                      <option key={type.serviceName} value={type.serviceName}>
                        {type.serviceName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id="service-type"
                    name="serviceType"
                    defaultValue={state?.getTypeOfServiceResponse?.serviceName}
                    placeholder={t("Enter a service type")}
                  />
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="service-price">{t("Price")}</FieldLabel>
                <div className="relative">
                  <Input
                    id="service-price"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={state?.price}
                    placeholder="00"
                    className="pr-10"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                    €
                  </span>
                </div>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="service-description">
                {t("Description")}
              </FieldLabel>
              <Textarea
                id="service-description"
                defaultValue={state?.description}
                placeholder={t("Describe the service you offer")}
                className="min-h-32 resize-y"
              />
            </Field>

            <Field>
              <FieldLabel>{t("Locations")}</FieldLabel>
              <div className="max-h-52 overflow-y-auto rounded-md border border-input p-3">
                {options?.locationDTO.length ? (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {options.locationDTO.map(({ location }, index) => (
                      <label
                        key={location}
                        htmlFor={`service-location-${index}`}
                        className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        <input
                          id={`service-location-${index}`}
                          type="checkbox"
                          name="locations"
                          value={location}
                          defaultChecked={
                            state?.getLocationsResponses.some(
                              (e: any) => e.location === location,
                            ) ?? false
                          }
                          className="size-4 accent-primary"
                        />
                        <MapPin
                          className="size-4 shrink-0 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <span>{location}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <Input
                    id="service-location"
                    name="locations"
                    placeholder={t("Enter a location")}
                  />
                )}
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="service-address">
                {t("Address")}{" "}
                <span className="text-muted-foreground">({t("Optional")})</span>
              </FieldLabel>
              <Input
                id="service-address"
                defaultValue={state?.address}
                placeholder={t("Street address or meeting point")}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
          <Button asChild variant="outline">
            <Link to="/profile">{t("Cancel")}</Link>
          </Button>
          <Button type="submit">
            {isEditing ? t("Save changes") : t("Publish service")}
          </Button>
        </div>
      </form>
    </div>
  );
}
