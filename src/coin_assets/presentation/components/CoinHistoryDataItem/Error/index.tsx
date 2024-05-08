import React, { useMemo } from 'react';

import { styles } from '@coin_assets/presentation/components/CoinHistoryDataItem/Error/styles';
import CoinHistoryDataItemProps from '@coin_assets/presentation/components/CoinHistoryDataItem/props';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';

const CoinHistoryDataItemError: React.FC<CoinHistoryDataItemProps> = ({
  style,
  title,
  extractor,
}) => {
  const { colors } = useAppTheme();
  const extractorData = useMemo(() => extractor(undefined), [extractor]);
  return (
    <View style={style}>
      <Text
        style={[
          { color: colors.primary['50'] },
          styles.data,
          extractorData.style,
        ]}>
        {'-'}
      </Text>
      <Text
        style={[{ color: colors.primary['500'] }, styles.title, title.style]}>
        {title.label}
      </Text>
    </View>
  );
};

export default CoinHistoryDataItemError;
