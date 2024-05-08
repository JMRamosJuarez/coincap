import React, { useEffect } from 'react';

import { useGetCoinAssetsAction } from '@coin_assets/presentation/redux/actions';
import { useCoinAssetsState } from '@coin_assets/presentation/redux/selectors';
import CoinAssetsError from '@coin_assets/presentation/screens/CoinAssets/Error';
import CoinAssetsList from '@coin_assets/presentation/screens/CoinAssets/List';
import CoinAssetsSkeleton from '@coin_assets/presentation/screens/CoinAssets/Skeleton';

const CoinAssetsScreen: React.FC = () => {
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

export default CoinAssetsScreen;
