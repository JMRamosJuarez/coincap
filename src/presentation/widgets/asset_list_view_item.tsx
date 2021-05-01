import React from 'react';
import { View, Image, Text } from 'react-native';
import CoinCapAsset from '../../domain/entities/coin_cap_asset';

interface ItemProps {
  asset: CoinCapAsset;
}

const AssetListViewItem: React.FC<ItemProps> = ({ asset }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Image
        source={{
          uri: `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`,
        }}
        style={{
          width: 64,
          height: 64,
          marginStart: 16.0,
          marginEnd: 8.0,
          marginTop: 8.0,
          marginBottom: 8.0,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 8.0,
        }}>
        <Text
          style={{
            fontSize: 20.0,
          }}>
          {asset.name}
        </Text>
        <Text
          style={{
            fontSize: 12.0,
            color: 'gray',
          }}>
          {asset.symbol}
        </Text>
        <Text
          style={{
            color: 'gray',
          }}>
          Price:{' '}
          <Text
            style={{
              color: 'black',
            }}>
            {asset.priceUsd.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </Text>
        <Text
          style={{
            color: 'gray',
          }}>
          Change (24Hr):{' '}
          <Text
            style={{
              color: 'black',
            }}>
            {asset.changePercent24Hr.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default AssetListViewItem;
