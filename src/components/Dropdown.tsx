import { Listbox } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const options = [
  { label: "All Products", value: "" },
  { label: "Price: Low to High", value: "starting_price" },
  { label: "Price: High to Low", value: "-starting_price" },
  { label: "Name: A-Z", value: "name" },
  { label: "Name: Z-A", value: "-name" },
  { label: "Rating: High to Low", value: "average_rating" },
  { label: "Rating: Low to High", value: "-average_rating" },
];


interface SortDropdownProps {
  selected: string;
  setSelected: (value: string) => void;
}

export function SortDropdown({ selected, setSelected }: SortDropdownProps) {
  const selectedOption = options.find(opt => opt.value === selected) || options[0];

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative w-full">
          <Listbox.Button className="w-full h-11 flex items-center justify-between border-[3px] border-[#CACDD8] rounded-md px-4 text-black font-bold">
            <span className="truncate">
              <span className="text-gray-400">Sort By: </span> {selectedOption.label}
            </span>
            {open ? (
              <ChevronUp className="w-5 h-5 text-black" />
            ) : (
              <ChevronDown className="w-5 h-5 text-black" />
            )}
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border-[2px] border-[#CACDD8] rounded-md shadow-md max-h-60 overflow-auto text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 truncate"
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}
