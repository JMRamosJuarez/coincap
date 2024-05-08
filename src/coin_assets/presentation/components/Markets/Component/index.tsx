import React from 'react';

import MarketsList from '@coin_assets/presentation/components/Markets/List';
import MarketsSkeleton from '@coin_assets/presentation/components/Markets/Skeleton';
import { useMarketsState } from '@coin_assets/presentation/redux/selectors/markets';

const MarketsComponent: React.FC = () => {
  const state = useMarketsState();
  switch (state) {
    case 'waiting':
    case 'loading':
      return <MarketsSkeleton />;
    case 'success':
      return <MarketsList />;
    default:
      return <></>;
  }
};

export default MarketsComponent;
