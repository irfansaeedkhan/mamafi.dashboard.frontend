import React, { useCallback, useEffect, useState } from 'react';

import { DropdownOption, YearDropdown } from '@/components/dashboard/year-drop-down';
import { TransactionChart } from './transaction-chart';
import { TransactionChartMobile } from './transaction-chart-mobile';

export interface GetGraphDetailsResponse {
  year: string;
  percentages: { [key: string]: number }[];
}

const MOCK_GRAPH_DATA: GetGraphDetailsResponse[] = [
  {
    year: '2024',
    percentages: [
      { January: 10 },
      { February: 14 },
      { March: 7 },
      { April: 15 },
      { May: 18 },
      { June: 22 },
      { July: 27 },
      { August: 20 },
      { September: 25 },
      { October: 19 },
      { November: 23 },
      { December: 17 },
    ],
  },
  {
    year: '2025',
    percentages: [{ January: 12 }, { February: 16 }, { March: 11 }, { April: 18 }, { May: 24 }],
  },
];

const getGraphDetails = async (): Promise<GetGraphDetailsResponse[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(MOCK_GRAPH_DATA), 300);
  });
};

const RevenueGraph: React.FC = () => {
  const [finalGraphData, setFinalGraphData] = useState<GetGraphDetailsResponse | null>(null);
  const [dataYears, setDataYears] = useState<DropdownOption[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  const fetchGraphData = useCallback(async () => {
    const res = await getGraphDetails();
    console.log('res::::', res);
    const dropdownOptions = res.map(item => ({
      value: item.year,
      label: item.year,
    }));
    setDataYears(dropdownOptions);

    const graphDataForYear = res.find(item => item.year === selectedYear);

    setFinalGraphData(
      graphDataForYear ?? {
        year: selectedYear,
        percentages: [
          { January: 0 },
          { February: 0 },
          { March: 0 },
          { April: 0 },
          { May: 0 },
          { June: 0 },
          { July: 0 },
          { August: 0 },
          { September: 0 },
          { October: 0 },
          { November: 0 },
          { December: 0 },
        ],
      }
    );
  }, [selectedYear]);

  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  if (!finalGraphData) return <p className="p-4 text-white">Loading...</p>;

  return (
    <div className="z-10 rounded-xl box-3d">
      <div className="flex w-full items-center justify-between gap-4 rounded-tl-xl rounded-tr-xl bg-light px-4 pb-4 pt-4 sm:px-6 sm:py-6 sm:pb-8 md:bg-light">
        <div className="hidden flex-col gap-1 sm:flex">
          <p className="text-xs font-medium text-white">Overview of Balance</p>
          <p className="text-xl font-bold text-white">Monthly Revenue</p>
        </div>
        <h3 className="block text-lg font-bold text-white sm:hidden">Global Overview</h3>
        <YearDropdown
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={handleYearChange}
        />
      </div>

      <div className="hidden w-full sm:px-6 sm:py-6 md:block">
        <TransactionChart graphData={finalGraphData.percentages} />
      </div>
      <div className="block w-full sm:px-6 sm:py-6 md:hidden">
        <TransactionChartMobile graphData={finalGraphData.percentages} />
      </div>
    </div>
  );
};

export default RevenueGraph;
