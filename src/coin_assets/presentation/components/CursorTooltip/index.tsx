import React, { useMemo, useState } from 'react';

import ChartChildProps from '@charts/presentation/components/BaseChart/props';
import CoinHistoryItem from '@coin_assets/domain/entities/coin_history_item';
import { styles } from '@coin_assets/presentation/components/CursorTooltip/styles';
import { colors } from '@theme/colors';
import * as d3Array from 'd3-array';
import dayjs from 'dayjs';
import numbro from 'numbro';
import { Animated, Text, View, ViewStyle } from 'react-native';

const CursorTooltip: React.FC<ChartChildProps<CoinHistoryItem>> = ({
  chart,
  data,
  xScale,
  yScale,
  xValues,
  cursorTransform,
}) => {
  const [size, updateSize] = useState<{
    readonly width?: number;
    readonly height?: number;
  }>({});

  const { item, opacity, x, y } = useMemo(() => {
    if (cursorTransform?.x === undefined) {
      return { x: undefined, y: undefined, opacity: { left: 0, right: 0 } };
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
    const cW = chart?.width || 0;
    const iW = size.width || 0;
    return {
      item: cursorItem,
      opacity: {
        left: xPosition + iW > cW ? 0 : 1,
        right: xPosition + iW > cW ? 1 : 0,
      },
      x: xPosition + iW > cW ? xPosition - iW - 4 : xPosition + 4,
      y: yPosition - 56 / 2,
    };
  }, [size, cursorTransform?.x, xScale, xValues, data, yScale, chart?.width]);

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      borderTopStartRadius: opacity.left > 0 ? 0 : 4,
      borderBottomStartRadius: opacity.left > 0 ? 0 : 4,
      borderTopEndRadius: opacity.right > 0 ? 0 : 4,
      borderBottomEndRadius: opacity.right > 0 ? 0 : 4,
    }),
    [opacity.left, opacity.right],
  );

  const arrowStyle = useMemo<ViewStyle>(
    () => ({
      borderRightWidth: opacity.left > 0 ? 56 / 2 : 0,
      borderLeftWidth: opacity.right > 0 ? 56 / 2 : 0,
      borderRightColor: opacity.left > 0 ? 'white' : 'transparent',
      borderLeftColor: opacity.right > 0 ? 'white' : 'transparent',
    }),
    [opacity.left, opacity.right],
  );

  return (
    <>
      {x !== undefined && y !== undefined && (
        <Animated.View
          key={'tooltip'}
          onLayout={({
            nativeEvent: {
              layout: { width, height },
            },
          }) => {
            updateSize({ width, height });
          }}
          style={[
            styles.tooltip,
            { transform: [{ translateX: x }, { translateY: y }] },
          ]}>
          {opacity.left > 0 && (
            <View
              style={[
                arrowStyle,
                styles.arrowStyle,
                {
                  opacity: opacity.left,
                },
              ]}
            />
          )}
          <View
            style={[
              styles.container,
              {
                backgroundColor: colors.primary['50'],
              },
              containerStyle,
            ]}>
            <Text style={styles.price}>
              {numbro(item.price).formatCurrency({
                mantissa: 2,
                trimMantissa: false,
                thousandSeparated: true,
              })}
            </Text>
            <Text style={styles.date}>
              {dayjs(item.time).format('MMM DD[,] YYYY')}
            </Text>
            <Text style={styles.date}>
              {dayjs(item.time).format('hh:mm a')}
            </Text>
          </View>
          {opacity.right > 0 && (
            <View
              style={[
                arrowStyle,
                styles.arrowStyle,
                {
                  opacity: opacity.right,
                },
              ]}
            />
          )}
        </Animated.View>
      )}
    </>
  );
};

export default CursorTooltip;
