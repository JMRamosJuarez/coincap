import React from 'react';

import MarketListItem from '@coin_assets/presentation/components/MarketListItem';
import { useMarkets } from '@coin_assets/presentation/redux/selectors/markets';

const MarketsList: React.FC = () => {
  const markets = useMarkets();
  return (
    <>
      {markets.map(market => {
        return (
          <MarketListItem
            key={`${market.exchange}/${market.id.base}/${market.id.quote}`}
            market={market}
          />
        );
      })}
    </>
  );
};

export default MarketsList;
