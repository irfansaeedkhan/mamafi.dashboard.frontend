'use client';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useOnClickOutside } from 'usehooks-ts';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (label: string) => void;
  error?: string;
  placeholder: string;
}

export const YearDropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue = '',
  onSelect,
  error,
  placeholder,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: DropdownOption) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  const selectedLabel = selectedOption ? selectedOption.label : '';

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div className="relative w-full max-w-[120px] flex-grow" ref={ref}>
      <div
        className={clsx(
          'w-full max-w-[120px] cursor-pointer rounded-md border px-2 py-1 text-sm text-white focus:outline-none',
          isOpen ? 'border-brand-gold' : 'border-gray-shade-1/10',
          error ? 'border-brand-red' : ''
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span
            className={clsx(
              'word-break text-xs md:text-sm',
              selectedLabel === '' && 'text-white/20'
            )}
          >
            {selectedLabel === '' ? placeholder : selectedLabel}
          </span>
          {isOpen ? (
            <SlArrowUp className="size-3 fill-gray" />
          ) : (
            <SlArrowDown className="size-3 fill-gray" />
          )}
        </div>
        {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
      </div>
      {isOpen && (
        <ul className="absolute z-50 mt-2 flex max-h-[220px] w-full flex-col items-center justify-center overflow-y-auto rounded-md  border bg-dark text-white shadow-lg hover:text-white">
          {options.map(option => (
            <li
              key={option.value}
              className={clsx(
                'word-break w-full cursor-pointer px-2  py-1 text-xs text-white hover:bg-light hover:text-white',
                option.value === selectedValue ? 'bg-[#2a3132]' : ''
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
