import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Image, Text, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { tryParseNumber } from '../../data/utils/utils';
import CoinCapAsset from '../../domain/entities/coin_cap_asset';
import { CoinCapAppState } from '../redux/reducers/app_reducers';

const styles = StyleSheet.create({
  animatedBackground: {
    flexDirection: 'row',
  },
  img: {
    width: 64,
    height: 64,
    marginStart: 16.0,
    marginEnd: 8.0,
    marginTop: 8.0,
    marginBottom: 8.0,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 8.0,
  },
  assetTitle: {
    fontSize: 20.0,
  },
  assetSymbol: {
    fontSize: 12.0,
    color: 'gray',
  },
  priceLabel: {
    color: 'gray',
  },
  priceCurrency: {
    color: 'black',
  },
  changeLabel: {
    color: 'gray',
  },
  changeCurrency: {
    color: 'black',
  },
});

interface ItemProps {
  asset: CoinCapAsset;
}

interface ItemState {
  previousPrice: number;
  currentPrice: number;
  priceAnimation: Animated.Value;
}

const getPriceColor = (oldPrice: number, newPrice: number): string => {
  if (oldPrice === newPrice) {
    return 'rgb(255,255,255)';
  }
  if (newPrice > oldPrice) {
    return 'rgb(178,223,219)';
  }
  return 'rgb(255,205,210)';
};

const AssetListViewItem: React.FC<ItemProps> = ({ asset }: ItemProps) => {
  const oldPrice = useSelector((state: CoinCapAppState) => {
    const baseState = state.assets.baseState;
    if (baseState.type === 'success_state') {
      const pricesData = baseState.previousPricesData;
      const assetPrice = pricesData ? pricesData[asset.id] : undefined;
      return assetPrice
        ? tryParseNumber(assetPrice, asset.priceUsd)
        : asset.priceUsd;
    }
    return asset.priceUsd;
  });

  const newPrice = useSelector((state: CoinCapAppState) => {
    const baseState = state.assets.baseState;
    if (baseState.type === 'success_state') {
      const pricesData = baseState.currentPricesData;
      const assetPrice = pricesData ? pricesData[asset.id] : undefined;
      return assetPrice
        ? tryParseNumber(assetPrice, asset.priceUsd)
        : asset.priceUsd;
    }
    return asset.priceUsd;
  });

  const [priceAnimation] = useState(new Animated.Value(0));

  const boxInterpolation = priceAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,255,255)', getPriceColor(oldPrice, newPrice)],
  });

  useEffect(() => {
    Animated.timing(priceAnimation, {
      useNativeDriver: false,
      toValue: 1,
      duration: 1000,
    }).start();
  });

  return (
    <Animated.View
      style={[
        styles.animatedBackground,
        { backgroundColor: boxInterpolation },
      ]}>
      <Image
        source={{
          uri: `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`,
        }}
        style={styles.img}
      />
      <View style={styles.dataContainer}>
        <Text style={styles.assetTitle}>{asset.name}</Text>
        <Text style={styles.assetSymbol}>{asset.symbol}</Text>
        <Text style={styles.priceLabel}>
          Price:{' '}
          <Text style={styles.priceCurrency}>
            {newPrice.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </Text>
        <Text style={styles.changeLabel}>
          Change (24Hr):{' '}
          <Text style={styles.changeCurrency}>
            {asset.changePercent24Hr.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </Text>
      </View>
    </Animated.View>
  );
};

export default AssetListViewItem;
