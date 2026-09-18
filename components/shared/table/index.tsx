import React, { HTMLAttributes } from 'react';
import cn from '@/utils/cn';

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  element: 'tb' | 'th';
}

export const TableRow: React.FC<TableRowProps> = ({ className, ...props }) => {
  if (props.element === 'th') {
    return (
      <tr
        className={cn(
          'max-w-full flex-grow border-b border-primary text-left text-sm text-white',
          className
        )}
        {...props}
      />
    );
  }
  return (
    <tr
      className={cn(
        'bg-light-shade-1 max-w-full flex-grow border-b border-dark text-left text-sm text-white last:border-none',
        className
      )}
      {...props}
    />
  );
};

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  element: 'td' | 'th';
}

export const TableCell: React.FC<TableCellProps> = ({ element, className, ...props }) => {
  if (element === 'th') {
    return <th className={cn(className, 'flex-shrink-0 px-6 py-3 font-normal')} {...props} />;
  }
  return <td className={cn('flex-shrink-0 px-6 py-4 font-medium', className)} {...props} />;
};
