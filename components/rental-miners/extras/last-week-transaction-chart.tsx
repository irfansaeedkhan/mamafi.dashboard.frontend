import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts';
import { ClockIcon } from '@/assets/svgs';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const LastWeekTransactionChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: 'easein',
        speed: 800,
      },
      background: '#0E1F30',
      dropShadow: {
        top: -11,
        left: 13,
      },
      foreColor: '#FFFFFF',
      fontFamily: 'Roboto, sans-serif',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 4,
      curve: 'smooth',
      colors: ['#1C83FF', '#FF294F'],
    },
    grid: {
      borderColor: '#0E1F30',
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
      categories: ['August', '05', '06', '07', '08', '09', '10', '11', '12'],
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: function (value: number) {
          return value.toFixed(0);
        },
        style: {
          colors: '#FFFFFF',
          fontSize: '10px',
        },
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
      enabled: false,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#ffffff',
      },
      markers: {
        // size: 4,
      },
    },
    series: [
      {
        name: 'TrX#',
        data: [80000, 75000, 70000, 68000, 67000, 66000, 65000, 64000, 63000],
      },
      {
        name: 'TrX/S',
        data: [20000, 18000, 16000, 15000, 14000, 13000, 12000, 11000, 10000],
      },
    ],
  };

  return (
    <>
      <div className="tablet flex flex-col items-center justify-between pb-6 pt-4 tablet:flex-row">
        <h3 className="w-full text-sm text-white tablet:w-1/2 tablet:text-sm">
          Transactions of the last Week - Transactions per Day
        </h3>
        <div className="flex items-center gap-1 text-white">
          <span className="text-[0.375rem] md:text-[0.625rem]">8/12/2024, 6:00:00 AM</span>
          <ClockIcon className="ml-1 w-4 shrink-0 scale-75 tablet:scale-100" />
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={300}
        width="100%"
      />
    </>
  );
};

export default LastWeekTransactionChart;
