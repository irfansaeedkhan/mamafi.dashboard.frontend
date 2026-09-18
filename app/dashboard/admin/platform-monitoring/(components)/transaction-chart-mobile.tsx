'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  graphData: { [key: string]: number }[];
}

export const TransactionChartMobile: React.FC<Props> = ({ graphData }) => {
  const [series, setSeries] = useState([{ name: 'Revenue', data: [] as number[] }]);
  const [optionsData, setOptionsData] = useState<ApexOptions>({});

  useEffect(() => {
    setSeries([
      {
        name: 'Revenue',
        data: graphData.map(data => Object.values(data)[0] || 0),
      },
    ]);

    setOptionsData({
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
      },
      grid: { show: false },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '6px',
          borderRadius: 2,
          barHeight: '6px',
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        min: 0,
        max: 30,
        tickAmount: 6,
        labels: {
          formatter: val => `${Math.round(Number(val))}%`,
          style: { colors: '#ffffff', fontSize: '0.7rem' },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { colors: '#ffffff', fontSize: '0.7rem' },
        },
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
          const month = w.globals.labels[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];
          return `
            <div style="background-color: #0B1314; border: 1px solid #1C83FF; padding: 8px; border-radius: 8px;">
              <p style="color: white; font-weight: bold;">Revenue</p>
              <div style="display: flex; justify-content: space-between;">
                <p style="color: #1C83FF;">${month}</p>
                <p style="color: #1C83FF;">${value}%</p>
              </div>
            </div>
          `;
        },
      },
    });
  }, [graphData]);

  return (
    <div className="w-full pr-4">
      <ReactApexChart options={optionsData} series={series} type="bar" height={340} width="100%" />
    </div>
  );
};
