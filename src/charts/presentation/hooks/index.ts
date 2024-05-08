import { useMemo, useState } from 'react';

import { calculateDistance, getTransforms } from '@charts/presentation/config';
import { ZoomTransform, zoomIdentity } from 'd3-zoom';
import { PanResponder, PanResponderInstance } from 'react-native';

export const useZoomBehavior = ({
  width,
  height,
  xExtent,
  scaleExtent,
}: {
  width: number;
  height: number;
  xExtent?: [number, number];
  scaleExtent?: [number, number];
}): {
  chartTransform: ZoomTransform;
  cursorTransform?: ZoomTransform;
  responder: PanResponderInstance;
} => {
  const [{ chartTransform, cursorTransform, distance, start }, updateScales] =
    useState<{
      chartTransform: ZoomTransform;
      cursorTransform?: ZoomTransform;
      distance: number;
      start: { deltaX: number; x: number };
    }>({
      chartTransform: zoomIdentity.scale(1),
      distance: 0,
      start: { deltaX: 0, x: 0 },
    });

  const responder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderStart: evt => {
        const touches = evt.nativeEvent.touches.length;
        if (touches >= 2) {
          const a: [number, number] = [
            evt.nativeEvent.touches[0].locationX,
            evt.nativeEvent.touches[0].locationY,
          ];

          const b: [number, number] = [
            evt.nativeEvent.touches[1].locationX,
            evt.nativeEvent.touches[1].locationY,
          ];

          const mDistance = calculateDistance({ a, b }) / chartTransform.k;

          const mDeltaX = (a[0] + b[0]) / 2 / chartTransform.k;
          const mX = chartTransform.x / chartTransform.k;

          updateScales({
            chartTransform,
            cursorTransform,
            distance: mDistance,
            start: {
              deltaX: mDeltaX,
              x: mX,
            },
          });
        }
      },
      onPanResponderMove: (event, state) => {
        const transforms = getTransforms({
          event,
          state,
          chartTransform,
          cursorTransform,
          distance,
          start,
          size: { width, height },
          xExtent,
          scaleExtent,
        });

        updateScales({
          ...transforms,
          distance,
          start,
        });
      },
      onPanResponderRelease: () => {},
    });
  }, [
    chartTransform,
    cursorTransform,
    distance,
    start,
    width,
    height,
    xExtent,
    scaleExtent,
  ]);
  return { chartTransform, cursorTransform, responder };
};
