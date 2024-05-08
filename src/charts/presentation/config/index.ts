import { zoomIdentity, ZoomTransform } from 'd3-zoom';
import { GestureResponderEvent, PanResponderGestureState } from 'react-native';

export const calculateDistance = (points: {
  a: [number, number];
  b: [number, number];
}): number => {
  const [x1, y1] = points.a;
  const [x2, y2] = points.b;
  return Math.hypot(x2 - x1, y2 - y1);
};

const calculateScale = ({
  points,
  scaleExtent,
}: {
  points: { a: number; b: number };
  scaleExtent: [number, number];
}): number => {
  const [min, max] = scaleExtent;
  const scale = points.a / points.b;
  return Math.min(Math.max(min, scale), max);
};

export const getCursorTransform = ({
  x,
  size: { width },
  xExtent = [0, 0],
}: {
  x: number;
  size: { width: number; height: number };
  xExtent?: [number, number];
}): ZoomTransform => {
  const xLimits = {
    left: 0,
    right: width,
  };

  const extent = {
    left: xLimits.left + -xExtent[0],
    right: xLimits.right + -xExtent[1],
  };

  if (x >= extent.right) {
    return zoomIdentity.translate(extent.right, 0);
  }

  if (x <= extent.left) {
    return zoomIdentity.translate(extent.left, 0);
  }

  return zoomIdentity.translate(x, 0);
};

export const getChartTransform = ({
  distance,
  points: [a, b],
  start,
  size: { width },
  xExtent = [0, 0],
  scaleExtent = [1, 1],
}: {
  distance: number;
  points: [[number, number], [number, number]];
  start: { x: number; deltaX: number };
  size: { width: number; height: number };
  xExtent?: [number, number];
  scaleExtent?: [number, number];
}): ZoomTransform => {
  const mDistance = calculateDistance({ a, b });

  const mScale = calculateScale({
    points: { a: mDistance, b: distance },
    scaleExtent,
  });

  const xLimits = {
    left: 0,
    right: -width * mScale + width,
  };

  const extent = {
    left: xLimits.left + -xExtent[0],
    right: xLimits.right + -xExtent[1],
  };

  const mDeltaX = (a[0] + b[0]) / 2;

  const startDeltaX = (start.x - start.deltaX) * mScale;

  const x = startDeltaX + mDeltaX;

  if (x <= extent.right) {
    return zoomIdentity.translate(extent.right, 0).scale(mScale);
  }

  if (x >= extent.left) {
    return zoomIdentity.translate(extent.left, 0).scale(mScale);
  }

  return zoomIdentity.translate(x, 0).scale(mScale);
};

export const getTransforms = ({
  event,
  chartTransform,
  cursorTransform,
  distance,
  start,
  size,
  xExtent,
  scaleExtent,
}: {
  event: GestureResponderEvent;
  state: PanResponderGestureState;
  chartTransform: ZoomTransform;
  cursorTransform?: ZoomTransform;
  distance: number;
  start: { x: number; deltaX: number };
  size: { width: number; height: number };
  xExtent?: [number, number];
  scaleExtent?: [number, number];
}): {
  chartTransform: ZoomTransform;
  cursorTransform?: ZoomTransform;
} => {
  const touches = event.nativeEvent.touches.length;

  if (touches >= 2) {
    const a: [number, number] = [
      event.nativeEvent.touches[0].locationX,
      event.nativeEvent.touches[0].locationY,
    ];

    const b: [number, number] = [
      event.nativeEvent.touches[1].locationX,
      event.nativeEvent.touches[1].locationY,
    ];

    const mChartTransform = getChartTransform({
      distance,
      points: [a, b],
      start,
      size,
      xExtent,
      scaleExtent,
    });
    return { chartTransform: mChartTransform, cursorTransform };
  }

  const mCursorTransform = getCursorTransform({
    x: event.nativeEvent.locationX,
    size,
    xExtent,
  });

  return { chartTransform, cursorTransform: mCursorTransform };
};
