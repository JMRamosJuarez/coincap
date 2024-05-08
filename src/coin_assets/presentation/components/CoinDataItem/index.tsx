import React from 'react';

import CoinDataItemProps from '@coin_assets/presentation/components/CoinDataItem/props';
import { styles } from '@coin_assets/presentation/components/CoinDataItem/styles';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';

const CoinDataItem: React.FC<CoinDataItemProps> = ({
  style,
  coinAsset,
  title,
  data,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={style}>
      <Text style={[{ color: colors.primary['50'] }, styles.data, data.style]}>
        {data.extractor(coinAsset)}
      </Text>
      <Text
        style={[{ color: colors.primary['500'] }, styles.title, title.style]}>
        {title.label}
      </Text>
    </View>
  );
};

export default CoinDataItem;
