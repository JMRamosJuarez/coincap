import React from 'react';

import ArrowDown from '@assets/svg/arrow-down.svg';
import { styles } from '@coin_assets/presentation/components/MarketListItemSkeleton/styles';
import Skeleton from '@core/presentation/components/Skeleton';
import { useAppTheme } from '@theme/index';
import { View } from 'react-native';

const MarketListItemSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        styles.row,
        {
          backgroundColor: colors.primary['800'],
        },
      ]}>
      <View style={styles.data}>
        <Skeleton width={80} height={16} style={styles.skeleton} />
        <Skeleton width={100} height={16} style={styles.skeleton} />
      </View>
      <Skeleton width={80} height={16} style={styles.skeleton} />
      <View style={styles.arrow}>
        <ArrowDown stroke={colors.primary['500']} />
      </View>
    </View>
  );
};

export default MarketListItemSkeleton;
