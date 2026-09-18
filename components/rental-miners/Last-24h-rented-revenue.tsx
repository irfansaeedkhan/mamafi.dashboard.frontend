import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts';
import { ClockIcon } from '@/assets/svgs';
import { useMediaQuery } from 'react-responsive';
import { MinerData } from './miner-chart-box';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const dummyData = [
  { hour: '00:00', rentedHours: 500, revenue: 400 },
  { hour: '01:00', rentedHours: 300, revenue: 200 },
  { hour: '02:00', rentedHours: 150, revenue: 120 },
  { hour: '03:00', rentedHours: 180, revenue: 160 },
  { hour: '04:00', rentedHours: 220, revenue: 180 },
  { hour: '05:00', rentedHours: 330, revenue: 300 },
  { hour: '06:00', rentedHours: 410, revenue: 350 },
  { hour: '07:00', rentedHours: 700, revenue: 600 },
  { hour: '08:00', rentedHours: 850, revenue: 750 },
  { hour: '09:00', rentedHours: 920, revenue: 800 },
  { hour: '10:00', rentedHours: 1300, revenue: 1100 },
  { hour: '11:00', rentedHours: 1100, revenue: 1000 },
  { hour: '12:00', rentedHours: 950, revenue: 850 },
  { hour: '13:00', rentedHours: 1400, revenue: 1200 },
  { hour: '14:00', rentedHours: 1300, revenue: 1150 },
  { hour: '15:00', rentedHours: 1000, revenue: 900 },
  { hour: '16:00', rentedHours: 750, revenue: 600 },
  { hour: '17:00', rentedHours: 800, revenue: 650 },
  { hour: '18:00', rentedHours: 1200, revenue: 1050 },
  { hour: '19:00', rentedHours: 1300, revenue: 1150 },
  { hour: '20:00', rentedHours: 1400, revenue: 1250 },
  { hour: '21:00', rentedHours: 1100, revenue: 900 },
  { hour: '22:00', rentedHours: 1000, revenue: 850 },
  { hour: '23:00', rentedHours: 1200, revenue: 700 },
  { hour: '24:00', rentedHours: 900, revenue: 900 },
];

const Last24HoursRentedRevenue: React.FC<{ data: MinerData[] }> = ({ data }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      background: '#0E1F30',
      foreColor: '#FFFFFF',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
    },
    stroke: {
      width: [4, 4],
      curve: 'smooth',
      colors: ['#4CAF50', '#1C83FF'],
    },
    grid: {
      borderColor: '#ffffff57',
      xaxis: {
        lines: {
          show: true,
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
      categories: dummyData.map(item => item.hour),
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: isMobile ? '8px' : '10px',
        },
        rotate: -90,
      },
      tickAmount: isMobile ? 6 : 24,
    },
    yaxis: [
      {
        labels: {
          style: {
            colors: '#4CAF50',
            fontSize: isMobile ? '8px' : '10px',
          },
          formatter: (value: number) => value.toFixed(2),
        },
        min: 0,
        max: Math.max(...dummyData.map(item => item.rentedHours)) * 1.2,
      },
      {
        opposite: true,
        labels: {
          style: {
            colors: '#1C83FF',
            fontSize: isMobile ? '8px' : '10px',
          },
          formatter: (value: number) => value.toFixed(2),
        },
        min: 0,
        max: Math.max(...dummyData.map(item => item.revenue)) * 1.2,
      },
    ],
    markers: {
      size: [4, 4],
      colors: ['#4CAF50', '#1C83FF'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: true,
      x: {
        show: true,
        format: 'HH:mm',
      },
      y: {
        formatter: (value: number) => value.toFixed(2),
      },
    },
    legend: { show: false },
    series: [
      {
        name: 'Rented Hours (rHh)',
        data: dummyData.map(item => item.rentedHours),
      },
      {
        name: 'Revenue',
        data: dummyData.map(item => item.revenue),
      },
    ],
  };

  return (
    <div className="bg-blue-light z-10 w-full rounded-lg text-white md:p-5">
      <div className="flex flex-col items-center justify-between p-2 pb-6 pt-4 tablet:flex-row">
        <h3 className="w-full text-sm text-white tablet:w-1/2 tablet:text-sm">
          Hours Rented of the last 24 hours - Rented Hours per Hour rHh & Revenue
        </h3>
        <div className="flex items-center gap-1 text-white maxmobile:self-end">
          <span className="text-[0.375rem] md:text-[0.625rem]">60 sec</span>{' '}
          <ClockIcon className="ml-1 w-4 shrink-0 scale-75 tablet:scale-100" />
        </div>
      </div>

      <div className="relative h-full w-full">
        <ReactApexChart
          options={options}
          series={options.series}
          type="line"
          height={isMobile ? 400 : 330}
          width={isMobile ? 350 : '100%'}
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-[1.25rem] bg-primary/30 backdrop-blur-lg">
          <h3 className="text-center text-xl font-semibold text-white">Coming Soon</h3>
        </div>
      </div>
    </div>
  );
};

export default Last24HoursRentedRevenue;
