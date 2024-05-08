import React from 'react';

import CoinHistoryDataItemComponent from '@coin_assets/presentation/components/CoinHistoryDataItem/Component';
import CoinHistoryDataItemError from '@coin_assets/presentation/components/CoinHistoryDataItem/Error';
import CoinHistoryDataItemProps from '@coin_assets/presentation/components/CoinHistoryDataItem/props';
import CoinHistoryDataItemSkeleton from '@coin_assets/presentation/components/CoinHistoryDataItem/Skeleton';
import { useCoinHistoryState } from '@coin_assets/presentation/redux/selectors/history';

const CoinHistoryDataItem: React.FC<CoinHistoryDataItemProps> = props => {
  const state = useCoinHistoryState(props.coinAsset.id);
  switch (state) {
    case 'waiting':
    case 'loading':
      return <CoinHistoryDataItemSkeleton {...props} />;
    case 'success':
      return <CoinHistoryDataItemComponent {...props} />;
    default:
      return <CoinHistoryDataItemError {...props} />;
  }
};

export default CoinHistoryDataItem;
