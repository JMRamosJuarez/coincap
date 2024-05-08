import { ScaleLinear } from 'd3-scale';
import { ZoomTransform } from 'd3-zoom';

export default interface ChartChildProps<T> {
  readonly position?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'below-chart'
    | 'top-chart';
  readonly chart?: {
    readonly width: number;
    readonly height: number;
    contentInsets?: {
      readonly top?: number;
      readonly bottom?: number;
      readonly left?: number;
      readonly right?: number;
    };
  };
  readonly data?: Array<T>;
  readonly path?: string;
  readonly chartTransform?: ZoomTransform;
  readonly cursorTransform?: ZoomTransform;
  readonly xScale?: ScaleLinear<number, number>;
  readonly yScale?: ScaleLinear<number, number>;
  readonly xValues?: Array<number>;
  readonly yValues?: Array<number>;
  readonly xExtent?: [number, number];
  readonly yExtent?: [number, number];
}
