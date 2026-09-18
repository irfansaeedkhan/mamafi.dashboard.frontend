import { ClockIcon } from '@/assets/svgs';
import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  unit: string;
  time: string;
  color: string;
}

interface RentalStatsCardsProps {
  totalRentedHours: string;
  todayRentedHours: string;
  totalSales: string;
  todaySales: string;
  totalRevenues: string;
  todayRevenues: string;
  refreshRate: number;
}

const RentalStatsCards: React.FC<RentalStatsCardsProps> = ({
  totalRentedHours,
  todayRentedHours,
  totalSales,
  todaySales,
  totalRevenues,
  todayRevenues,
  refreshRate,
}) => {
  const cards: CardProps[] = [
    {
      title: 'Total Rented Hours - tRh',
      value: totalRentedHours.toLocaleString(),
      unit: 'tRh',
      time: `${refreshRate} s`,
      color: '#00A3FF',
    },
    {
      title: 'Today Rented Hours - dRh',
      value: todayRentedHours.toLocaleString(),
      unit: 'dRh',
      time: `${refreshRate} s`,
      color: '#00A3FF',
    },
    {
      title: 'Total Sales',
      value: totalSales.toLocaleString(),
      unit: '$',
      time: `${refreshRate} s`,
      color: '#FF294F',
    },
    {
      title: 'Today Sales',
      value: todaySales.toLocaleString(),
      unit: '$',
      time: `${refreshRate} s`,
      color: '#FF294F',
    },
    {
      title: 'Total Revenues',
      value: totalRevenues.toLocaleString(),
      unit: '$',
      time: `${refreshRate} s`,
      color: '#FF294F',
    },
    {
      title: 'Today Revenues',
      value: todayRevenues.toLocaleString(),
      unit: '$',
      time: `${refreshRate} s`,
      color: '#FF294F',
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 tablet:grid-cols-2">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-blue-light flex flex-col justify-between rounded-lg p-2 text-white shadow-lg sm:p-4"
        >
          <div>
            <h4 className="mb-4 text-sm font-light">{card.title}</h4>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1 text-white">
              <span className="text-[0.495rem] md:text-[0.625rem]">{card.time}</span>
              <ClockIcon className=" w-4 shrink-0 scale-75 tablet:scale-100" />
            </div>
            <div className="text-2xl font-bold tablet:text-[2.5rem]">
              <span style={{ color: card.color }}>{card.value}</span>
              <span className="text-sm tablet:text-xl"> {card.unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalStatsCards;
