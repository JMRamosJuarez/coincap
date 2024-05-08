import Market from '@coin_assets/domain/entities/market';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type MarketDataItemProps = {
  readonly style?: StyleProp<ViewStyle>;
  readonly market: Market;
  readonly title: {
    readonly style?: StyleProp<TextStyle>;
    readonly label: string;
  };
  readonly data: {
    readonly style?: StyleProp<TextStyle>;
    readonly extractor: (market: Market) => string;
  };
};

export default MarketDataItemProps;
