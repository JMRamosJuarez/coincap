import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import CoinHistoryRequest from '@coin_assets/domain/entities/coin_history_request';
import ChartTimeSelector from '@coin_assets/presentation/components/ChartTimeSelector';
import CoinAssetDetailTabletHeader from '@coin_assets/presentation/components/CoinAssetDetailTabletHeader';
import CoinDataItem from '@coin_assets/presentation/components/CoinDataItem';
import CoinHistoryChart from '@coin_assets/presentation/components/CoinHistoryChart';
import CoinHistoryDataItem from '@coin_assets/presentation/components/CoinHistoryDataItem';
import Markets from '@coin_assets/presentation/components/Markets';
import RealTimeCoinAssetPrice from '@coin_assets/presentation/components/RealTimeCoinAssetPrice';
import { useGetCoinHistoryAction } from '@coin_assets/presentation/redux/actions';
import { useSelectedCoinAsset } from '@coin_assets/presentation/redux/selectors';
import { styles } from '@coin_assets/presentation/screens/CoinAssetDetail/styles';
import { CoinAssetDetailRouteProp } from '@core/presentation/navigation/AppNavigator/config';
import { useRoute } from '@react-navigation/native';
import { useAppTheme } from '@theme/index';
import dayjs from 'dayjs';
import numbro from 'numbro';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { isTablet } from 'react-native-device-info';

const CoinAssetDetailScreen: React.FC = () => {
  const route = useRoute<CoinAssetDetailRouteProp>();

  const tablet = isTablet();

  const selectedCoin = useSelectedCoinAsset();

  const coinAsset = useMemo(
    () => route?.params?.coinAsset || selectedCoin,
    [route?.params?.coinAsset, selectedCoin],
  );

  const { t } = useTranslation();

  const { colors } = useAppTheme();

  const scroll = useRef<ScrollView>(null);

  const historyRequest = useMemo<CoinHistoryRequest>(
    () => ({
      coinAssetId: coinAsset?.id || '',
      time: {
        id: '1D',
        period: {
          start: dayjs().subtract(1, 'day').toDate().getTime(),
          end: new Date().getTime(),
        },
        interval: 'm5',
      },
    }),
    [coinAsset],
  );

  const getHistory = useGetCoinHistoryAction();

  useEffect(() => {
    if (coinAsset) {
      getHistory(historyRequest);
    }
  }, [coinAsset, getHistory, historyRequest]);

  const getVariationColor = useCallback(
    (value: number) => {
      if (value === 0) {
        return colors.primary['50'];
      }
      return value < 0 ? colors.red['500'] : colors.green['500'];
    },
    [colors.green, colors.primary, colors.red],
  );

  if (!coinAsset) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <>
      {tablet && coinAsset && (
        <CoinAssetDetailTabletHeader coinAsset={coinAsset} />
      )}
      <ScrollView ref={scroll} style={styles.container}>
        <View style={styles.row}>
          <View style={styles.dataItem}>
            <RealTimeCoinAssetPrice
              style={styles.price}
              coinAsset={coinAsset}
            />
            <Text style={[{ color: colors.primary['500'] }, styles.priceLabel]}>
              {t('price')}
            </Text>
          </View>
          <CoinDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{ label: t('market_cap') }}
            data={{
              extractor: item =>
                numbro(item.marketCap).formatCurrency({
                  mantissa: 2,
                  trimMantissa: false,
                  average: true,
                }),
            }}
          />
          <CoinDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{ label: t('vwap_24Hr') }}
            data={{
              extractor: item =>
                numbro(item.vwap24Hr).formatCurrency({
                  mantissa: 2,
                  trimMantissa: false,
                  thousandSeparated: true,
                }),
            }}
          />
        </View>
        <View style={styles.row}>
          <CoinDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{ label: t('supply') }}
            data={{
              extractor: item =>
                numbro(item.supply.current).formatCurrency({
                  mantissa: 2,
                  trimMantissa: false,
                  average: true,
                }),
            }}
          />
          <CoinDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{ label: t('volume_24Hr') }}
            data={{
              extractor: item =>
                numbro(item.volume24Hr).formatCurrency({
                  mantissa: 2,
                  trimMantissa: false,
                  thousandSeparated: true,
                  average: true,
                }),
            }}
          />
          <CoinDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{
              label: t('change_24Hr'),
            }}
            data={{
              style: {
                color: getVariationColor(coinAsset.changePercent24Hr),
              },
              extractor: item =>
                `${numbro(item.changePercent24Hr).format({
                  mantissa: 2,
                  trimMantissa: false,
                })}%`,
            }}
          />
        </View>
        <CoinHistoryChart coinAsset={coinAsset} />
        <ChartTimeSelector
          style={styles.timeSelector}
          onTimeSelected={time => {
            getHistory({ coinAssetId: coinAsset.id, time });
          }}
        />
        <View style={styles.row}>
          <CoinHistoryDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{ label: t('high') }}
            extractor={h => {
              return {
                value: h?.high
                  ? numbro(h?.high).formatCurrency({
                      mantissa: 2,
                      trimMantissa: false,
                      thousandSeparated: true,
                    })
                  : '-',
              };
            }}
          />
          <CoinHistoryDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{ label: t('average') }}
            extractor={h => {
              return {
                value: h?.average
                  ? numbro(h?.average).formatCurrency({
                      mantissa: 2,
                      trimMantissa: false,
                      thousandSeparated: true,
                    })
                  : '-',
              };
            }}
          />
        </View>
        <View style={styles.row}>
          <CoinHistoryDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{ label: t('low') }}
            extractor={h => {
              return {
                value: h?.low
                  ? numbro(h?.low).formatCurrency({
                      mantissa: 2,
                      trimMantissa: false,
                      thousandSeparated: true,
                    })
                  : '-',
              };
            }}
          />
          <CoinHistoryDataItem
            style={styles.dataItem}
            coinAsset={coinAsset}
            title={{ label: t('change') }}
            extractor={h => {
              return {
                style: { color: getVariationColor(h?.change || 0) },
                value: h?.change
                  ? numbro(h?.change).formatCurrency({
                      mantissa: 2,
                      trimMantissa: false,
                      thousandSeparated: true,
                    })
                  : '-',
              };
            }}
          />
        </View>
        <Markets
          coinAsset={coinAsset}
          scrollToBottom={() => {
            scroll.current?.scrollToEnd();
          }}
        />
      </ScrollView>
    </>
  );
};

export default CoinAssetDetailScreen;
