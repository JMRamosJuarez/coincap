import React from 'react';

import { styles } from '@coin_assets/presentation/components/CoinAssetListItemSkeleton/styles';
import Skeleton from '@core/presentation/components/Skeleton';
import { useAppTheme } from '@theme/index';
import { View } from 'react-native';

const CoinAssetListItemSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primary['800'] }]}>
      <Skeleton width={30} height={30} />
      <View style={styles.data}>
        <Skeleton width={150} height={16} style={styles.title} />
        <Skeleton width={100} height={14} style={styles.symbol} />
      </View>
      <Skeleton width={80} height={16} style={styles.price} />
    </View>
  );
};

export default CoinAssetListItemSkeleton;
