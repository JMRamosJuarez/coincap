import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import CoinCapAsset from '../../domain/entities/coin_cap_asset';
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
}

const ItemSeparator: React.FC = () => <View style={styles.separator} />;

const AssetsListView: React.FC<AssetsListViewProps> = ({
  assets,
}: AssetsListViewProps) => (
  <FlatList
    style={styles.container}
    data={assets}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <AssetListViewItem asset={item} />}
  />
);

export default AssetsListView;
