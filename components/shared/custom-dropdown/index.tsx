'use client';
import clsx from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import { SlArrowUp, SlArrowDown } from 'react-icons/sl';
import { useOnClickOutside } from 'usehooks-ts';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (label: string) => void;
  error?: string;
  placeholder: string;
  bgColor?: string;
  enableFilter?: boolean;
  className?: string;
}

export const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue = '',
  onSelect,
  error,
  placeholder,
  bgColor = 'light',
  enableFilter = false,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (enableFilter) {
      setFilteredOptions(
        options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options, enableFilter]);

  const handleOptionClick = (option: DropdownOption) => {
    onSelect(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  const selectedLabel = selectedOption ? selectedOption.label : '';

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <div
        className={clsx(
          `w-full cursor-pointer rounded-xl border  bg-${bgColor} px-4 py-4 text-sm text-white focus:outline-none`,
          isOpen ? 'border-primary' : 'border-primary/10',
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
        <div className="custom-scrollbar absolute z-[500] mt-2 max-h-[200px] w-full overflow-y-auto rounded-xl bg-primary text-white shadow-lg">
          {enableFilter && (
            <input
              type="text"
              className="search-input border-gray-shade-3 w-full border-b border-transparent bg-transparent px-4 py-2 outline-none"
              placeholder="Type to filter..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <div
                key={option.value}
                className={clsx(
                  'word-break cursor-pointer rounded-xl px-4 py-2 hover:bg-light',
                  option.value === selectedValue ? 'bg-primary' : ''
                )}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="text-gray-500 px-4 py-2">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

const YourComponent = () => {
  const [formState, setFormState] = useState({
    step_2nd: {
      country: '',
    },
  });

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    // add more countries as needed
  ];

  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return (
    <div className="inputMain">
      <label className="inputLabel">Country</label>
      <CustomDropdown
        placeholder="Select Country"
        options={countries}
        selectedValue={formState.step_2nd.country}
        onSelect={(country: string) => {
          setFormState(prev => ({
            ...prev,
            step_2nd: {
              ...prev.step_2nd,
              country: country,
            },
          }));
        }}
        enableFilter={true} // Enable filter for country selection
      />

      <label className="inputLabel">Gender</label>
      <CustomDropdown
        placeholder="Select Gender"
        options={genders}
        selectedValue={formState.step_2nd.country}
        onSelect={(gender: string) => {
          setFormState(prev => ({
            ...prev,
            step_2nd: {
              ...prev.step_2nd,
              gender: gender,
            },
          }));
        }}
        enableFilter={false} // Disable filter for gender selection
      />
    </div>
  );
};

export default YourComponent;
