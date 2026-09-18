'use client';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
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
  enableFilter?: boolean;
  className?: string;
}

export const CountryDropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue = '',
  onSelect,
  error,
  placeholder,
  enableFilter = true,
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
    onSelect(option.label);
    setIsOpen(false);
    setSearchTerm(''); // Clear search term on selection
  };

  const selectedOption = options.find(
    option => option.label === selectedValue || option.value === selectedValue
  );

  const selectedLabel = selectedOption ? selectedOption.label : '';

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <div
        className={clsx(
          'w-full cursor-pointer rounded-full border bg-dark px-4 py-4 text-sm text-white focus:outline-none',
          isOpen ? 'border-white' : 'border-primary',
          error ? 'border-brand-red' : '',
          className
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
        <div className="custom-scrollbar absolute z-[500] mt-2 max-h-[200px] w-full overflow-y-auto rounded-xl border border-white bg-primary text-white shadow-lg">
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
                  option.value === selectedValue ? 'bg-gray-shade-1/60' : ''
                )}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-white">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

const YourComponent = () => {
  const [userInfo, setUserInfo] = useState({
    phonecountry: {
      country: '',
    },
  });

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    // add more countries as needed
  ];

  return (
    <div className="inputMain">
      <label className="inputLabel">Country</label>
      <CountryDropdown
        placeholder="Select Country"
        options={countries}
        selectedValue={userInfo.phonecountry.country}
        onSelect={(country: string) => {
          setUserInfo(prev => ({
            ...prev,
            phonecountry: {
              ...prev.phonecountry,
              country: country,
            },
          }));
        }}
        enableFilter={true} // Enable filter for country selection
      />
    </div>
  );
};

export default YourComponent;
