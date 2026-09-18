'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import dayjs from 'dayjs';
import { ApexOptions } from 'apexcharts';
import { ClockIcon } from '@/assets/svgs';
import { MinerData } from './miner-chart-box';
import { useMediaQuery } from 'react-responsive';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const dummyWeeklyData = [
  { day: 'Mon', rentedHours: 500, revenue: 400 },
  { day: 'Tue', rentedHours: 600, revenue: 450 },
  { day: 'Wed', rentedHours: 700, revenue: 550 },
  { day: 'Thu', rentedHours: 650, revenue: 500 },
  { day: 'Fri', rentedHours: 800, revenue: 600 },
  { day: 'Sat', rentedHours: 900, revenue: 700 },
  { day: 'Sun', rentedHours: 750, revenue: 650 },
];

type prop = {
  data: MinerData[];
};

const LastWeekHoursRentedChart: React.FC<prop> = ({ data }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const currentTime = dayjs().format('h:mm:ss A');
  const currentDate = dayjs().format('MM/DD/YYYY');

  const options: ApexOptions = {
    chart: {
      type: 'scatter',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      background: '#0E1F30',
      foreColor: '#FFFFFF',
      fontFamily: 'Roboto, sans-serif',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 0,
    },
    grid: {
      borderColor: '#ffffff57',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: 'category',
      categories: dummyWeeklyData.map(item => item.day),
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      tickAmount: 6,
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '10px',
        },
        formatter: (value: number) => value.toFixed(0),
      },
    },
    markers: {
      size: 6,
      colors: ['#1C83FF', '#FF294F'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        formatter: function (val: number) {
          return val.toLocaleString();
        },
      },
    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#ffffff',
      },
      markers: {
        // size: 4,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    series: [
      {
        name: 'rHd',
        data: dummyWeeklyData.map(item => item.rentedHours),
      },
      {
        name: '$',
        data: dummyWeeklyData.map(item => item.revenue),
      },
    ],
  };

  return (
    <div className="bg-blue-light z-10 w-full rounded-lg p-5 text-white">
      <div className="flex flex-col items-start justify-between gap-2 pb-6 pt-4 tablet:flex-row">
        <h3 className="w-full text-sm font-light tablet:max-w-[50%]">
          Hours Rented of the last Week - Hours Rented per Day rHd & Revenue
        </h3>
        <div className="flex w-full flex-col items-end gap-2">
          <div className="flex items-center space-x-2 text-[0.625rem] maxmobile:self-end">
            <span className="shrink-0">
              {currentDate}, {currentTime}
            </span>
            <ClockIcon className=" w-4 shrink-0 scale-75 tablet:scale-100" />
          </div>
          <div className="mr-1 mt-1 flex gap-5">
            <div className="flex items-center gap-1 text-white maxmobile:self-end">
              <div className="h-2 w-2 rounded-full border border-white bg-[#1C83FF]"></div>
              <span className="text-[0.375rem] md:text-[0.625rem]">rHd</span>
            </div>
            <div className="flex items-center gap-1 text-white maxmobile:self-end">
              <div className="h-2 w-2 rounded-full border border-white bg-[#FF294F]"></div>
              <span className="text-[0.375rem] md:text-[0.625rem]">$</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <ReactApexChart
          options={options}
          series={options.series}
          type="scatter"
          height={300}
          width={'100%'}
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-[1.25rem] bg-primary/30 backdrop-blur-lg">
          <h3 className="text-center text-xl font-semibold text-white">Coming Soon</h3>
        </div>
      </div>
    </div>
  );
};

export default LastWeekHoursRentedChart;
