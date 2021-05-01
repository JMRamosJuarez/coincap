import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CoinCapAppDispatch,
  CoinCapAppState,
  getAssetsAction,
} from '../redux/reducers/app_reducers';
import AssetsListView from '../widgets/assets_list_view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
});

const CoinCapAssetsComponent: React.FC = () => {
  const dispatch = useDispatch<CoinCapAppDispatch>();
  useEffect(() => {
    dispatch(getAssetsAction());
  }, [dispatch]);
  const baseState = useSelector(
    (state: CoinCapAppState) => state.assets.baseState,
  );
  switch (baseState.type) {
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
      const { error } = baseState;
      return (
        <View style={styles.centerContainer}>
          <Text>{error.message}</Text>
        </View>
      );
    }
    case 'success_state': {
      const assets = baseState.data;
      return <AssetsListView assets={assets} />;
    }
    default:
      return (
        <View style={styles.centerContainer}>
          <Text>Default state</Text>
        </View>
      );
  }
};

const CoinCapAssetsScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <CoinCapAssetsComponent />
  </SafeAreaView>
);

export default CoinCapAssetsScreen;
