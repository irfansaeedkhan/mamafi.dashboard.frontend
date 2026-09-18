import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import gsap from 'gsap';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const GaugeChart: React.FC = () => {
  const value = 10;
  const needleRef = useRef<HTMLDivElement>(null);
  const [chartRendered, setChartRendered] = useState(false);

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
      events: {
        mounted: () => {
          setChartRendered(true);
        },
        animationEnd: () => {
          if (chartRendered && needleRef.current) {
            gsap.to(needleRef.current, {
              rotation: (value / 20) * 180 - 90,
              transformOrigin: 'bottom center',
              duration: 1,
              ease: 'power2.out',
            });
          }
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: '50%',
          background: 'transparent',
        },
        track: {
          background: '#333',
          strokeWidth: '100%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          show: false,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#1C83FF'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50],
      },
    },
    stroke: {
      lineCap: 'square',
    },
    labels: ['TrX/Sec'],
    colors: ['#FF294F'],
  };

  const series = [(value / 20) * 100];

  useEffect(() => {
    if (chartRendered && needleRef.current) {
      gsap.set(needleRef.current, {
        rotation: -90,
        transformOrigin: 'bottom center',
      });

      gsap.to(needleRef.current, {
        rotation: (value / 20) * 180 - 90,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, [chartRendered, value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={320}
          width={450}
        />
        {chartRendered && (
          <>
            <div
              ref={needleRef}
              className="absolute"
              style={{
                bottom: '30px',
                left: '50%',
                width: '2px',
                height: '70px',
                backgroundColor: '#fff',
                transformOrigin: 'bottom center',
              }}
            />
            <div
              className="absolute rounded-full bg-gradient-theme-2"
              style={{
                bottom: '30px',
                left: '50%',
                width: '26px',
                height: '26px',
                backgroundColor: '#FF294F',
                transform: 'translate(-50%, 50%)',
              }}
            />
          </>
        )}
      </div>
      {chartRendered && (
        <div className="mt-4 flex w-full justify-between px-6 text-lg text-white">
          <span>0</span>
          <span>{value} TrX/Sec</span>
          <span>20</span>
        </div>
      )}
    </div>
  );
};

export default GaugeChart;
