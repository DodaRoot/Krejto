import type { Route } from "./+types/ItemPage";
import { useState, useEffect } from "react";

import bannerOne from "../../assets/images/Banner.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../components/ui/carousel";
import type { CarouselProgress } from "./types";

export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}

export default function ItemPage({ loaderData }: Route.ComponentProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState<CarouselProgress>({
    current: 0,
    count: 0,
  });
  useEffect(() => {
    if (!api) {
      return;
    }
    setProgress({
      count: api.scrollSnapList().length,
      current: api.selectedScrollSnap() + 1,
    });
    api.on("select", () => {
      setProgress((currentProgress) => ({
        ...currentProgress,
        current: api.selectedScrollSnap() + 1,
      }));
    });
  }, [api]);

  return (
    <div className="flex gap-5 w-full">
      <section className="w-2/3 h-90">
        <Carousel
          setApi={setApi}
          className="w-full h-full flex justify-center items-center rounded-2xl"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className={`flex items-center justify-center h-90 w-full bg-gray-400`}
              >
                <img src={bannerOne}></img>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute left-2 top-1/2 z-10">
            <CarouselPrevious
              variant="default"
              className="relative left-0 translate-x-0"
            />
          </div>
          <div className="absolute right-2 top-1/2 z-10">
            <CarouselNext
              variant="default"
              className="relative right-0 translate-x-0"
            />
          </div>
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {progress.current} of {progress.count}
        </div>
      </section>
      <aside className="w-1/3 bg-blue-400"></aside>
    </div>
  );
}
