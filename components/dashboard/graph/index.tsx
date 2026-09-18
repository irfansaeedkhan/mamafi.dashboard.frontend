'use client';
import { GetGraphDetailsResponse, getGraphDetails } from '@/lib/auth/get-graph-details';
import React, { useCallback, useEffect, useState } from 'react';
import { TransactionChart } from '../transaction-chart';
import { TransactionChartMobile } from '../transaction-chart-mobile';
import { DropdownOption, YearDropdown } from '../year-drop-down';

const DUMMY_GRAPH_DATA: GetGraphDetailsResponse = {
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
  year: '2026',
};

const RevenueGraph: React.FC = () => {
  const [finalGraphData, setFinalGraphData] = useState<GetGraphDetailsResponse>(DUMMY_GRAPH_DATA);
  const [dataYears, setDataYears] = useState<DropdownOption[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  // Function to fetch graph data
  const fetchGraphData = useCallback(async () => {
    try {
      const res = await getGraphDetails(); // Fetch graph details
      const graphData = Array.isArray(res) ? res : [];
      const years = graphData.map(item => item.year);

      if (years) {
        const uniqueYears = Array.from(new Set(years));
        const dropdownOptions = uniqueYears.map(year => ({
          value: year,
          label: year,
        }));
        setDataYears(dropdownOptions);

        const initialGraphData = graphData.find(item => item.year === selectedYear) || graphData[0];
        setFinalGraphData(initialGraphData || DUMMY_GRAPH_DATA);
      } else {
        setDataYears([{ value: '2026', label: '2026' }]);
        setFinalGraphData(DUMMY_GRAPH_DATA);
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  }, [selectedYear]);

  // Fetch graph data when component mounts or year changes
  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  // Handle dropdown year change
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

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
