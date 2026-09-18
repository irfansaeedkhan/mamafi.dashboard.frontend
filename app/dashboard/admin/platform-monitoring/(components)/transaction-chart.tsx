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

export const TransactionChart: React.FC<Props> = ({ graphData }) => {
  const [optionsData, setOptionsData] = useState<ApexOptions>({});
  const [series, setSeries] = useState([{ name: 'Revenue', data: [] as number[] }]);

  useEffect(() => {
    const dataPoints = graphData.map(data => Object.values(data)[0]);

    setSeries([{ name: 'Revenue', data: dataPoints }]);

    setOptionsData({
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '8px',
          borderRadius: 5,
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        labels: {
          style: { colors: '#ffffff', fontSize: '0.8rem' },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 0,
        max: 30,
        tickAmount: 6,
        labels: {
          formatter: val => `${Math.round(val)}%`,
          style: { colors: ['#ffffff'], fontSize: '0.7rem' },
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
    <div className="text-white">
      <ReactApexChart options={optionsData} series={series} type="bar" height={350} width="100%" />
    </div>
  );
};
