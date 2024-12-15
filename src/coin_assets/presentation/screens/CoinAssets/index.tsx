import React, { useEffect } from 'react';

import SearchInput from '@coin_assets/presentation/components/SearchInput';
import { useGetCoinAssetsAction } from '@coin_assets/presentation/redux/actions';
import { useCoinAssetsState } from '@coin_assets/presentation/redux/selectors';
import CoinAssetDetailScreen from '@coin_assets/presentation/screens/CoinAssetDetail';
import CoinAssetsError from '@coin_assets/presentation/screens/CoinAssets/Error';
import CoinAssetsList from '@coin_assets/presentation/screens/CoinAssets/List';
import CoinAssetsSkeleton from '@coin_assets/presentation/screens/CoinAssets/Skeleton';
import { useDimensions } from '@core/presentation/hooks';
import { SafeAreaView, View } from 'react-native';
import { isTablet } from 'react-native-device-info';

const CoinAssetsPage: React.FC = () => {
  const getAssets = useGetCoinAssetsAction();

  useEffect(() => {
    getAssets({ page: 0, limit: 50 });
  }, [getAssets]);

  const state = useCoinAssetsState();

  switch (state) {
    case 'waiting':
    case 'loading':
      return <CoinAssetsSkeleton />;
    case 'success':
      return <CoinAssetsList />;
    default:
      return <CoinAssetsError />;
  }
};

const CoinAssetsScreen: React.FC = () => {
  const {
    screen: { width },
  } = useDimensions();

  if (isTablet()) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', gap: 2 }}>
        <View style={{ width: width * 0.35 }}>
          <SearchInput />
          <CoinAssetsPage />
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <CoinAssetDetailScreen />
        </SafeAreaView>
      </View>
    );
  }
  return (
    <>
      <SearchInput />
      <CoinAssetsPage />
    </>
  );
};

export default CoinAssetsScreen;
