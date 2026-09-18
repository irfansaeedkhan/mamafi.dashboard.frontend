'use client';
import { AppRoutes } from '@/constants/app-routes';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/shared';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { YearDropdown } from '../dashboard/year-drop-down';

const dataYears = [
  { value: '2023', label: '2023' },
  { value: 'jan_2024', label: 'Jan 2024' },
  { value: 'feb_2024', label: 'Feb 2024' },
  { value: 'mar_2024', label: 'Mar 2024' },
  { value: 'apr_2024', label: 'Apr 2024' },
];

export const InvoiceTop = () => {
  const pathname = usePathname();
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <div className="flex items-center justify-between gap-5 pb-5">
      <div className="flex items-center gap-2.5">
        <Link href={AppRoutes.profile.terms}>
          <Button
            className={clsx(
              'w-fit !rounded-full px-4 py-3 font-kanit text-sm text-white opacity-90',
              pathname === AppRoutes.profile.my_invoice && '!border-blue-shade-1 border'
            )}
            variant="secondary"
            title="Terms and conditions"
          />
        </Link>
      </div>
      {pathname === AppRoutes.profile.terms ? (
        <YearDropdown
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={year => handleYearChange(year)}
        />
      ) : (
        <p className="text-sm font-medium text-white/80">
          Last Updated: February 23, 2024 (dummy data)
        </p>
      )}
    </div>
  );
};
