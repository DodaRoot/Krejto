import Autoplay from "embla-carousel-autoplay";
import { ArrowUp, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

import { getCategories, getReviews } from "../mock/index";
import SearchBar from "../components/feature/SearchBar/SearchBar";

import bannerOne from "../assets/images/Banner.png";
import bannerTwo from "../assets/images/Banner2.png";
import bannerThree from "../assets/images/Banner3.png";
import bannerFour from "../assets/images/Banner4.png";
import headerSvg from "../assets/images/Header.svg";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import type { CardComponentProps, ReviewProps } from "../types/landing";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const CAROUSEL_ITEMS = [bannerOne, bannerTwo, bannerThree, bannerFour];
const CATEGORIES_LIST = getCategories().map((category) => category.name);
const REVIEWS_LIST = getReviews();

function CategoryCard({ name, description, image }: CardComponentProps) {
  return (
    <Card
      className="
        group mx-auto w-full max-w-sm overflow-hidden rounded-2xl
        border bg-card p-0 transition-all duration-300
        hover:shadow-xl sm:max-w-none gap-3
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

      <div className="space-y-3 p-3 sm:p-4">
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

function ReviewCard({ name, comment, stars }: ReviewProps) {
  const [t] = useTranslation();
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="m-2 w-full max-w-sm select-none">
      <CardContent className="flex flex-col p-3">
        {/* Stars */}
        <div className="mb-5 flex gap-1 items-center justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 ${
                i < stars
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Review */}
        <blockquote className="flex-1 wrap-break-word whitespace-normal text-sm text-center leading-7 text-muted-foreground">
          “{comment}”
        </blockquote>

        {/* Reviewer */}
        <div className="mt-6 flex items-center gap-3 border-t pt-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium leading-none">{name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("Verified Customer")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Landing() {
  const [t] = useTranslation();
  return (
    <div className="mt-1 flex flex-col gap-10 justify-center items-center">
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

      <SearchBar />

      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full overflow-clip rounded-xl"
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

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {getCategories().map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            description={category.description}
            image={""}
          />
        ))}
      </section>

      <section className="w-full flex gap-5">
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Si ta perdori Krejto.com</CardTitle>
            <CardDescription>
              Ketu mund te gjeni informate reth Krejto.com dhe perdorimit te tij
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Si mund te gjej sherbime?</AccordionTrigger>
                <AccordionContent>
                  Vetem kerko kategorine dhe qytetin qe deshironi dhe klikoni
                  butonin "Search" per te gjetur rezultatet.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Si mund te ofroj sherbime?</AccordionTrigger>
                <AccordionContent>
                  Vetem klikoni butonin "Ofroni sherbime" dhe plotesoni
                  formularin me te dhenat e nevojshme. Pas plotesimit, do te
                  merrni nje email konfirmimi dhe sherbimi juaj do te publikohet
                  ne platforme.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <Carousel
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
        }}
        className="max-w-xs sm:max-w-md lg:max-w-5xl overflow-clip rounded-xl"
      >
        <CarouselContent className="flex gap-5">
          {REVIEWS_LIST.map((review, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-2/3 lg:basis-1/3"
            >
              <ReviewCard
                name={review.name}
                comment={review.comment}
                stars={review.stars}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
