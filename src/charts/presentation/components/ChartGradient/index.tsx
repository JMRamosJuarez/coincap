import React from 'react';

import ChartChildProps from '@charts/presentation/components/BaseChart/props';
import { ColorValue } from 'react-native';
import { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

const ChartGradient: React.FC<
  ChartChildProps<never> & {
    readonly color: ColorValue;
  }
> = ({ chart, path = '', color }) => {
  const width = chart?.width ?? 0;
  const height = chart?.height ?? 0;
  const left = chart?.contentInsets?.left ?? 0;
  const right = chart?.contentInsets?.right ?? 0;
  return (
    <G>
      <Defs>
        <LinearGradient
          id={'gradient'}
          x1={'0%'}
          y1={'0%'}
          x2={'0%'}
          y2={'100%'}>
          <Stop offset="100%" stopColor={'transparent'} stopOpacity="0" />
          <Stop offset="50%" stopColor={color} stopOpacity="0.45" />
        </LinearGradient>
      </Defs>
      <Path
        key={'path-background'}
        d={`${path} L ${width - right},${height} L ${left},${height}`}
        fill={'url(#gradient)'}
        stroke={'none'}
      />
    </G>
  );
};

export default ChartGradient;
