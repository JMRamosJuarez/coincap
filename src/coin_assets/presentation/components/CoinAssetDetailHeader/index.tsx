import React, { useMemo } from 'react';

import ArrowLeftIcon from '@assets/svg/arrow-left.svg';
import { styles } from '@coin_assets/presentation/components/CoinAssetDetailHeader/styles';
import { useCoinAssetPrice } from '@coin_assets/presentation/redux/selectors/prices';
import { StackHeaderProps } from '@react-navigation/stack';
import { useAppTheme } from '@theme/index';
import dayjs from 'dayjs';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CoinAssetDetailHeader: React.FC<StackHeaderProps> = ({
  options: { title },
  route: {
    params: { coinAsset },
  },
  navigation: { goBack },
}) => {
  const { top } = useSafeAreaInsets();

  const { colors } = useAppTheme();

  const { timestamp } = useCoinAssetPrice(coinAsset);

  const lastUpdate = useMemo(() => {
    const value = dayjs(timestamp).format('MMMM[,] DD - hh:mm:ss a');
    return `${value[0].toUpperCase()}${value.slice(1)}`;
  }, [timestamp]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + 16,
          backgroundColor: colors.primary['800'],
        },
      ]}>
      <TouchableOpacity
        style={styles.back}
        activeOpacity={0.7}
        onPress={goBack}>
        <ArrowLeftIcon fill={colors.primary['50']} />
      </TouchableOpacity>
      <View style={styles.data}>
        <Text
          style={[
            styles.title,
            {
              color: colors.primary['50'],
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.primary['50'],
            },
          ]}>
          {lastUpdate}
        </Text>
      </View>
      <View style={styles.placeholder} />
    </View>
  );
};

export default CoinAssetDetailHeader;
