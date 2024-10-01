import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  label: string;
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  placeholder,
  onSearch,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="search-input"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id="search-input"
          type="text"
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
      </div>
    </div>
  );
};

export default SearchInput;
