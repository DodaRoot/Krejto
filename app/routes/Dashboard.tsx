import { Search } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import data from "../mock/data.json";

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
  CardTitle,
  CardContent,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

const cities = ["Prishtine", "Peje", "Gjilan", "Ferizaj"];
const categories = ["Cars", "Bikes", "Clothing", "Building Material"];
const distance = ["+1km", "+2km", "+3km", "+5km", "+10km"];
const carouselItems = [bannerOne, bannerTwo, bannerThree, bannerFour];

const CardComponent = (props: {
  name: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="relative w-full md:w-xs rounded-xl bg-linear-to-r shadow-xl p-0">
      <div className="flex items-center justify-center">
        <img src={props.image} alt="Shoes" className="w-max rounded-xl" />
      </div>

      <Card size="default" className="ring-0 gap-3 py-5">
        <CardHeader className="flex gap-3 justify-between items-center">
          <CardTitle className="font-bold">{props.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{props.description}</p>
        </CardContent>
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

      <Tabs
        defaultValue={data.TabCategories[0].title}
        className="w-full max-w-5xl gap-0"
      >
        <TabsList className="mb-3 min-w-max">
          {data.TabCategories.map((item) => (
            <TabsTrigger key={item.title} value={item.title}>
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <h2 className="pb-3">Kategorite me te kerkuara</h2>

        {data.TabCategories.map((item) => (
          <TabsContent
            key={item.title}
            value={item.title}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {Object.entries(item.categories).map((key, index) => (
              <CardComponent
                key={key[0]}
                name={item.categories[index]}
                description={item.description[index]}
                image={item.images[index]}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
