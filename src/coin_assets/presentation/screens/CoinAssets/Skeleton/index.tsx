import React, { useMemo } from 'react';

import CoinAssetListItemSkeleton from '@coin_assets/presentation/components/CoinAssetListItemSkeleton';
import { styles } from '@coin_assets/presentation/screens/CoinAssets/Skeleton/styles';
import { FlatList } from 'react-native';
import { isTablet } from 'react-native-device-info';

const CoinAssetsSkeleton: React.FC = () => {
  const tablet = isTablet();

  const numberOfSkeletons = useMemo(() => {
    return tablet ? 20 : 15;
  }, [tablet]);

  const data = useMemo(
    () => new Array(numberOfSkeletons).fill({}),
    [numberOfSkeletons],
  );

  return (
    <FlatList
      style={styles.container}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={data}
      initialNumToRender={numberOfSkeletons}
      renderItem={() => {
        return <CoinAssetListItemSkeleton />;
      }}
    />
  );
};

export default CoinAssetsSkeleton;
