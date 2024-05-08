import React from 'react';

import MarketDataItemProps from '@coin_assets/presentation/components/MarketDataItem/props';
import { styles } from '@coin_assets/presentation/components/MarketDataItem/styles';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';

const MarketDataItem: React.FC<MarketDataItemProps> = ({
  style,
  market,
  title,
  data,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={style}>
      <Text style={[{ color: colors.primary['50'] }, styles.data, data.style]}>
        {data.extractor(market)}
      </Text>
      <Text
        style={[{ color: colors.primary['500'] }, styles.title, title.style]}>
        {title.label}
      </Text>
    </View>
  );
};

export default MarketDataItem;
