'use client';

import { Button } from '@/components/shared';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Dropdown from './drop-down';

export type CalendarProps = {
  defaultDate?: Date; // default date to display in the calendar
  onDateSelect: (date: Date) => void; // callback function to handle date selection
  onCancel: () => void; // callback function to handle cancel button click
  onConfirm: (date: Date) => void; // callback function to handle date selection
  className?: string; // class name for the calendar
  yearsBefore?: number; // Number of years to show before current year (default: 10)
  yearsAfter?: number; // Number of years to show after current year (default: 5)
  allowSunday?: boolean; // Whether to allow selecting Sundays (default: true)
  makeBlurBackground?: boolean; // Whether to render with blur background modal (default: true)
};

const Calendar: React.FC<CalendarProps> = ({
  defaultDate = new Date(),
  onDateSelect,
  onCancel,
  onConfirm,
  className = '',
  yearsBefore = 10,
  yearsAfter = 5,
  allowSunday = true,
  makeBlurBackground = true,
}) => {
  const createUTCDate = useCallback(
    (year: number, month: number, day: number) => {
      return new Date(Date.UTC(year, month, day));
    },
    []
  );

  const [currentViewDate, setCurrentViewDate] = useState<Date>(() =>
    createUTCDate(
      defaultDate.getUTCFullYear(),
      defaultDate.getUTCMonth(),
      defaultDate.getUTCDate()
    )
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(() =>
    createUTCDate(
      defaultDate.getUTCFullYear(),
      defaultDate.getUTCMonth(),
      defaultDate.getUTCDate()
    )
  );

  useEffect(() => {
    // Ensure the calendar view resets to the new default date when the prop changes,
    // creating the date consistently in UTC.
    const newDefaultDate = createUTCDate(
      defaultDate.getUTCFullYear(),
      defaultDate.getUTCMonth(),
      defaultDate.getUTCDate()
    );
    setCurrentViewDate(newDefaultDate);
    setSelectedDate(newDefaultDate);
  }, [defaultDate, createUTCDate]);

  const currentMonth = useMemo(
    () => currentViewDate.getUTCMonth(),
    [currentViewDate]
  );
  const currentYear = useMemo(
    () => currentViewDate.getUTCFullYear(),
    [currentViewDate]
  );

  const days = useMemo(
    () => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    []
  );
  const monthNames = useMemo(
    () =>
      Array.from({ length: 12 }, (_, idx) =>
        new Date(Date.UTC(0, idx)).toLocaleString('default', { month: 'long' })
      ),
    []
  );

  const currentSystemYear = new Date().getFullYear();
  const yearsRange = useMemo(
    () =>
      Array.from(
        { length: yearsBefore + yearsAfter + 1 },
        (_, i) => currentSystemYear - yearsBefore + i
      ),
    [currentSystemYear, yearsBefore, yearsAfter]
  );

  const firstDayOfMonth = new Date(
    Date.UTC(currentYear, currentMonth, 1)
  ).getUTCDay();
  const daysInCurrentMonth = new Date(
    Date.UTC(currentYear, currentMonth + 1, 0)
  ).getUTCDate();
  const calendarDays = Array.from(
    { length: daysInCurrentMonth },
    (_, i) => i + 1
  );

  const handleDayClick = useCallback(
    (day: number) => {
      const newSelectedDate = createUTCDate(currentYear, currentMonth, day);

      // Check if it's a Sunday and Sunday selection is not allowed
      if (!allowSunday && newSelectedDate.getUTCDay() === 0) {
        return; // Don't allow selection of Sunday
      }

      setSelectedDate(newSelectedDate);
      onDateSelect(newSelectedDate);
    },
    [currentYear, currentMonth, onDateSelect, createUTCDate, allowSunday]
  );

  const handleSetDate = useCallback(() => {
    if (selectedDate) {
      onConfirm(selectedDate);
    } else {
      onConfirm(createUTCDate(currentYear, currentMonth, 1));
    }
  }, [selectedDate, onConfirm, currentYear, currentMonth, createUTCDate]);

  const handleMonthChange = useCallback(
    (monthName: string) => {
      const newMonth = monthNames.indexOf(monthName);
      if (newMonth === -1) return;

      setCurrentViewDate((prevDate) => {
        const newViewDate = createUTCDate(
          prevDate.getUTCFullYear(),
          newMonth,
          prevDate.getUTCDate()
        );

        // Also update selected date to keep it in sync, but ensure the day is valid
        const daysInNewMonth = new Date(
          Date.UTC(prevDate.getUTCFullYear(), newMonth + 1, 0)
        ).getUTCDate();
        const validDay = Math.min(
          selectedDate?.getUTCDate() || 1,
          daysInNewMonth
        );
        const newSelectedDate = createUTCDate(
          prevDate.getUTCFullYear(),
          newMonth,
          validDay
        );

        setSelectedDate(newSelectedDate);

        // Defer parent notification until after render is complete
        setTimeout(() => {
          onDateSelect(newSelectedDate);
        }, 0);

        return newViewDate;
      });
    },
    [monthNames, createUTCDate, selectedDate, onDateSelect]
  );

  const handleYearChange = useCallback(
    (year: string) => {
      const newYear = Number(year);
      if (isNaN(newYear)) return;

      setCurrentViewDate((prevDate) => {
        const newViewDate = createUTCDate(
          newYear,
          prevDate.getUTCMonth(),
          prevDate.getUTCDate()
        );

        // Also update selected date to keep it in sync, but ensure the day is valid
        const daysInNewMonth = new Date(
          Date.UTC(newYear, prevDate.getUTCMonth() + 1, 0)
        ).getUTCDate();
        const validDay = Math.min(
          selectedDate?.getUTCDate() || 1,
          daysInNewMonth
        );
        const newSelectedDate = createUTCDate(
          newYear,
          prevDate.getUTCMonth(),
          validDay
        );

        setSelectedDate(newSelectedDate);

        // Defer parent notification until after render is complete
        setTimeout(() => {
          onDateSelect(newSelectedDate);
        }, 0);

        return newViewDate;
      });
    },
    [createUTCDate, selectedDate, onDateSelect]
  );

  const goToPreviousMonth = useCallback(() => {
    setCurrentViewDate((prevDate) => {
      // Adjust month in UTC - handle year boundary
      let newYear = prevDate.getUTCFullYear();
      let newMonth = prevDate.getUTCMonth() - 1;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      const newDate = createUTCDate(newYear, newMonth, prevDate.getUTCDate());
      return newDate;
    });
  }, [createUTCDate]);

  const goToNextMonth = useCallback(() => {
    setCurrentViewDate((prevDate) => {
      // Adjust month in UTC - handle year boundary
      let newYear = prevDate.getUTCFullYear();
      let newMonth = prevDate.getUTCMonth() + 1;

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      const newDate = createUTCDate(newYear, newMonth, prevDate.getUTCDate());
      return newDate;
    });
  }, [createUTCDate]);

  const calendarContent = (
    <div
      className={`bg-dark text-white w-full md:w-[300px] rounded-xl box-3d p-4 md:p-3 shadow-lg text-sm ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Dropdown
            options={monthNames}
            selected={monthNames[currentMonth]}
            onSelect={handleMonthChange}
            width="w-[110px]"
            borderColor="border-white/20"
            bgColor="bg-light"
            textColor="text-white/80"
            listBorderColor="border-white/20"
            buttonPaddingX="px-2"
            buttonPaddingY="py-1"
            listPaddingX="px-2"
            listPaddingY="py-1"
            className="text-xs [&>button]:!h-8"
          />
          <Dropdown
            options={yearsRange.map(String)}
            selected={String(currentYear)}
            onSelect={handleYearChange}
            width="w-[100px]"
            borderColor="border-white/20"
            bgColor="bg-light"
            textColor="text-white/80"
            listBorderColor="border-white/20"
            buttonPaddingX="px-2"
            buttonPaddingY="py-1"
            listPaddingX="px-2"
            listPaddingY="py-1"
             className="text-xs [&>button]:!h-8"
          />
        </div>

        <div className="ml-1 flex gap-1">
          <button type="button" onClick={goToPreviousMonth}>
            <ChevronLeft className="text-white/60 w-5 h-5" />
          </button>
          <button type="button" onClick={goToNextMonth}>
            <ChevronRight className="text-white/60 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 text-xs text-center mb-2 text-gray-400">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 text-center text-sm md:text-xs gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {calendarDays.map((day) => {
          const dayDate = createUTCDate(currentYear, currentMonth, day);
          const isSunday = dayDate.getUTCDay() === 0;
          const isClickable = allowSunday || !isSunday;
          const isSelected =
            selectedDate?.getUTCDate() === day &&
            selectedDate?.getUTCMonth() === currentMonth &&
            selectedDate?.getUTCFullYear() === currentYear;

          return (
            <div
              key={day}
              onClick={isClickable ? () => handleDayClick(day) : undefined}
              className={`flex items-center justify-center p-1.5 md:p-1 rounded-md transition-all duration-150 ${
                isSelected
                  ? 'border border-white/70 text-white'
                  : isSunday && !allowSunday
                  ? 'text-danger cursor-not-allowed'
                  : isSunday && allowSunday
                  ? 'text-danger cursor-pointer hover:bg-gray-700'
                  : 'cursor-pointer hover:bg-gray-700 text-gray-300'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-4 mt-6 md:mt-5">
        <Button
          title="Cancel"
          variant="secondary"
          size="sm"
          compact
          className="capitalize"
          onClick={onCancel}
        />
        <Button
          title="Set Date"
          variant="confirm"
          size="sm"
          compact
          className="capitalize"
          onClick={handleSetDate}
        />
      </div>
    </div>
  );

  // Return with or without blur background based on prop
  if (makeBlurBackground) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
        {calendarContent}
      </div>
    );
  }

  // When makeBlurBackground={false}, wrap with inline positioning
  return <div className="absolute left-0 mt-2 z-50">{calendarContent}</div>;
};

export default Calendar;
