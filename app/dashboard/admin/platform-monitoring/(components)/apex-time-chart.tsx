import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { YearDropdown, DropdownOption } from '@/components/dashboard/year-drop-down';
import { VerticalLineIcon } from '@/assets/svgs';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ApexTimeChartProps {
  title: string;
  subtitle?: string;
  unitLabel: string;
  seriesName: string;
  yAxisMax?: number;
  dataMap: {
    Daily: number[];
    Weekly: number[];
    Monthly: number[];
  };
  lineColor?: string;
  yAxisFormatter?: (val: number) => string;
}

const ApexTimeChart: React.FC<ApexTimeChartProps> = ({
  title,
  subtitle,
  unitLabel,
  seriesName,
  yAxisMax = 200,
  dataMap,
  lineColor,
  yAxisFormatter,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');
  const [optionsData, setOptionsData] = useState<ApexOptions>({});
  const [series, setSeries] = useState([{ name: seriesName, data: dataMap.Daily }]);

  const periodOptions: DropdownOption[] = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
  ];

  const xLabels = {
    Daily: ['00:00', '04:00', '08:00', '12:00', '16:00', '24:00'],
    Weekly: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    Monthly: ['1st Week', '2nd Week', '3rd Week', '4th Week', '5th Week'],
  };

  useEffect(() => {
    const fullLabels = xLabels[selectedPeriod as keyof typeof xLabels] || [];
    const data = dataMap[selectedPeriod as keyof typeof dataMap] || [];

    // Trim labels to match the data length exactly
    const categories = fullLabels.slice(0, data.length);

    setSeries([{ name: seriesName, data }]);

    setOptionsData({
      chart: { type: 'line', height: 200, toolbar: { show: false } },
      colors: [lineColor || '#FF294F'],
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: [lineColor || '#FF294F'],
      },
      grid: {
        show: true,
        borderColor: '#ffffff20',
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
      markers: {
        size: 6,
        colors: [lineColor || '#FF294F'],
        strokeColors: '#ffffff',
        strokeWidth: 0,
        hover: {
          size: 7,
        },
      },
      xaxis: {
        categories,
        labels: {
          style: { colors: '#ffffff', fontSize: '0.8rem' },
          rotate: 0,
          maxHeight: 100,
          trim: false,
          hideOverlappingLabels: false,
        },
      },
      yaxis: {
        labels: {
          style: { colors: '#ffffff', fontSize: '0.8rem' },
          formatter: yAxisFormatter ?? (val => val.toLocaleString()),
        },
        tickAmount: 4,
        min: 0,
        max: yAxisMax,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          gradientToColors: [lineColor || '#FF294F', '#1C83FF'],
          stops: [0, 100],
        },
      },
      tooltip: {
        theme: 'dark',
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const value = series[seriesIndex][dataPointIndex];

          return `<div style="background-color: #1C83FF33; border: 1px solid #1C83FF; padding: 8px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                      <p style="color: #1C83FF; font-weight: bold;">${seriesName}</p>
                     <p style="color: #ffffff;">${value.toLocaleString()} ${unitLabel}</p>
                    </div>
                  </div>`;
        },
      },
    });
  }, [selectedPeriod, dataMap, seriesName, unitLabel, yAxisMax]);

  return (
    <div className="rounded-xl box-3d p-6">
      <div className="relative flex w-full gap-2">
        <div className="flex flex-col items-start justify-between">
          <div className="flex flex-col items-start">
            <h3 className="text-white text-base font-bold">{title}</h3>
            {subtitle && <p className="mt-1 text-xs text-white">{subtitle}</p>}
          </div>
          <div className="relative w-[120px]">
            <YearDropdown
              selectedValue={selectedPeriod}
              options={periodOptions}
              placeholder="Select Period"
              onSelect={value => {
                console.log('Dropdown selected:', value);
                setSelectedPeriod(value);
              }}
            />
          </div>
        </div>

        <div className="w-full">
          <ReactApexChart
            key={selectedPeriod}
            options={optionsData}
            series={series}
            type="line"
            height={200}
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

export default ApexTimeChart;
