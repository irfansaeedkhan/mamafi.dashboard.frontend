'use client';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Series = {
  name: string;
  data: number[];
};

interface Props {
  graphData: { [key: string]: number }[];
}

export const TransactionChartMobile: React.FC<Props> = ({ graphData }) => {
  const [seriesData, setSeriesData] = useState<Series[]>([]);
  const [optionsData, setOptionsData] = useState<ApexOptions>({});

  const updateChartData = useCallback(() => {
    const formatPercent = (value: number) => `${Number(value.toFixed(1)).toString()}%`;
    const dataPoints = graphData.map(data => Number(Object.values(data)[0] || 0));

    const maxValue = Math.max(...dataPoints, 0);
    const roundedMax = Math.ceil(maxValue * 10) / 10;

    setSeriesData([
      {
        name: 'Revenue',
        data: dataPoints,
      },
    ]);

    setOptionsData({
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '6px',
          borderRadius: 2,
          barHeight: '6px',
        },
      },
      dataLabels: {
        enabled: false,
      },

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
        position: 'top',
        min: 0,
        max: roundedMax,
        labels: {
          formatter: val => {
            const numericValue = parseFloat(val);
            return isNaN(numericValue) ? val : formatPercent(numericValue);
          },
          style: {
            colors: '#ffffff',
            fontSize: '0.7rem',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff',
            fontSize: '0.7rem',
          },
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
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
        x: {
          show: true,
          format: 'MM',
        },
        y: {
          formatter: val => formatPercent(Number(val)),
        },
        marker: {
          show: false,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const month = w.globals.labels[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];

          return `
            <div style="background-color: #0B1314; border: 1px solid #1C83FF; padding: 8px; border-radius: 8px; min-width: 100px;">
              <p style="color: white; font-weight: bold; margin: 0;">Revenue</p>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px;">
              <p style="color: #1C83FF; margin: 0; padding-right: 8px;">${month}</p>
              <p style="color: #1C83FF; margin: 0; padding-left: 8px;">${formatPercent(Number(value))}</p>
              </div>
            </div>
          `;
        },
      },
    });
  }, [graphData]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);
  return (
    <div className="w-full pr-4">
      <ReactApexChart
        options={optionsData}
        series={seriesData}
        type="bar"
        height={340}
        width="100%"
      />
    </div>
  );
};
