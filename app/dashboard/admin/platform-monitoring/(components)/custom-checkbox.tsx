import cn from '@/utils/cn';
import React from 'react';

interface CustomCheckboxProps {
  options: string[];
  selected: string[];
  onChange: (updated: string[]) => void;
  label?: string;
  className?: string;
  direction?: 'row' | 'column'; // 👈 new
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  options,
  selected,
  onChange,
  label,
  className,
  direction = 'column', // 👈 default is column
}) => {
  const toggleOption = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(updated);
  };

  return (
    <div>
      {label && <label className="mb-1 block text-sm text-white">{label}</label>}
      <div className={cn(direction === 'row' ? 'flex flex-wrap gap-6' : 'space-y-3', className)}>
        {options.map(option => {
          const isSelected = selected.includes(option);
          return (
            <div
              key={option}
              className="flex cursor-pointer items-center space-x-2 text-xs"
              onClick={() => toggleOption(option)}
            >
              <div
                className={`h-[14px] w-[14px] rounded-sm border transition ${
                  isSelected ? 'border-[#1c83ff] bg-[#1c83ff]' : 'border-[#334155] bg-[#05121E]'
                }`}
              />
              <span className={isSelected ? 'text-white' : 'text-white'}>{option}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCheckbox;
