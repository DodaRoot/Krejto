import { Search, Heart, Badge } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

import bannerOne from "../assets/images/Banner.png";
import bannerTwo from "../assets/images/Banner2.png";
import bannerThree from "../assets/images/Banner3.png";
import bannerFour from "../assets/images/Banner4.png";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../components/ui/input-group";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../components/ui/combobox";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from "../components/ui/card";

import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";

import { Button } from "../components/ui/button";

const cities = ["Prishtine", "Peje", "Gjilan", "Ferizaj"];
const categories = ["Cars", "Bikes", "Clothing", "Building Material"];
const distance = ["+1km", "+2km", "+3km", "+5km", "+10km"];
const carouselItems = [bannerOne, bannerTwo, bannerThree, bannerFour];

const CardComponent = () => {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 shadow-lg">
      <div className="flex h-35 items-center justify-center">
        <img src={bannerOne} alt="Shoes" className="w-75" />
      </div>
      <Button
        size="icon"
        onClick={() => setLiked(!liked)}
        className="bg-primary/10 hover:bg-primary/20 absolute top-37 right-4 rounded-full"
      >
        {liked ? (
          <Heart className="fill-destructive stroke-destructive" />
        ) : (
          <Heart className="stroke-white" />
        )}
        <span className="sr-only">Like</span>
      </Button>
      <Card size="sm" className="ring-0">
        <CardHeader className="flex gap-5 align-middle">
          <CardTitle>Nike Jordan Air Rev</CardTitle>
          <Badge className="rounded-sm">This is me</Badge>
        </CardHeader>
        <CardContent>
          <p>
            Crossing hardwood comfort with off-court flair. &apos;80s-Inspired
            construction, bold details and nothin&apos;-but-net style.
          </p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">$69.99</span>
          </div>
          <Button size="lg">Add to cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5 mt-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full rounded-xl overflow-hidden"
      >
        <CarouselContent>
          {carouselItems.map((banner, index) => (
            <CarouselItem key={index}>
              <img src={banner} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <section className="searchBar flex gap-3 flex-col md:flex-row">
        <InputGroup className="md:max-w-xs">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end"></InputGroupAddon>
        </InputGroup>
        <Combobox items={categories}>
          <ComboboxInput placeholder="Select a category" />
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
        <div className="flex gap-3">
          <Combobox items={cities}>
            <ComboboxInput placeholder="Select a city" />
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
          <Combobox items={distance}>
            <ComboboxInput placeholder="Select distance" />
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
        </div>

        <Button>Search</Button>
      </section>
      <div className="w-full max-w-xs md:max-w-5xl">
        <Tabs defaultValue="hidraulik">
          <ScrollArea>
            {/* className="max-w-xs sm:max-w-2xl md:max-w-5xl h-12" */}
            <TabsList className="mb-3">
              <TabsTrigger value="hidraulik">Hidraulik</TabsTrigger>
              <TabsTrigger value="elektricist">Elektricist</TabsTrigger>
              <TabsTrigger value="mekanik">Mekanik</TabsTrigger>
              <TabsTrigger value="murator">Murator</TabsTrigger>
              <TabsTrigger value="pastrues">Pastrues</TabsTrigger>
              <TabsTrigger value="autolarje">Auto Larje</TabsTrigger>
              <TabsTrigger value="autolarje">Auto Larje</TabsTrigger>
              <TabsTrigger value="autolarje">Auto Larje</TabsTrigger>
              <TabsTrigger value="autolarje">Auto Larje</TabsTrigger>
              <TabsTrigger value="autolarje">Auto Larje</TabsTrigger>
              <TabsTrigger value="autolarje">Auto Larje</TabsTrigger>
              <TabsTrigger value="autolarje">Auto Larje</TabsTrigger>
              <TabsTrigger value="autolarje">Auto Larje</TabsTrigger>
              <TabsTrigger value="pastrues">Pastrues</TabsTrigger>
              <TabsTrigger value="pastrues">Pastrues</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="hidraulik" className="flex flex-col gap-5">
            <div className="flex gap-10">
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </div>
            <div className="flex gap-10">
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </div>
          </TabsContent>
          <TabsContent value="elektricist" className="flex flex-col gap-5">
            <div className="flex gap-10">
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </div>
            <div className="flex gap-10">
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </div>
          </TabsContent>
          <TabsContent value="mekanik">mekanik</TabsContent>
          <TabsContent value="murator">murator</TabsContent>
          <TabsContent value="pastrues">pastrues</TabsContent>
          <TabsContent value="autolarje">autolarje</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
