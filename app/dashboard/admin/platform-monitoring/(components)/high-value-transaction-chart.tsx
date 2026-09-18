import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { VerticalLineIcon } from '@/assets/svgs';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface HighValueTransactionsProps {
  values: number[];
}

const HighValueTransactions: React.FC<HighValueTransactionsProps> = ({ values }) => {
  const [optionsData, setOptionsData] = useState<ApexOptions>({});
  const [series, setSeries] = useState([
    {
      name: 'Transaction Value',
      data: values,
    },
  ]);

  useEffect(() => {
    setOptionsData({
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '30%', // thinner bars
          borderRadius: 3,
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: values.map((_, idx) => (idx + 1).toString()),
        labels: {
          style: {
            colors: '#ffffff',
            fontSize: '0.8rem',
          },
          formatter: (val: string) => `$${parseInt(val).toLocaleString()}`,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff',
            fontSize: '0.8rem',
          },
        },
      },
      grid: {
        borderColor: '#ffffff20',
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
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
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const value = series[seriesIndex][dataPointIndex];
          return `
            <div style="background-color: #0B1314; border: 1px solid #1C83FF; padding: 8px; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                <p style="color: #1C83FF; font-weight: bold;">Transaction</p>
                <p style="color: #ffffff;">$${value.toLocaleString()}</p>
              </div>
            </div>
          `;
        },
      },
    });
  }, [values]);

  return (
    <div className="bg-primary-light rounded-xl p-6">
      <div className="relative  ">
        <div className="flex flex-col items-start justify-between pb-4">
          <h3 className="text-white text-base font-bold">High-Value Transactions</h3>
          <p className="mt-1 text-xs text-white">
            A chart showing the top 10 largest transactions.
          </p>
        </div>
        <ReactApexChart
          options={optionsData}
          series={series}
          type="bar"
          height={400}
          width="100%"
        />
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

export default HighValueTransactions;
