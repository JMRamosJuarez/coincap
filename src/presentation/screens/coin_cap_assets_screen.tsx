import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { RootStackParams } from '../../App';

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CoinCapAppDispatch,
  CoinCapAppState,
  getAssetsAction,
  performFilterAction,
} from '../redux/reducers/app_reducers';
import AssetsListView from '../widgets/assets_list_view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emptyDataMessage: {
    fontSize: 26.0,
    textAlign: 'center',
  },
  assetsList: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    margin: 8.0,
    paddingHorizontal: 8.0,
    borderWidth: 0.5,
  },
});

const CoinCapAssetsComponent: React.FC = () => {
  const dispatch = useDispatch<CoinCapAppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParams, 'Assets'>>();
  useEffect(() => {
    dispatch(getAssetsAction());
  }, [dispatch]);
  const assetsState = useSelector(
    (state: CoinCapAppState) => state.appReducer.assetsState,
  );
  switch (assetsState.type) {
    case 'waiting_state':
    case 'loading_state':
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    case 'empty_state':
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyDataMessage}>No assets available</Text>
        </View>
      );
    case 'error_state': {
      const { error } = assetsState;
      return (
        <View style={styles.centerContainer}>
          <Text>{error.message}</Text>
        </View>
      );
    }
    case 'success_state': {
      const assets = assetsState.data;
      return (
        <AssetsListView
          assets={assets}
          filterState={assetsState.filterState}
          onAssetSelected={asset =>
            navigation.navigate('AssetDetail', { asset })
          }
        />
      );
    }
    default:
      return (
        <View style={styles.centerContainer}>
          <Text>Default state</Text>
        </View>
      );
  }
};

const SearchInput: React.FC = () => {
  const dispatch = useDispatch<CoinCapAppDispatch>();
  const filterState = useSelector((state: CoinCapAppState) => {
    const baseState = state.appReducer.assetsState;
    return baseState.type === 'success_state' ? baseState.filterState : null;
  });
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search"
      editable={filterState !== null}
      value={filterState?.query ?? ''}
      onChangeText={query => dispatch(performFilterAction(query))}
    />
  );
};

const CoinCapAssetsScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <SearchInput />
    <CoinCapAssetsComponent />
  </SafeAreaView>
);

export default CoinCapAssetsScreen;
