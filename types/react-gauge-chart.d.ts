declare module 'react-gauge-chart' {
  import { Component } from 'react';

  interface GaugeChartProps {
    id?: string;
    nrOfLevels?: number;
    percent?: number;
    arcsLength?: number[];
    colors?: string[];
    arcPadding?: number;
    arcWidth?: number;
    needleColor?: string;
    needleBaseColor?: string;
    textColor?: string;
    formatTextValue?: (value: number) => string;
    style?: React.CSSProperties;
    animate?: boolean;
    animDelay?: number;
    hideText?: boolean;
  }

  class GaugeChart extends Component<GaugeChartProps> {}

  export default GaugeChart;
}
