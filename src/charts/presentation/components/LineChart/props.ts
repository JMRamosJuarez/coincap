import { StyleProp, ViewStyle } from 'react-native';
import { CommonPathProps } from 'react-native-svg';

export interface ChartContentInsets {
  readonly top?: number;
  readonly bottom?: number;
  readonly left?: number;
  readonly right?: number;
}

export interface LineChartProps<T> {
  readonly style?: StyleProp<ViewStyle>;
  readonly svg?: CommonPathProps;
  readonly data: Array<T>;
  readonly scaleExtent: [number, number];
  readonly contentInsets?: ChartContentInsets;
  readonly xAccessor?: (params: { index: number; item: T }) => number;
  readonly yAccessor: (params: { index: number; item: T }) => number;
}
