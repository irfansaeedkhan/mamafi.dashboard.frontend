import { ClockIcon, LeafIcon } from '@/assets/svgs';
import React from 'react';
import GaugeChart from 'react-gauge-chart';

interface GradientGaugeChartProps {
  value: number;
  maxValue: number;
  minValue: number;
  colorStart: string;
  colorEnd: string;
  mainTitle: string;
  timeIndicator: string;
  label: string;
  color: string;
  greenFootPrint?: boolean;
}

const GradientGaugeChart: React.FC<GradientGaugeChartProps> = ({
  value,
  maxValue,
  minValue,
  mainTitle,
  timeIndicator,
  label,
  colorStart,
  colorEnd,
  greenFootPrint = false,
}) => {
  const percentValue = value / maxValue;

  return (
    <div className="bg-blue-light z-10 flex h-full w-full flex-col items-center justify-between rounded-lg p-4 text-white shadow-lg md:flex-row">
      <div className="mb-4 flex h-full w-full flex-col items-start justify-between md:w-1/2">
        <h4 className="text-sm font-light">{mainTitle}</h4>
        <div className="flex items-center justify-end text-[0.475rem] font-bold tablet:text-[0.625rem]">
          <span>{timeIndicator}</span>
          <ClockIcon className="ml-1 w-4 shrink-0 scale-75 tablet:scale-100" />
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col justify-end md:w-1/2">
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={maxValue}
          arcsLength={[percentValue, 1 - percentValue]}
          colors={['url(#gradient)', '#333']}
          percent={percentValue}
          arcPadding={0.02}
          needleColor="#ffffff5c"
          needleBaseColor={colorStart}
          hideText={true}
          textColor="#fff"
          formatTextValue={() => `${value} ${label}`}
          style={{ width: '100%' }}
        />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: colorStart, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: colorEnd, stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-4 flex w-full justify-between px-10 text-[0.825rem] text-white md:px-6 md:text-[0.525rem]">
          <span>{minValue}</span>
          <span className="flex flex-col items-center text-center">
            <span>{value.toFixed(2)}</span>
            <span>{label}</span>
          </span>
          <span>{maxValue}</span>
        </div>

        {greenFootPrint && (
          <LeafIcon className="absolute right-6 top-1 scale-150 md:right-5 md:top-10 md:scale-100" />
        )}
      </div>
    </div>
  );
};

export default GradientGaugeChart;
