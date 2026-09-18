import React from 'react';

interface CustomNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  refocusOnScroll?: boolean;
}

export const CustomNumberInput = React.forwardRef<HTMLInputElement, CustomNumberInputProps>(
  ({ refocusOnScroll = false, onChange, value, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (['e', 'E', '+', '-', '.'].includes(e.key)) {
        e.preventDefault();
        return;
      }

      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Tab',
        'Home',
        'End',
      ];
      if (allowedKeys.includes(e.key)) {
        return;
      }

      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue === '' || /^[1-9]\d*$/.test(inputValue)) {
        if (onChange) onChange(e);
      } else if (/^0+$/.test(inputValue)) {
        e.target.value = '0';
        if (onChange) onChange(e);
      }
    };

    return (
      <input
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onWheel={e => {
          e.currentTarget.blur();
          e.stopPropagation();
          if (refocusOnScroll) {
            setTimeout(() => e.currentTarget.focus(), 0);
          }
        }}
      />
    );
  }
);

CustomNumberInput.displayName = 'CustomNumberInput';
