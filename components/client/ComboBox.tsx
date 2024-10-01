import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface Item {
  id_entidade: string;
  name: string;
  nuit: string;
}

interface ComboBoxProps {
  label: string;
  placeholder: string;
  onSelect: (value: string) => void;
  items: Item[];
  displayKey: keyof Item;
  onSelectKey: keyof Item;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  placeholder,
  onSelect,
  items,
  displayKey,
  onSelectKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item[displayKey].toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, items, displayKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: Item) => {
    setSearch(item[displayKey]);
    setIsOpen(false);
    onSelect(item[onSelectKey]);
  };

  return (
    <div className="relative flex flex-row items-center gap-4 " ref={ref}>
      <label htmlFor={`combobox-${label}`} className="text-md font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={`combobox-${label}`}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
      {isOpen && filteredItems.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {filteredItems.map((item) => (
            <li
              key={item.id_entidade}
              onClick={() => handleSelect(item)}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-black"
            >
              {item[displayKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
