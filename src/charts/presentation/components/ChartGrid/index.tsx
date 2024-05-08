import React, { useMemo } from 'react';

import ChartGridProps from '@charts/presentation/components/ChartGrid/props';
import { G, Line } from 'react-native-svg';

const ChartGrid: React.FC<ChartGridProps> = ({
  svg,
  xAxis,
  yAxis,
  chart,
  xScale,
  yScale,
}) => {
  const xA = useMemo(() => {
    const width = chart?.width ?? 0;
    const labelFormat = xAxis.labelFormat;
    const numberOfTicks = Math.floor(width / ((labelFormat.length + 2) * 7.5));
    return xScale?.ticks(numberOfTicks).map(item => xScale(item)) ?? [];
  }, [chart?.width, xAxis.labelFormat, xScale]);

  const yA = useMemo(() => {
    const ticks = yAxis?.ticks ?? 5;
    return yScale?.ticks(ticks).map(item => yScale(item)) ?? [];
  }, [yAxis?.ticks, yScale]);

  const left = chart?.contentInsets?.left ?? 0;
  const right = chart?.contentInsets?.right ?? 0;

  const top = chart?.contentInsets?.top ?? 0;
  const bottom = chart?.contentInsets?.bottom ?? 0;

  const width = chart?.width ?? 0;
  const height = chart?.height ?? 0;

  return (
    <G>
      {yA.map((y, index) => (
        <Line
          key={index}
          stroke={'rgba(0,0,0,0.2)'}
          {...svg}
          x1={left}
          x2={width - right}
          y1={y}
          y2={y}
        />
      ))}
      {xA.map((x, index) => (
        <Line
          key={index}
          stroke={'rgba(0,0,0,0.2)'}
          {...svg}
          y1={top}
          y2={height - bottom}
          x1={x}
          x2={x}
        />
      ))}
    </G>
  );
};

export default ChartGrid;
