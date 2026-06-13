import { useTranslation } from "react-i18next";

import { Search } from "lucide-react";

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

import { Button } from "../components/ui/button";

const cities = ["Prishtine", "Peje", "Gjilan", "Ferizaj"];
const categories = ["Cars", "Bikes", "Clothing", "Building Material"];
const distance = ["+1km", "+2km", "+3km", "+5km", "+10km"];

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="flex gap-3 flex-col md:flex-row">
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
    </div>
  );
}
