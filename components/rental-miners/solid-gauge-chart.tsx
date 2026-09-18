import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts';
import { ClockIcon } from '@/assets/svgs';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface SolidGaugeChartProps {
  value: number;
  maxValue: number;
  minValue: number;
  label: string;
  color: string;
  mainTitle: string;
  timeIndicator: string;
}

const SolidGaugeChart: React.FC<SolidGaugeChartProps> = ({
  value,
  maxValue,
  minValue,
  label,
  color,
  mainTitle,
  timeIndicator,
}) => {
  const series = value ? [(value / maxValue) * 100] : [0];

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '30%',
        },
        track: {
          background: '#333',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: color,
            offsetY: 16,
            formatter: function () {
              return value ? value.toFixed(2).toString() : '0.00';
            },
          },
        },
      },
    },
    fill: {
      type: 'solid',
      colors: [color],
      opacity: value === 0 ? 0 : 1,
    },
    stroke: {
      lineCap: 'square',
    },
    labels: [label],
  };

  return (
    <div className="bg-blue-light z-10 flex h-full w-full items-end justify-between rounded-lg p-4 text-white shadow-lg">
      <div className="flex h-full w-full flex-col items-start justify-between">
        <h4 className="mb-4 text-sm font-light">{mainTitle}</h4>
        <div className="row-start-4 flex items-center justify-end text-[0.375rem] font-bold tablet:text-[0.625rem]">
          <span>{timeIndicator}</span>
          <ClockIcon className="ml-1 w-4 shrink-0 scale-75 tablet:scale-100" />
        </div>
      </div>

      <div className="flex w-full flex-col items-center">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={290}
          width={200}
        />
        <div className="mx-auto -mt-2 flex w-full max-w-[150px] items-center justify-between text-[0.625rem]">
          <span>{minValue}</span>
          <span className="text-[0.625rem]">{label}</span>
          <span>{maxValue}</span>
        </div>
      </div>
    </div>
  );
};

export default SolidGaugeChart;
