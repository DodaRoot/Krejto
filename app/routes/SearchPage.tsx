import { Link } from "react-router";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { mockServices } from "../mock/services";

export default function SearchPage() {
  const [t] = useTranslation();

  return (
    <div className="mt-4 w-full">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("Showing results for")}{" "}
            <span className="font-semibold text-foreground">“services”</span>
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {t("Search Results")}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" disabled>
            {t("Clear filters")}
          </Button>
          <Link to="/" className="text-sm text-primary hover:underline">
            {t("Back to Home")}
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-border bg-card p-5 shadow-sm">
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
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("Category")}
              </label>
              <Input readOnly placeholder={t("Select a category")} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("Location")}
              </label>
              <Input readOnly placeholder={t("City, Country")} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("Sort by")}
              </label>
              <Button
                variant="outline"
                className="w-full justify-between"
                disabled
              >
                {t("Relevance")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {mockServices.length} {t("Results")}
              </p>
              <h2 className="text-lg font-semibold text-foreground">
                {t("Service offers")}
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Input
                readOnly
                placeholder={t("Search placeholder")}
                className="w-60"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {mockServices.map((service) => (
              <Card key={service.id} className="border border-border shadow-sm">
                <CardContent className="space-y-4 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {service.title}
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                    <div className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {service.category}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm font-semibold text-foreground">
                      {service.price}
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      {t("View details")}
                    </Button>
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
