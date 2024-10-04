import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Option, SelectProps } from "../types";

const Select: React.FC<SelectProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // function to handle user select
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Select Box */}
      <div
        onClick={toggleDropdown}
        className={`w-full bg-white border ${
          isOpen ? "border-light-green" : "border-gray-300"
        } rounded-md shadow-[0px 1px 4px #00000014] p-2 flex justify-between items-center cursor-pointer`}
      >
        <span className="text-primary text-xs font-normal">
          {selectedOption ? selectedOption.label : options[0].label}
        </span>
        <MdArrowDropDown />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white shadow-[0px 1px 4px #00000014] max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                selectedOption?.value === option.value
                  ? "bg-secondary-bg text-primary text-xs font-normal"
                  : "text-primary text-xs font-normal"
              } hover:bg-secondary-bg`}
            >
              <span className="block truncate text-primary text-xs font-normal">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
