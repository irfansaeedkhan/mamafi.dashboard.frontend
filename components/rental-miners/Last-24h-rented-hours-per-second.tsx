import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts';
import { ClockIcon } from '@/assets/svgs';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const dummyData = [
  { hour: '00:00', revenue: 400 },
  { hour: '01:00', revenue: 200 },
  { hour: '02:00', revenue: 120 },
  { hour: '03:00', revenue: 160 },
  { hour: '04:00', revenue: 180 },
  { hour: '05:00', revenue: 300 },
  { hour: '06:00', revenue: 350 },
  { hour: '07:00', revenue: 600 },
  { hour: '08:00', revenue: 750 },
  { hour: '09:00', revenue: 800 },
  { hour: '10:00', revenue: 1100 },
  { hour: '11:00', revenue: 1000 },
  { hour: '12:00', revenue: 850 },
  { hour: '13:00', revenue: 1200 },
  { hour: '14:00', revenue: 1150 },
  { hour: '15:00', revenue: 900 },
  { hour: '16:00', revenue: 600 },
  { hour: '17:00', revenue: 650 },
  { hour: '18:00', revenue: 1050 },
  { hour: '19:00', revenue: 1150 },
  { hour: '20:00', revenue: 1250 },
  { hour: '21:00', revenue: 900 },
  { hour: '22:00', revenue: 850 },
  { hour: '23:00', revenue: 700 },
];

const Last24hRentedHoursperSecond: React.FC = () => {
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
    },
    stroke: {
      width: 4,
      curve: 'smooth',
      colors: ['#1C83FF'],
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
          fontSize: '10px',
        },
        rotate: -90,
        rotateAlways: true,
      },
    },
    yaxis: {
      min: 0,
      max: Math.max(...dummyData.map(item => item.revenue)) * 1.2,
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '10px',
        },
        formatter: (value: number) => value.toFixed(2),
      },
    },
    markers: {
      size: 4,
      colors: ['#1C83FF'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      followCursor: true,
      x: {
        show: true,
        format: 'HH:mm',
      },
      y: {
        formatter: (value: number) => value.toFixed(2),
      },
    },
    series: [
      {
        name: 'Revenue',
        data: dummyData.map(item => item.revenue),
      },
    ],
  };

  return (
    <div className="bg-blue-light w-full rounded-lg p-5 text-white">
      <div className="flex flex-col items-center justify-between pb-6 pt-4 tablet:flex-row">
        <h3 className="w-full text-sm text-white tablet:w-1/2 tablet:text-sm">
          Last 24h Revenue per Hour
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
          height={300}
          width="100%"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-[1.25rem] bg-primary/30 backdrop-blur-lg">
          <h3 className="text-center text-xl font-semibold text-white">Coming Soon</h3>
        </div>
      </div>
    </div>
  );
};

export default Last24hRentedHoursperSecond;
