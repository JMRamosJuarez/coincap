import React, {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
} from 'react';

import ChartChildProps from '@charts/presentation/components/BaseChart/props';
import { LineChartProps } from '@charts/presentation/components/LineChart/props';
import { styles } from '@charts/presentation/components/LineChart/styles';
import { useZoomBehavior } from '@charts/presentation/hooks';
import * as d3Array from 'd3-array';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

function LineChart<T>({
  style,
  children,
  svg,
  scaleExtent,
  data,
  xAccessor = ({ index }) => index,
  yAccessor,
  contentInsets,
}: PropsWithChildren<LineChartProps<T>>): ReturnType<
  FunctionComponent<LineChartProps<T>>
> {
  const [{ width, height }, updateSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const _xA = useRef(xAccessor).current;
  const _yA = useRef(yAccessor).current;

  const { responder, chartTransform, cursorTransform } = useZoomBehavior({
    width,
    height,
    scaleExtent,
  });

  const { mappedData, xValues, yValues, xExtent, yExtent } = useMemo(() => {
    const values: [number, number][] = data.map((item, index) => [
      _xA({ item, index }),
      _yA({ item, index }),
    ]);

    const xV: number[] = values.map(item => item[0]);
    const yV: number[] = values.map(item => item[1]);

    const [xMin = 0, xMax = 0] = d3Array.extent(xV);
    const [yMin = 0, yMax = 0] = d3Array.extent(yV);

    const xE: [number, number] = [xMin, xMax];
    const yE: [number, number] = [yMin, yMax];

    return {
      mappedData: values,
      xValues: xV,
      yValues: yV,
      xExtent: xE,
      yExtent: yE,
    };
  }, [_xA, _yA, data]);

  const { path, xScale, yScale } = useMemo(() => {
    const { left = 0, right = 0, top = 0, bottom = 0 } = contentInsets ?? {};
    const xS = chartTransform
      .rescaleX(d3Scale.scaleLinear().domain(xExtent).range([0, width]))
      .range([left, width - right]);

    const yS = d3Scale
      .scaleLinear()
      .domain(yExtent)
      .range([height - bottom, top]);

    const mPath =
      d3Shape
        .line<[number, number]>()
        .x(d => xS(d[0]))
        .y(d => yS(d[1]))
        .curve(d3Shape.curveLinear)(mappedData) ?? '';
    return { path: mPath, xScale: xS, yScale: yS };
  }, [
    contentInsets,
    xExtent,
    yExtent,
    width,
    height,
    mappedData,
    chartTransform,
  ]);

  const childrenProps: ChartChildProps<T> = {
    chart: { width, height, contentInsets },
    data,
    path,
    chartTransform,
    cursorTransform,
    xScale,
    yScale,
    xValues,
    yValues,
    xExtent,
    yExtent,
  };

  return (
    <View style={[styles.container, style]}>
      {Children.map(children, child => {
        if (child && isValidElement(child) && child.props.position === 'top') {
          return cloneElement(child, childrenProps);
        }
        return null;
      })}
      <View style={[styles.chart, styles.row]}>
        {Children.map(children, child => {
          if (
            child &&
            isValidElement(child) &&
            child.props.position === 'left'
          ) {
            return cloneElement(child, childrenProps);
          }
          return null;
        })}
        <View
          style={styles.chart}
          onLayout={event => {
            updateSize({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            });
          }}>
          {data.length > 0 && width > 0 && height > 0 && (
            <Svg {...responder.panHandlers} width={width} height={height}>
              {Children.map(children, child => {
                if (
                  child &&
                  isValidElement(child) &&
                  child.props.position === 'below-chart'
                ) {
                  return cloneElement(child, childrenProps);
                }
                return null;
              })}
              <Path
                stroke={'gray'}
                fill={'transparent'}
                strokeWidth={1}
                {...svg}
                d={path ?? ''}
              />
              {Children.map(children, child => {
                if (
                  child &&
                  isValidElement(child) &&
                  child.props.position === 'top-chart'
                ) {
                  return cloneElement(child, childrenProps);
                }
                return null;
              })}
            </Svg>
          )}
        </View>
        {Children.map(children, child => {
          if (
            child &&
            isValidElement(child) &&
            child.props.position === 'right'
          ) {
            return cloneElement(child, childrenProps);
          }
          return null;
        })}
      </View>
      {Children.map(children, child => {
        if (
          child &&
          isValidElement(child) &&
          child.props.position === 'bottom'
        ) {
          return cloneElement(child, childrenProps);
        }
        return null;
      })}
    </View>
  );
}

export default LineChart;
