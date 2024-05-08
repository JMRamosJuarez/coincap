import React, { useMemo } from 'react';

import { styles } from '@coin_assets/presentation/components/CoinHistoryDataItem/Component/styles';
import CoinHistoryDataItemProps from '@coin_assets/presentation/components/CoinHistoryDataItem/props';
import { useCoinHistory } from '@coin_assets/presentation/redux/selectors/history';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';

const CoinHistoryDataItemComponent: React.FC<CoinHistoryDataItemProps> = ({
  style,
  coinAsset,
  title,
  extractor,
}) => {
  const { colors } = useAppTheme();
  const history = useCoinHistory(coinAsset.id);
  const extractorData = useMemo(() => extractor(history), [extractor, history]);
  return (
    <View style={style}>
      <Text
        style={[
          { color: colors.primary['50'] },
          styles.data,
          extractorData.style,
        ]}>
        {extractorData.value}
      </Text>
      <Text
        style={[{ color: colors.primary['500'] }, styles.title, title.style]}>
        {title.label}
      </Text>
    </View>
  );
};

export default CoinHistoryDataItemComponent;
