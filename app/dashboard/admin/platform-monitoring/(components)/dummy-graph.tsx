'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts';
import { useMediaQuery } from 'react-responsive';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Optional dummy clock icon fallback if missing
const ClockIcon = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ✅ Dummy 24-hour data
const dummyData = Array.from({ length: 24 }, (_, hour) => {
  const label = `${String(hour).padStart(2, '0')}:00`;
  return {
    hour: label,
    rentedHours: Math.floor(200 + Math.random() * 1000),
    revenue: Math.floor(150 + Math.random() * 800),
  };
});

const Last24HoursRentedRevenue: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 1000,
        },
      },
      background: '#0E1F30',
      foreColor: '#FFFFFF',
      toolbar: { show: false },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
    },
    stroke: {
      width: [4, 4],
      curve: 'smooth',
      colors: ['#FF294F', '#1C83FF'],
    },
    grid: {
      borderColor: '#ffffff57',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
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
          style: { colors: '#FF294F', fontSize: isMobile ? '8px' : '10px' },
          formatter: (value: number) => value.toFixed(0),
        },
        min: 0,
        max: Math.max(...dummyData.map(item => item.rentedHours)) * 1.2,
      },
      {
        opposite: true,
        labels: {
          style: { colors: '#1C83FF', fontSize: isMobile ? '8px' : '10px' },
          formatter: (value: number) => value.toFixed(0),
        },
        min: 0,
        max: Math.max(...dummyData.map(item => item.revenue)) * 1.2,
      },
    ],
    markers: {
      size: [4, 4],
      colors: ['#FF294F', '#1C83FF'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: { size: 6 },
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: true,
      x: { show: true, format: 'HH:mm' },
      y: { formatter: (value: number) => value.toFixed(0) },
    },
    legend: { show: true },
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
          <span className="text-[0.375rem] md:text-[0.625rem]">60 sec</span>
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
      </div>
    </div>
  );
};

export default Last24HoursRentedRevenue;
