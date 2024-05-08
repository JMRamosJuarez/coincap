import React, { useCallback } from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinAssetListItem from '@coin_assets/presentation/components/CoinAssetListItem';
import CoinAssetListItemSkeleton from '@coin_assets/presentation/components/CoinAssetListItemSkeleton';
import { useCoinPricesSocket } from '@coin_assets/presentation/hooks';
import { useGetCoinAssetsPageAction } from '@coin_assets/presentation/redux/actions';
import { useCoinAssets } from '@coin_assets/presentation/redux/selectors';
import { styles } from '@coin_assets/presentation/screens/CoinAssets/List/styles';
import { useAppNavigation } from '@core/presentation/navigation/AppNavigator/config';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CoinAssetsList: React.FC = () => {
  const { top } = useSafeAreaInsets();

  const { navigate } = useAppNavigation();

  const data = useCoinAssets();

  useCoinPricesSocket(data);

  const renderItem = useCallback(
    ({ item }: { readonly item: CoinAsset }) => {
      return (
        <CoinAssetListItem
          coinAsset={item}
          onPress={coinAsset => navigate('CoinAssetDetail', { coinAsset })}
        />
      );
    },
    [navigate],
  );

  const keyExtractor = useCallback(
    (item: CoinAsset): string => `${item.id}/${item.name}/${item.symbol}`,
    [],
  );

  const pagination = useGetCoinAssetsPageAction();

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingTop: top }}
      data={data}
      initialNumToRender={50}
      maxToRenderPerBatch={50}
      getItemLayout={(_, index) => {
        return { length: 65, offset: 65 * index, index };
      }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={0.25}
      onEndReached={() => pagination()}
      ListFooterComponent={CoinAssetListItemSkeleton}
    />
  );
};

export default CoinAssetsList;
