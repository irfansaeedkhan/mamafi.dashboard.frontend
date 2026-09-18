import { ChevronDown } from 'lucide-react';
import React, { ReactNode, useState } from 'react';

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  className?: string;

  // Separate paddings
  buttonPaddingX?: string;
  buttonPaddingY?: string;
  listPaddingX?: string;
  listPaddingY?: string;

  // Style control
  width?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  listBorderColor?: string;
  rounded?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  className = '',
  buttonPaddingX = 'px-3',
  buttonPaddingY = 'py-2',
  listPaddingX = 'px-3',
  listPaddingY = 'py-2',
  listBorderColor = 'border-white/20',
  width = 'w-full',
  borderColor = 'border-white/10',
  bgColor = 'bg-black',
  textColor = 'text-white/80',
  rounded = 'rounded-xl',
  icon = <ChevronDown size={18} className="ml-2 text-white/80" />,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={`relative ${width} ${className}`} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setDropdownOpen(!dropdownOpen);
        }}
        className={`flex h-9 w-full items-center justify-between truncate ${
          borderColor === 'border-none' ? 'border-none' : `border ${borderColor}`
        } ${bgColor} ${textColor} ${rounded} ${buttonPaddingX} ${buttonPaddingY} focus:outline-none focus:ring-0`}
        aria-expanded={dropdownOpen}
      >
        <span className="truncate">{selected || 'Select an option'}</span>
        {icon}
      </button>

      {dropdownOpen && (
        <ul
          className={`absolute z-[200] mt-2  max-h-52 w-full overflow-y-auto ${width} ${bgColor} border text-white ${listBorderColor} shadow-md ${rounded}`}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSelect(option);
                setDropdownOpen(false);
              }}
              className={`cursor-pointer  hover:bg-[#ffffff14] ${listPaddingX} ${listPaddingY} truncate`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
