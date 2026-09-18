import { ClockIcon } from '@/assets/svgs';
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  subtitle: string;
  time: string;
  type: string;
}

const ChartsStatsCards: React.FC = () => {
  const cards: CardProps[] = [
    {
      title: 'Cumulated Number of Transactions since Activation - TrX #',
      value: '18,133,946',
      subtitle: 'TrX#',
      time: '1 h',
      type: 'Out',
    },
    {
      title: 'Cumulated Number of Transactions Today - TrX #',
      value: '598,709',
      subtitle: 'TrX#',
      time: '1 h',
      type: 'Out',
    },
    {
      title: 'Cumulated Revenues from Transactions since Activation - TrX $',
      value: '3,560,290',
      subtitle: 'TrX#',
      time: '1 h',
      type: 'Out',
    },
    {
      title: 'Cumulated Revenues from Transactions Today - TrX $',
      value: '120,404',
      subtitle: 'TrX#',
      time: '1 h',
      type: 'Out',
    },
  ];

  return (
    <div className="z-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-blue-light flex flex-col rounded-lg p-4 font-normal text-white shadow-lg tablet:p-6"
        >
          <div className="grid h-full grid-rows-[3fr,auto,auto,auto] gap-2">
            <div className="row-start-1">
              <h4 className="tablet:text-sm">{card.title}</h4>
            </div>
            <div className="row-start-2 flex flex-col text-[#FF002E]">
              <h6 className="text-[0.5rem] font-normal tablet:text-xs">{card.type}</h6>
              <h4 className="text-sm font-bold tablet:text-xl">{card.value}</h4>
            </div>
            <div className="row-start-3">
              <p className="mt-1 text-[0.5rem] font-normal tablet:text-xs">{card.subtitle}</p>
            </div>
            <div className="row-start-4 flex items-center justify-end text-[0.375rem] tablet:text-[0.625rem]">
              <span>{card.time}</span>
              <ClockIcon className="ml-1 w-4 shrink-0 scale-75 tablet:scale-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartsStatsCards;
