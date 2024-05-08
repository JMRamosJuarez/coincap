import React from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { useAnimatedCurrencyColor } from '@coin_assets/presentation/hooks';
import { useCoinAssetPrice } from '@coin_assets/presentation/redux/selectors/prices';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { Animated, TextProps } from 'react-native';

const RealTimeCoinAssetPrice: React.FC<
  TextProps & { readonly coinAsset: CoinAsset }
> = props => {
  const { colors } = useAppTheme();

  const { price } = useCoinAssetPrice(props.coinAsset);

  const color = useAnimatedCurrencyColor({
    price,
    colors: {
      negative: colors.red['500'],
      neutral: colors.primary['50'],
      positive: colors.green['500'],
    },
  });

  return (
    <Animated.Text {...props} style={[props.style, { color }]}>
      {numbro(price).formatCurrency({
        mantissa: 5,
        trimMantissa: false,
        thousandSeparated: true,
      })}
    </Animated.Text>
  );
};

export default RealTimeCoinAssetPrice;
