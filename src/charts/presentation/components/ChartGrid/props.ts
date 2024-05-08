import ChartChildProps from '@charts/presentation/components/BaseChart/props';
import { LineProps } from 'react-native-svg';

export default interface ChartGridProps extends ChartChildProps<never> {
  readonly svg?: LineProps;
  readonly xAxis: { readonly labelFormat: string };
  readonly yAxis?: { readonly ticks?: number };
}
