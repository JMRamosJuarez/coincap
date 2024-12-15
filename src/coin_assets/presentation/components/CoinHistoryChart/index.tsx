import React, { useMemo } from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistoryChartComponent from '@coin_assets/presentation/components/CoinHistoryChart/Chart';
import { useCoinHistoryState } from '@coin_assets/presentation/redux/selectors/history';
import { useDimensions } from '@core/presentation/hooks';
import { View } from 'react-native';
import { isTablet } from 'react-native-device-info';

const CoinHistoryChart: React.FC<{
  readonly coinAsset: CoinAsset;
}> = ({ coinAsset }) => {
  const {
    screen: { width, height },
  } = useDimensions();

  const tablet = isTablet();

  const size = useMemo(() => {
    if (tablet) {
      return Math.min(width * 0.65, height);
    }
    return Math.min(width, height);
  }, [tablet, width, height]);

  const state = useCoinHistoryState(coinAsset.id);

  switch (state) {
    case 'success':
      return (
        <CoinHistoryChartComponent
          style={{
            width: size,
            height: size,
          }}
          coinAsset={coinAsset}
        />
      );
    default:
      //TODO: Handle other states
      return <View style={{ width: size, height: size }} />;
  }
};

export default CoinHistoryChart;
