import React, { useMemo } from 'react';

import CoinAssetListItemSkeleton from '@coin_assets/presentation/components/CoinAssetListItemSkeleton';
import { styles } from '@coin_assets/presentation/screens/CoinAssets/Skeleton/styles';
import { FlatList } from 'react-native';

const CoinAssetsSkeleton: React.FC = () => {
  const data = useMemo(() => new Array(15).fill({}), []);

  return (
    <FlatList
      style={styles.container}
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
