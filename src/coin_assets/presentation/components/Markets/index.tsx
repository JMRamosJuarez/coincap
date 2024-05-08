import React, { useEffect, useMemo } from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import MarketsRequest from '@coin_assets/domain/entities/markets_request';
import MarketsComponent from '@coin_assets/presentation/components/Markets/Component';
import MarketsPaginationButton from '@coin_assets/presentation/components/Markets/PaginationButton';
import { styles } from '@coin_assets/presentation/components/Markets/styles';
import { useGetMarketsAction } from '@coin_assets/presentation/redux/actions';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';

const Markets: React.FC<{
  readonly coinAsset: CoinAsset;
  readonly scrollToBottom: () => void;
}> = ({ coinAsset, scrollToBottom }) => {
  const { colors } = useAppTheme();

  const marketsRequest = useMemo<MarketsRequest>(
    () => ({
      coinAssetId: coinAsset.id,
      page: 0,
      limit: 10,
    }),
    [coinAsset],
  );

  const getMarkets = useGetMarketsAction();

  useEffect(() => {
    getMarkets(marketsRequest);
  }, [getMarkets, marketsRequest]);

  return (
    <View style={{ backgroundColor: colors.primary['950'] }}>
      <Text
        style={[
          styles.title,
          {
            color: colors.primary['50'],
          },
        ]}>
        {'Exchanges'}
      </Text>
      <MarketsComponent />
      <MarketsPaginationButton
        coinAsset={coinAsset}
        scrollToBottom={scrollToBottom}
      />
    </View>
  );
};

export default Markets;
