import React, {
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

import { XAxisProps } from '@charts/presentation/components/x_axis/props';
import { styles } from '@charts/presentation/components/x_axis/styles';
import { Text, View } from 'react-native';
import { G, Svg, Text as SVGText } from 'react-native-svg';

function XAxis<T>({
  style,
  svg,
  data,
  xScale,
  chart,
  labelFormat = '',
  formatLabel = ({ index }) => `${index}`,
}: PropsWithChildren<XAxisProps<T>>): ReturnType<
  FunctionComponent<XAxisProps<T>>
> {
  const ticks = useMemo(() => {
    const width = chart?.width ?? 0;
    const numberOfTicks = Math.floor(width / ((labelFormat.length + 2) * 7.5));
    const _items = data ?? [];
    return (
      xScale
        ?.ticks(numberOfTicks)
        .map(tick => {
          const item = _items[tick];
          return { x: xScale(tick), item };
        })
        ?.filter(item => item.item) ?? []
    );
  }, [xScale, chart, labelFormat.length, data]);

  const [{ width, height }, updateSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  return (
    <View
      style={style}
      onLayout={({ nativeEvent: { layout } }) =>
        updateSize({ width: layout.width, height: layout.height })
      }>
      <Text
        style={[
          styles.placeholder,
          {
            fontSize: svg?.fontSize,
            fontFamily: svg?.fontFamily,
            fontWeight: svg?.fontWeight,
          },
        ]}>
        {'placeholder'}
      </Text>
      {width > 0 && height > 0 && (
        <Svg style={[styles.svg, { width, height }]}>
          <G>
            {ticks.slice(1, ticks.length).map(({ x, item }, index) => {
              return (
                <SVGText
                  key={index}
                  fontSize={14}
                  fill={'gray'}
                  {...svg}
                  x={x}
                  originX={x}
                  y={height / 2}
                  originY={height / 2}
                  textAnchor={'middle'}
                  alignmentBaseline={'middle'}>
                  {formatLabel({
                    index: index,
                    format: labelFormat,
                    item: item,
                  })}
                </SVGText>
              );
            })}
          </G>
        </Svg>
      )}
    </View>
  );
}

export default XAxis;
