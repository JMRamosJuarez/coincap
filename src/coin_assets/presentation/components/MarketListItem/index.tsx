import React, { useCallback, useRef, useState } from 'react';

import ArrowDown from '@assets/svg/arrow-down.svg';
import Market from '@coin_assets/domain/entities/market';
import MarketDataItem from '@coin_assets/presentation/components/MarketDataItem';
import { styles } from '@coin_assets/presentation/components/MarketListItem/styles';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { useTranslation } from 'react-i18next';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

const MarketListItem: React.FC<{
  readonly market: Market;
}> = ({ market }) => {
  const { colors } = useAppTheme();

  const { t } = useTranslation();

  const [isExpanded, setExpanded] = useState<boolean>(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const height = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 56.57],
  });

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animate = useCallback(
    () =>
      Animated.timing(animatedValue, {
        toValue: isExpanded ? 0 : 1,
        duration: 350,
        useNativeDriver: false,
      }).start(() => setExpanded(!isExpanded)),
    [animatedValue, isExpanded],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={animate}
      style={[
        styles.container,
        {
          backgroundColor: colors.primary['800'],
        },
      ]}>
      <View
        style={[
          styles.row,
          {
            backgroundColor: colors.primary['800'],
          },
        ]}>
        <View style={styles.data}>
          <Text style={[styles.exchange, { color: colors.primary['50'] }]}>
            {market.exchange}
          </Text>
          <Text style={[styles.price, { color: colors.primary['50'] }]}>
            {numbro(market.price).formatCurrency({
              mantissa: 2,
              trimMantissa: false,
              thousandSeparated: true,
            })}
          </Text>
        </View>
        <Text style={[styles.symbol, { color: colors.primary['50'] }]}>
          {`${market.symbol.base}/${market.symbol.quote}`}
        </Text>
        <Animated.View style={[styles.arrow, { transform: [{ rotate }] }]}>
          <ArrowDown stroke={colors.primary['50']} />
        </Animated.View>
      </View>
      <Animated.View
        style={[
          styles.animated,
          {
            backgroundColor: colors.primary['800'],
            height,
          },
        ]}>
        <Animated.View style={styles.animatedBody}>
          <MarketDataItem
            style={styles.dataItem}
            market={market}
            title={{ label: t('volume_24Hr') }}
            data={{
              extractor: m =>
                numbro(m.volume.v24Hr).formatCurrency({
                  mantissa: 2,
                  trimMantissa: false,
                  thousandSeparated: true,
                }),
            }}
          />
          <MarketDataItem
            style={styles.dataItem}
            market={market}
            title={{ label: t('volume_percentage') }}
            data={{
              extractor: m =>
                `${numbro(m.volume.percent).format({
                  mantissa: 2,
                  trimMantissa: false,
                  thousandSeparated: true,
                })}%`,
            }}
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default MarketListItem;
