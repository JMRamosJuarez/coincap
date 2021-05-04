import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import CoinCapAsset from '../../domain/entities/coin_cap_asset';
import { CoinCapFilterState } from '../redux/states/app_state';
import AssetListViewItem from './asset_list_view_item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'gray',
    marginStart: 16,
  },
});

interface AssetsListViewProps {
  assets: CoinCapAsset[];
  onAssetSelected: (asset: CoinCapAsset) => void;
  filterState?: CoinCapFilterState;
}

const ItemSeparator: React.FC = () => <View style={styles.separator} />;

const AssetsListView: React.FC<AssetsListViewProps> = ({
  assets,
  filterState,
  onAssetSelected,
}: AssetsListViewProps) => {
  const filterStateType = filterState?.type ?? 'empty_filter_results';
  const filterData = filterState?.data ?? [];
  return (
    <FlatList
      style={styles.container}
      data={filterStateType === 'success_filter_result' ? filterData : assets}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <AssetListViewItem asset={item} onAssetSelected={onAssetSelected} />
        );
      }}
    />
  );
};

export default AssetsListView;
