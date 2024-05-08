import React, { useMemo } from 'react';

import { CoinHistoryTime } from '@coin_assets/domain/entities/coin_history_request';
import { styles } from '@coin_assets/presentation/components/ChartTimeSelector/styles';
import { useCoinHistoryTime } from '@coin_assets/presentation/redux/selectors/history';
import { useAppTheme } from '@theme/index';
import dayjs from 'dayjs';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const ChartTimeSelector: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
  readonly onTimeSelected: (time: CoinHistoryTime) => void;
}> = ({ style, onTimeSelected }) => {
  const { colors } = useAppTheme();

  const time = useCoinHistoryTime();

  const times = useMemo<CoinHistoryTime[]>(
    () => [
      {
        id: '1D',
        period: {
          start: dayjs().subtract(1, 'day').toDate().getTime(),
          end: new Date().getTime(),
        },
        interval: 'm5',
      },
      {
        id: '1W',
        period: {
          start: dayjs().subtract(1, 'week').toDate().getTime(),
          end: new Date().getTime(),
        },
        interval: 'm30',
      },
      {
        id: '1M',
        period: {
          start: dayjs().subtract(1, 'month').toDate().getTime(),
          end: new Date().getTime(),
        },
        interval: 'h2',
      },
      {
        id: '3M',
        period: {
          start: dayjs().subtract(3, 'months').toDate().getTime(),
          end: new Date().getTime(),
        },
        interval: 'h6',
      },
      {
        id: '6M',
        period: {
          start: dayjs().subtract(6, 'months').toDate().getTime(),
          end: new Date().getTime(),
        },
        interval: 'd1',
      },
      {
        id: '1Y',
        period: {
          start: dayjs().subtract(1, 'year').toDate().getTime(),
          end: new Date().getTime(),
        },
        interval: 'd1',
      },
    ],
    [],
  );

  return (
    <View style={[styles.container, style]}>
      {times.map(t => {
        const selected = t.id === time.id;
        const backgroundColor = selected ? colors.green['500'] : 'transparent';
        const color = selected ? colors.primary['50'] : colors.green['500'];
        return (
          <TouchableOpacity
            key={t.id}
            activeOpacity={0.7}
            onPress={() => onTimeSelected(t)}
            style={[
              styles.item,
              {
                backgroundColor,
              },
            ]}>
            <Text
              style={[
                {
                  color,
                },
                styles.label,
              ]}>
              {t.id}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ChartTimeSelector;
