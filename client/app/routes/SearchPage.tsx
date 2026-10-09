import { useState } from "react";

import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/ui/card";

import { Slider } from "../components/ui/slider";

import { getMockServices } from "../mock";
import SearchCombobox from "../components/feature/SearchBar/SearchCombobox";

const typeOfProvider = ["Kompani", "Individ"];

export default function SearchPage() {
  const [value, setValue] = useState([0, 100]);
  const [t] = useTranslation();

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
              {t("Showing results for")} {" Electricist"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-border bg-card p-5 shadow-sm h-fit md:sticky md:top-8">
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
            <div className="space-y-2"></div>

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
              <SearchCombobox items={[]} placeholder="" />
            </div>
            <div className="space-y-2 flex gap-4">
              <Button variant="outline">{t("Filter")}</Button>
              <Button variant="outline" disabled>
                {t("Clear filters")}
              </Button>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {getMockServices.map((service) => (
              <Card
                key={service.id}
                className="border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardContent className="flex flex-col h-full p-0 group">
                  <div className="h-40 overflow-hidden bg-muted m-2 rounded-2xl">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={service.image}
                      alt={service.title}
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-4 grow">
                    <div>
                      <CardTitle className="text-base font-semibold text-foreground">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {service.description}
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
