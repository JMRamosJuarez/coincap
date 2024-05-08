import React, { useMemo } from 'react';

import ChartChildProps from '@charts/presentation/components/BaseChart/props';
import CoinHistoryItem from '@coin_assets/domain/entities/coin_history_item';
import { useAppTheme } from '@theme/index';
import * as d3Array from 'd3-array';
import { Circle, G, Line } from 'react-native-svg';

const ChartCursor: React.FC<ChartChildProps<CoinHistoryItem>> = ({
  chart,
  data,
  xScale,
  yScale,
  xValues,
  cursorTransform,
}) => {
  const { colors } = useAppTheme();

  const { x, y } = useMemo(() => {
    if (cursorTransform?.x === undefined) {
      return { x: undefined, y: undefined };
    }
    const mCursorX = cursorTransform?.x ?? 0;
    const xInverted = xScale?.invert(mCursorX) ?? 0;
    const xItems = xValues ?? [];
    const cursorIndex = d3Array.bisectCenter(xItems, xInverted);
    const xIndex = xItems[cursorIndex];
    const items = data ?? [];
    const cursorItem = items[xIndex];
    const xPosition = xScale ? xScale(xIndex) : 0;
    const yPosition = yScale ? yScale(cursorItem.price) : 0;
    return {
      x: xPosition,
      y: yPosition,
    };
  }, [cursorTransform?.x, data, xScale, xValues, yScale]);

  const left = chart?.contentInsets?.left ?? 0;
  const right = chart?.contentInsets?.right ?? 0;

  const top = chart?.contentInsets?.top ?? 0;
  const bottom = chart?.contentInsets?.bottom ?? 0;

  const width = chart?.width ?? 0;
  const height = chart?.height ?? 0;

  return (
    <G>
      {x !== undefined && (
        <Line
          id={'cursor-x'}
          x={x}
          y1={top}
          y2={height - bottom}
          stroke={colors.primary['300']}
          strokeWidth={1}
          strokeDasharray={'8, 4'}
        />
      )}
      {y !== undefined && (
        <Line
          id={'cursor-y'}
          y={y}
          x1={left}
          x2={width - right}
          stroke={colors.primary['300']}
          strokeWidth={1}
          strokeDasharray={'8, 4'}
        />
      )}
      {x !== undefined && y !== undefined && (
        <Circle
          cx={x}
          cy={y}
          r={4}
          stroke={colors.primary['100']}
          strokeWidth={2}
          fill={colors.secondary['300']}
        />
      )}
    </G>
  );
};

export default ChartCursor;
