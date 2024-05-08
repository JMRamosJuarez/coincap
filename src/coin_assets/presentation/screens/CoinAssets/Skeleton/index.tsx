import React, { useMemo } from 'react';

import CoinAssetListItemSkeleton from '@coin_assets/presentation/components/CoinAssetListItemSkeleton';
import { styles } from '@coin_assets/presentation/screens/CoinAssets/Skeleton/styles';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CoinAssetsSkeleton: React.FC = () => {
  const { top } = useSafeAreaInsets();

  const data = useMemo(() => new Array(15).fill({}), []);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingTop: top }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={data}
      initialNumToRender={15}
      renderItem={() => {
        return <CoinAssetListItemSkeleton />;
      }}
    />
  );
};

export default CoinAssetsSkeleton;
