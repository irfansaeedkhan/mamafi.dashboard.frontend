import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { YearDropdown, DropdownOption } from '@/components/dashboard/year-drop-down';
import { VerticalLineIcon } from '@/assets/svgs';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface SmallCardChartProps {
  title: string;
  textColor: string;
  lineColor: string;
  unit?: string;
  dataMap: {
    Daily: number[];
    Weekly: number[];
    Monthly: number[];
  };
}

const SmallCardChart: React.FC<SmallCardChartProps> = ({
  title,
  textColor,
  lineColor,
  unit = '',
  dataMap,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [currentValue, setCurrentValue] = useState(0);
  const [series, setSeries] = useState([{ name: title, data: [] as number[] }]);
  const [optionsData, setOptionsData] = useState<ApexOptions>({});

  const periodOptions: DropdownOption[] = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
  ];

  useEffect(() => {
    const data = dataMap[selectedPeriod as keyof typeof dataMap] || [];
    const lastValue = data[data.length - 1] || 0;
    setCurrentValue(lastValue);
    setSeries([{ name: title, data }]);

    setOptionsData({
      chart: { type: 'line', sparkline: { enabled: true } },
      stroke: { curve: 'smooth', width: 2, colors: [lineColor === 'gradient' ? '#FF294F' : lineColor] },
      markers: {
        size: 4,
        colors: [lineColor === 'gradient' ? '#FF294F' : lineColor],
        strokeColors: '#fff',
        strokeWidth: 0,
      },
      tooltip: { enabled: false },
      yaxis: { show: false },
      grid: { show: false },
    });
  }, [selectedPeriod, dataMap]);

  return (
    <div className="h-full w-full rounded-xl box-3d p-4">
      <div className="relative flex h-full w-full flex-col justify-between">
        <div>
          <h3 className="text-white mb-1 text-sm font-bold">{title}</h3>
          <p
            className={`my-2 text-3xl font-normal ${textColor === 'gradient' ? 'text-white' : ''}`}
            style={textColor !== 'gradient' ? { color: textColor } : undefined}
          >
            {unit}
            {currentValue.toLocaleString()}
          </p>

          <div className="w-[90%]">
            <ReactApexChart options={optionsData} series={series} type="line" height={70} />
          </div>
        </div>

        <div className="mt-4 w-[90px]">
          <YearDropdown
            selectedValue={selectedPeriod}
            options={periodOptions}
            placeholder="Select Period"
            onSelect={value => setSelectedPeriod(value)}
          />
        </div>

        <div className="absolute -right-2 top-0 h-full overflow-hidden">
          <VerticalLineIcon />
          <VerticalLineIcon className="mt-[2px]" />
          <VerticalLineIcon className="mt-[2px]" />
        </div>
      </div>
    </div>
  );
};

export default SmallCardChart;
