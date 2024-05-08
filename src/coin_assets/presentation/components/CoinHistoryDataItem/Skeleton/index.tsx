import React from 'react';

import CoinHistoryDataItemProps from '@coin_assets/presentation/components/CoinHistoryDataItem/props';
import { styles } from '@coin_assets/presentation/components/CoinHistoryDataItem/Skeleton/styles';
import Skeleton from '@core/presentation/components/Skeleton';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';

const CoinHistoryDataItemSkeleton: React.FC<CoinHistoryDataItemProps> = ({
  style,
  title,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={style}>
      <Skeleton width={80} height={16} style={styles.skeleton} />
      <Text
        style={[{ color: colors.primary['500'] }, styles.title, title.style]}>
        {title.label}
      </Text>
    </View>
  );
};

export default CoinHistoryDataItemSkeleton;
