import { useEffect, useMemo, useRef } from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { useUpdateCoinAssetPricesAction } from '@coin_assets/presentation/redux/actions';
import { useCoinHistoryTime } from '@coin_assets/presentation/redux/selectors/history';
import { CoinAssetPrices } from '@coin_assets/presentation/redux/state';
import { Animated } from 'react-native';

export const useCoinPricesSocket = (coinAssets: CoinAsset[]) => {
  const updatePrices = useUpdateCoinAssetPricesAction();
  return useEffect(() => {
    const ids = coinAssets.map(c => c.id).join(',');
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${ids}`);
    pricesWs.onmessage = event => {
      const model: { [key: string]: number } = JSON.parse(event.data);

      const pricesHolder: CoinAssetPrices = {};

      const timestamp = new Date().getTime();

      const data: CoinAssetPrices = Object.keys(model).reduce((holder, k) => {
        const price = model[k];
        holder[k] = { price, timestamp };
        return holder;
      }, pricesHolder);

      updatePrices(data);
    };
    return () => {
      pricesWs.close();
    };
  }, [coinAssets, updatePrices]);
};

export const useAnimatedCurrencyColor = ({
  price,
  colors,
}: {
  readonly price: number;
  readonly colors: {
    readonly negative: string;
    readonly neutral: string;
    readonly positive: string;
  };
}): Animated.AnimatedInterpolation<string | number> => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const prevPrice = useRef<number>(price || 0);

  const valueColor = useMemo(() => {
    if (price === prevPrice.current) {
      return colors.neutral;
    }
    return price > prevPrice.current ? colors.positive : colors.negative;
  }, [colors.negative, colors.neutral, colors.positive, price]);

  const backgroundColor = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [colors.neutral, valueColor, colors.neutral],
        extrapolate: 'clamp',
      }),
    [animatedValue, colors.neutral, valueColor],
  );

  const animation = useMemo(
    () =>
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 750,
        useNativeDriver: false,
      }),
    [animatedValue],
  );

  useEffect(() => {
    if (prevPrice.current !== price) {
      animation.start();
      prevPrice.current = price;
    }
    return () => animation.reset();
  }, [animation, price]);

  return backgroundColor;
};

export const useCoinHistoryTimeFormat = () => {
  const time = useCoinHistoryTime();

  return useMemo(() => {
    switch (time.id) {
      case '1D':
      case '1W':
        return 'hh a';
      case '1M':
      case '3M':
      case '6M':
        return 'MMM DD';
      case '1Y':
        return 'MMM YYYY';
      default:
        return 'MMM DD';
    }
  }, [time.id]);
};
