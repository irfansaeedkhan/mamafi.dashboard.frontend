import cn from '@/utils/cn';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
import { NetworkOption } from './profile-card-data';

type Props = {
  items: NetworkOption[];
  onSelect: (item: NetworkOption) => void;
  bgColor?: string;
};

const Dropdown: React.FC<Props> = ({ items, onSelect, bgColor = 'bg-light' }) => {
  const [selectedValue, setSelectedValue] = useState(items[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: NetworkOption) => {
    setSelectedValue(item.value);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          `flex w-full cursor-pointer items-center justify-between rounded-full bg-light p-3 focus:outline-none`,
          bgColor
        )}
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <div className="flex items-center">
          <div className="size-7 relative mr-2">
            {items.find(option => option.value === selectedValue)?.icon1 && (
              <Image
                src={
                  items.find(option => option.value === selectedValue)?.icon1 ||
                  '/images/placeholder.png'
                }
                alt="US$"
                width={28}
                height={28}
                className="size-7 flex-shrink-0"
              />
            )}
            {items.find(option => option.value === selectedValue)?.icon1 &&
              items.find(option => option.value === selectedValue)?.icon2 && (
                <Image
                  src={
                    items.find(option => option.value === selectedValue)?.icon2 ||
                    '/images/placeholder.png'
                  }
                  alt="US$"
                  width={14}
                  height={14}
                  className="absolute -right-1 bottom-0 w-[0.86rem] flex-shrink-0"
                />
              )}
          </div>
          {items.find(option => option.value === selectedValue)?.label && (
            <span className="flex flex-wrap pl-2 text-sm">
              <span className="font-medium text-white">
                {items.find(option => option.value === selectedValue)?.label || ''}
              </span>
              <span className="ml-1 rounded-md px-2 py-0.5  text-xs text-gray">
                {items.find(option => option.value === selectedValue)?.network || ''}
              </span>
            </span>
          )}
        </div>
        <IoIosArrowDropdown className="size-6 h-6 w-6 shrink-0 fill-white" />
      </button>
      <ul
        className={`absolute left-0 top-full z-[100] w-full cursor-pointer overflow-hidden rounded-md bg-dark shadow-xl ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {items.map((item: NetworkOption) => (
          <li
            key={item.value}
            className="relative z-50 px-3 py-2 text-left hover:bg-light"
            onClick={() => handleSelect(item)}
          >
            <span className="flex items-center">
              <div className="size-7 relative mr-2">
                <Image
                  src={item.icon1}
                  alt="US$"
                  width={28}
                  height={28}
                  className="size-7 flex-shrink-0"
                />
                {item.icon2 && (
                  <Image
                    src={item.icon2}
                    alt="US$"
                    width={14}
                    height={14}
                    className="absolute -right-1 bottom-0 w-[0.86rem] flex-shrink-0"
                  />
                )}
              </div>
              <span className="flex flex-wrap pl-2 text-sm">
                <span className="font-medium text-white">{item?.label}</span>
                <span className="ml-1 rounded-md px-2 py-0.5 text-xs text-gray">
                  {item?.network}
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
