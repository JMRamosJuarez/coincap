import React, { useCallback, useMemo } from 'react';

import ChartCursor from '@charts/presentation/components/ChartCursor';
import ChartGradient from '@charts/presentation/components/ChartGradient';
import ChartGrid from '@charts/presentation/components/ChartGrid';
import LineChart from '@charts/presentation/components/LineChart';
import YAxis from '@charts/presentation/components/y_axis';
import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { styles } from '@coin_assets/presentation/components/CoinHistoryChart/Chart/styles';
import CursorTooltip from '@coin_assets/presentation/components/CursorTooltip';
import TimeAxis from '@coin_assets/presentation/components/TimeAxis';
import { useCoinHistory } from '@coin_assets/presentation/redux/selectors/history';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { StyleProp, ViewStyle } from 'react-native';

const CoinHistoryChartComponent: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
  readonly coinAsset: CoinAsset;
}> = ({ style, coinAsset }) => {
  const { change, data } = useCoinHistory(coinAsset.id);

  const { colors } = useAppTheme();

  const stroke = useMemo(() => {
    if (change === 0) {
      return colors.primary['500'];
    }
    return change > 0 ? colors.green['500'] : colors.red['500'];
  }, [change, colors.green, colors.primary, colors.red]);

  const formatY = useCallback(
    ({ item }: { readonly index: number; readonly item: number }): string =>
      numbro(item).formatCurrency({
        mantissa: 2,
        trimMantissa: false,
        thousandSeparated: true,
      }),
    [],
  );

  return (
    <LineChart
      style={[style, { backgroundColor: colors.primary['800'] }]}
      contentInsets={{ top: 56 / 2, bottom: 56 / 2, left: 4, right: 4 }}
      data={data}
      svg={{
        stroke,
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      scaleExtent={[1, 1]}
      yAccessor={({ item }) => item.price}>
      <ChartGrid
        position={'below-chart'}
        svg={{ stroke: colors.primary['900'], strokeWidth: 0.5 }}
        xAxis={{ labelFormat: 'HH:mm a' }}
      />
      <ChartGradient position={'below-chart'} color={stroke} />
      <TimeAxis
        style={styles.xAxis}
        position={'bottom'}
        //The "labelFormat" handled inside the component
        labelFormat={'-'}
        formatLabel={() => {
          //The "formatLabel" function handled inside the component
          return '-';
        }}
      />
      <YAxis
        style={styles.yAxis}
        position={'right'}
        formatLabel={formatY}
        svg={{
          fill: colors.primary['400'],
          fontWeight: '400',
          fontSize: 11,
          letterSpacing: 0,
        }}
      />
      <ChartCursor position={'top-chart'} />
      <CursorTooltip position={'top-chart'} />
    </LineChart>
  );
};

export default CoinHistoryChartComponent;
