import React, { useMemo } from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { styles } from '@coin_assets/presentation/components/CoinAssetListItem/styles';
import { useAnimatedCurrencyColor } from '@coin_assets/presentation/hooks';
import { useCoinAssetPrice } from '@coin_assets/presentation/redux/selectors/prices';
import { AnimatedTouch } from '@core/presentation/components/Animated';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { Image, Text, View } from 'react-native';

const CoinAssetListItem: React.FC<{
  readonly coinAsset: CoinAsset;
  readonly onPress: (coinAsset: CoinAsset) => void;
}> = ({ coinAsset, onPress }) => {
  const { colors } = useAppTheme();

  const { price } = useCoinAssetPrice(coinAsset);

  const uri = useMemo(
    () =>
      `https://assets.coincap.io/assets/icons/${coinAsset.symbol.toLowerCase()}@2x.png`,
    [coinAsset.symbol],
  );

  const backgroundColor = useAnimatedCurrencyColor({
    price,
    colors: {
      negative: colors.red['520'],
      neutral: colors.primary['800'],
      positive: colors.green['520'],
    },
  });

  return (
    <AnimatedTouch
      activeOpacity={0.7}
      onPress={() => onPress(coinAsset)}
      style={[styles.container, { backgroundColor }]}>
      <Image
        width={30}
        height={30}
        source={{
          uri,
        }}
      />
      <View style={styles.data}>
        <Text
          numberOfLines={1}
          style={[styles.name, { color: colors.primary['50'] }]}>
          {coinAsset.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[{ color: colors.primary['500'] }, styles.symbol]}>
          {coinAsset.symbol}
        </Text>
      </View>
      <Text
        numberOfLines={1}
        style={[styles.price, { color: colors.primary['50'] }]}>
        {numbro(price).formatCurrency({
          mantissa: 5,
          trimMantissa: false,
          thousandSeparated: true,
        })}
      </Text>
    </AnimatedTouch>
  );
};

export default CoinAssetListItem;
