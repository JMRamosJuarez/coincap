import ChartChildProps from '@charts/presentation/components/BaseChart/props';
import { StyleProp, ViewStyle } from 'react-native';
import { TextProps as SVGTextProps } from 'react-native-svg';

export interface XAxisProps<T> extends ChartChildProps<T> {
  readonly style?: StyleProp<ViewStyle>;
  readonly svg?: SVGTextProps;
  readonly labelFormat?: string;
  readonly formatLabel?: (params: {
    index: number;
    format: string;
    item: T;
  }) => string;
}
