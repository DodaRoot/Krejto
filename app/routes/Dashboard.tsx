import Autoplay from "embla-carousel-autoplay";
import { ArrowUp, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import data from "../mock/data.json";

import bannerOne from "../assets/images/Banner.png";
import bannerTwo from "../assets/images/Banner2.png";
import bannerThree from "../assets/images/Banner3.png";
import bannerFour from "../assets/images/Banner4.png";
import headerSvg from "../assets/images/Header.svg";

import { Button } from "../components/ui/button";

import { Card } from "../components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../components/ui/combobox";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";

const CITIES = ["Prishtine", "Peje", "Gjilan", "Ferizaj"];

const CAROUSEL_ITEMS = [bannerOne, bannerTwo, bannerThree, bannerFour];

const CATEGORIES = data.categories.map((category) => category.name);

interface CardComponentProps {
  name: string;
  description: string;
  image: string;
}

interface SearchComboboxProps {
  items: string[];
  placeholder: string;
}

function SearchCombobox({ items, placeholder }: SearchComboboxProps) {
  return (
    <Combobox items={items}>
      <ComboboxInput placeholder={placeholder} className="min-w-1/5" />

      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>

        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function CardComponent({ name, description, image }: CardComponentProps) {
  return (
    <Card
      className="
        group mx-auto w-full max-w-sm overflow-hidden rounded-2xl
        border bg-card p-0 transition-all duration-300
        hover:shadow-xl sm:max-w-none
      "
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={name}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold sm:text-lg">{name}</h3>

          <ArrowUp
            className="
              h-4 w-4 opacity-0 transition-all duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              group-hover:opacity-100
            "
          />
        </div>

        <p className="text-xs text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const [t] = useTranslation();

  return (
    <div className="mt-1 flex flex-col gap-10">
      <section className="w-full py-8">
        <div
          className="
            mx-auto grid max-w-5xl grid-cols-1
            items-center gap-6 md:grid-cols-2
          "
        >
          <div className="space-y-3 text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
              {t("Header")}
            </h1>

            <p className="text-sm text-muted-foreground md:text-base">
              {t("Header Description")}
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <img src={headerSvg} alt="Header illustration" className="w-80" />
          </div>
        </div>
      </section>

      <section className="searchBar flex flex-col gap-3 md:flex-row">
        <InputGroup className="min-w-1/5">
          <InputGroupInput placeholder="Search..." />

          <InputGroupAddon>
            <Search />
          </InputGroupAddon>

          <InputGroupAddon align="inline-end" />
        </InputGroup>

        <SearchCombobox items={CATEGORIES} placeholder="Select a category" />

        <SearchCombobox items={CITIES} placeholder="Select a city" />

        <Button>Search</Button>
      </section>

      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full overflow-hidden rounded-xl"
      >
        <CarouselContent>
          {CAROUSEL_ITEMS.map((banner, index) => (
            <CarouselItem key={index}>
              <img src={banner} alt={`Banner ${index + 1}`} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <p>{t("Most Searched")}</p>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.categories.map((category) => (
          <CardComponent
            key={category.id}
            name={category.name}
            description={category.description}
            image={category.image}
          />
        ))}
      </section>
    </div>
  );
}
