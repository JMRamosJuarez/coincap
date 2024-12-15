import React, { useMemo } from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { styles } from '@coin_assets/presentation/components/CoinAssetDetailTabletHeader/styles';
import { useCoinAssetPrice } from '@coin_assets/presentation/redux/selectors/prices';
import { useAppTheme } from '@theme/index';
import dayjs from 'dayjs';
import { Text, View } from 'react-native';

const CoinAssetDetailTabletHeader: React.FC<{
  readonly coinAsset: CoinAsset;
}> = ({ coinAsset }) => {
  const { colors } = useAppTheme();

  const title = useMemo(
    () => `${coinAsset?.name || '----'} (${coinAsset?.symbol || '--'})`,
    [coinAsset?.name, coinAsset?.symbol],
  );

  const { timestamp } = useCoinAssetPrice(coinAsset);

  const lastUpdate = useMemo(() => {
    const value = dayjs(timestamp).format('MMMM[,] DD - hh:mm:ss a');
    return `${value[0].toUpperCase()}${value.slice(1)}`;
  }, [timestamp]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary['800'],
        },
      ]}>
      <Text
        style={[
          styles.title,
          {
            color: colors.primary['50'],
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.subtitle,
          {
            color: colors.primary['50'],
          },
        ]}>
        {lastUpdate}
      </Text>
    </View>
  );
};

export default CoinAssetDetailTabletHeader;
