import ChartChildProps from '@charts/presentation/components/BaseChart/props';
import { StyleProp, ViewStyle } from 'react-native';
import { TextProps as SVGTextProps } from 'react-native-svg';

export interface YAxisProps<T> extends ChartChildProps<T> {
  readonly style?: StyleProp<ViewStyle>;
  readonly svg?: SVGTextProps;
  readonly formatLabel?: (param: {
    readonly index: number;
    readonly item: number;
  }) => string;
  readonly numberOfTicks?: number;
}
