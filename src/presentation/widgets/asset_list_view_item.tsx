import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Image, Text, Animated } from 'react-native';
import CoinCapAsset from '../../domain/entities/coin_cap_asset';

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

const getPriceColor = (state: ItemState): string => {
  if (state.currentPrice === state.previousPrice) {
    return 'rgb(255,255,255)';
  }
  if (state.currentPrice > state.previousPrice) {
    return 'rgb(178,223,219)';
  }
  return 'rgb(255,205,210)';
};

const AssetListViewItem: React.FC<ItemProps> = ({ asset }: ItemProps) => {
  const [priceState, setPriceState] = useState<ItemState>({
    previousPrice: asset.priceUsd,
    currentPrice: asset.priceUsd,
    priceAnimation: new Animated.Value(0),
  });

  const boxInterpolation = priceState.priceAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,255,255)', getPriceColor(priceState)],
  });

  useEffect(() => {
    const pricesWs = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${asset.id}`,
    );
    pricesWs.onmessage = msg => {
      const jsonData = JSON.parse(msg.data);
      const newPrice: number = jsonData[asset.id];
      Animated.timing(priceState.priceAnimation, {
        useNativeDriver: false,
        toValue: 1,
        duration: 250,
      }).start(() => {
        Animated.timing(priceState.priceAnimation, {
          useNativeDriver: false,
          toValue: 0,
          duration: 250,
        }).start();
      });
      setPriceState({
        ...priceState,
        previousPrice: priceState.currentPrice,
        currentPrice: newPrice,
      });
    };
    return () => pricesWs.close();
  }, [asset]);

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
            {priceState.currentPrice.toLocaleString('en-US', {
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
