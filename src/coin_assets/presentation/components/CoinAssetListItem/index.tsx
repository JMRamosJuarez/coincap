import React, { useMemo } from 'react';

import CoinAssetListItemProps from '@coin_assets/presentation/components/CoinAssetListItem/props';
import { styles } from '@coin_assets/presentation/components/CoinAssetListItem/styles';
import { useAnimatedCurrencyColor } from '@coin_assets/presentation/hooks';
import { useIsCoinSelected } from '@coin_assets/presentation/redux/selectors';
import { useCoinAssetPrice } from '@coin_assets/presentation/redux/selectors/prices';
import { AnimatedTouch } from '@core/presentation/components/Animated';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { Image, Text, View } from 'react-native';
import { isTablet } from 'react-native-device-info';

const PhoneListItem: React.FC<CoinAssetListItemProps> = ({
  coinAsset,
  onPress,
}) => {
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

const TableListItem: React.FC<CoinAssetListItemProps> = ({
  coinAsset,
  onPress,
}) => {
  const { colors } = useAppTheme();

  const { price } = useCoinAssetPrice(coinAsset);

  const uri = useMemo(
    () =>
      `https://assets.coincap.io/assets/icons/${coinAsset.symbol.toLowerCase()}@2x.png`,
    [coinAsset.symbol],
  );

  const selected = useIsCoinSelected(coinAsset.id);

  const backgroundColor = useAnimatedCurrencyColor({
    price,
    colors: {
      negative: colors.red['520'],
      neutral: selected ? colors.primary['900'] : colors.primary['800'],
      positive: colors.green['520'],
    },
  });

  return (
    <AnimatedTouch
      activeOpacity={0.7}
      onPress={() => onPress(coinAsset)}
      style={[
        styles.container,
        {
          backgroundColor,
          borderWidth: 0.5,
          borderColor: selected ? 'white' : 'transparent',
        },
      ]}>
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
        <Text
          numberOfLines={1}
          style={[styles.price, { color: colors.primary['50'] }]}>
          {numbro(price).formatCurrency({
            mantissa: 5,
            trimMantissa: false,
            thousandSeparated: true,
          })}
        </Text>
      </View>
    </AnimatedTouch>
  );
};

const CoinAssetListItem: React.FC<CoinAssetListItemProps> = props => {
  const tablet = isTablet();
  if (tablet) {
    return <TableListItem {...props} />;
  }
  return <PhoneListItem {...props} />;
};

export default CoinAssetListItem;
