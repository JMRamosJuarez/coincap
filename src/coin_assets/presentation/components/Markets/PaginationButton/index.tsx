import React, { useCallback, useMemo } from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { styles } from '@coin_assets/presentation/components/Markets/PaginationButton/styles';
import { useGetMarketsPageAction } from '@coin_assets/presentation/redux/actions';
import { useMarketsPaginationState } from '@coin_assets/presentation/redux/selectors/markets';
import { useAppTheme } from '@theme/index';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

const MarketsPaginationButton: React.FC<{
  readonly coinAsset: CoinAsset;
  readonly scrollToBottom: () => void;
}> = ({ coinAsset, scrollToBottom }) => {
  const { colors } = useAppTheme();

  const paginate = useGetMarketsPageAction();

  const state = useMarketsPaginationState();

  const isLoading = useMemo(() => {
    return state === 'loading';
  }, [state]);

  const opacity = useMemo(() => {
    return isLoading ? 0.5 : 1;
  }, [isLoading]);

  const onPress = useCallback(async () => {
    try {
      await paginate(coinAsset.id);
      scrollToBottom();
    } catch (_) {}
  }, [coinAsset.id, paginate, scrollToBottom]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      style={[
        styles.container,
        { opacity, backgroundColor: colors.green['500'] },
      ]}
      onPress={onPress}>
      {!isLoading && (
        <Text style={[styles.label, { color: colors.primary['50'] }]}>
          {'View More'}
        </Text>
      )}
      {isLoading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size={'small'}
          color={colors.primary['50']}
        />
      )}
    </TouchableOpacity>
  );
};

export default MarketsPaginationButton;
