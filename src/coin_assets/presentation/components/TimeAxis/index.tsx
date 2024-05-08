import React, { PropsWithChildren, useCallback } from 'react';

import XAxis from '@charts/presentation/components/x_axis';
import { XAxisProps } from '@charts/presentation/components/x_axis/props';
import CoinHistoryItem from '@coin_assets/domain/entities/coin_history_item';
import { useCoinHistoryTimeFormat } from '@coin_assets/presentation/hooks';
import { useAppTheme } from '@theme/index';
import dayjs from 'dayjs';

const TimeAxis: React.FC<
  PropsWithChildren<XAxisProps<CoinHistoryItem>>
> = props => {
  const { colors } = useAppTheme();

  const dateFormat = useCoinHistoryTimeFormat();

  const formatX = useCallback(
    ({
      format,
      item,
    }: {
      readonly format: string;
      readonly item: CoinHistoryItem;
    }) => dayjs(item.time).format(format),
    [],
  );

  return (
    <XAxis
      position={'bottom'}
      {...props}
      labelFormat={dateFormat}
      formatLabel={formatX}
      svg={{
        fill: colors.primary['400'],
        fontWeight: '400',
        fontSize: 11,
        letterSpacing: 0,
      }}
    />
  );
};

export default TimeAxis;
