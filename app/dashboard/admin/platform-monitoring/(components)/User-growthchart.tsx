import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { YearDropdown, DropdownOption } from '@/components/dashboard/year-drop-down';
import { VerticalLineIcon } from '@/assets/svgs';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const UserGrowthChart: React.FC = () => {
  const [optionsData, setOptionsData] = useState<ApexOptions>({});
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    { name: 'User Growth', data: [] },
  ]);
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');

  const dataYears: DropdownOption[] = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
  ];

  useEffect(() => {
    const data = [0, 30, 50, 100, 150, 200];
    setSeries([{ name: 'User Growth', data }]);

    setOptionsData({
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      grid: {
        show: true,
        borderColor: '#ffffff20',
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
      xaxis: {
        categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '24:00'],
        labels: {
          style: { colors: '#ffffff', fontSize: '0.8rem' },
        },
      },
      yaxis: {
        labels: {
          style: { colors: '#ffffff', fontSize: '0.8rem' },
        },
        min: 0,
        max: 200,
      },
      colors: ['#FF294F'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          gradientToColors: ['#1C83FF'],
          stops: [0, 100],
        },
      },
      tooltip: {
        theme: 'dark',
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const time = w.globals.labels[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];
          return `<div style="background-color: #0a2540; border: 1px solid #1C83FF; padding: 8px; border-radius: 8px;">
                    <p style="color: white; font-weight: bold;">User Growth</p>
                    <div style="display: flex; justify-content: space-between;">
                      <p style="color: #1C83FF;">${time}</p>
                      <p style="color: #1C83FF;">${value} Users</p>
                    </div>
                  </div>`;
        },
      },
    });
  }, []);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    // fetch data
  };

  return (
    <div className="overflow-hidden rounded-xl box-3d  p-6">
      <div className="relative flex w-full  gap-4">
        <div className="flex flex-col items-center justify-between pb-4">
          <h3 className="text-white text-base font-bold">User Growth</h3>
          <div className="relative w-[120px]">
            <YearDropdown
              selectedValue={selectedPeriod}
              options={dataYears}
              placeholder="Select Period"
              onSelect={handlePeriodChange}
            />
          </div>
        </div>

        <div className="w-full">
          <ReactApexChart
            options={optionsData}
            series={series}
            type="line"
            height={350}
            width="100%"
          />
        </div>

        <div className="absolute -right-2 top-0 h-full overflow-hidden">
          <VerticalLineIcon />
          <VerticalLineIcon className="mt-[2px]" />
          <VerticalLineIcon className="mt-[2px]" />
          <VerticalLineIcon className="mt-[2px]" />
        </div>
      </div>
    </div>
  );
};

export default UserGrowthChart;
