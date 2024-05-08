import React, { useMemo } from 'react';

import MarketListItemSkeleton from '@coin_assets/presentation/components/MarketListItemSkeleton';

const MarketsSkeleton: React.FC = () => {
  const data = useMemo(() => new Array(10).fill({}), []);
  return (
    <>
      {data.map((_, index) => {
        return <MarketListItemSkeleton key={`${index}`} />;
      })}
    </>
  );
};

export default MarketsSkeleton;
