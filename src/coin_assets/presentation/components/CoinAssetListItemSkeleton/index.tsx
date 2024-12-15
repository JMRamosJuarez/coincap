import React from 'react';

import { styles } from '@coin_assets/presentation/components/CoinAssetListItemSkeleton/styles';
import Skeleton from '@core/presentation/components/Skeleton';
import { useAppTheme } from '@theme/index';
import { View } from 'react-native';
import { isTablet } from 'react-native-device-info';

const PhoneListItem: React.FC = () => {
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

const TabletListItem: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary['800'],
          borderWidth: 0.5,
          borderColor: 'transparent',
        },
      ]}>
      <Skeleton width={30} height={30} />
      <View style={styles.data}>
        <Skeleton width={150} height={16} style={styles.title} />
        <Skeleton width={100} height={14} style={styles.symbol} />
        <Skeleton width={80} height={16} style={styles.price} />
      </View>
    </View>
  );
};

const CoinAssetListItemSkeleton: React.FC = () => {
  const tablet = isTablet();
  if (tablet) {
    return <TabletListItem />;
  }
  return <PhoneListItem />;
};

export default CoinAssetListItemSkeleton;
