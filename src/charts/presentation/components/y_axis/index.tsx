import React, {
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

import { YAxisProps } from '@charts/presentation/components/y_axis/props';
import { styles } from '@charts/presentation/components/y_axis/styles';
import { Text, View } from 'react-native';
import { G, Svg, Text as SVGText } from 'react-native-svg';

function YAxis<T>({
  style,
  svg,
  yScale,
  numberOfTicks,
  formatLabel = ({ index }) => `${index}`,
}: PropsWithChildren<YAxisProps<T>>): ReturnType<
  FunctionComponent<YAxisProps<T>>
> {
  const ticks = useMemo(() => {
    return (
      yScale?.ticks(numberOfTicks ?? 5).map(item => {
        return { y: yScale(item), item };
      }) ?? []
    );
  }, [yScale, numberOfTicks]);

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
      {ticks.map(({ item }, index) => {
        return (
          <Text
            key={index}
            style={[
              styles.placeholder,
              {
                fontSize: svg?.fontSize,
                fontFamily: svg?.fontFamily,
                fontWeight: svg?.fontWeight,
              },
            ]}>
            {formatLabel({ index, item })}
          </Text>
        );
      })}
      {width > 0 && height > 0 && (
        <Svg style={[styles.svg, { width, height }]}>
          <G>
            {ticks.map(({ y, item }, index) => {
              return (
                <SVGText
                  key={index}
                  fontSize={14}
                  fill={'gray'}
                  {...svg}
                  y={y}
                  originY={y}
                  alignmentBaseline={'middle'}>
                  {formatLabel({ index, item })}
                </SVGText>
              );
            })}
          </G>
        </Svg>
      )}
    </View>
  );
}

export default YAxis;
