import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type CoinDataItemProps = {
  readonly style?: StyleProp<ViewStyle>;
  readonly coinAsset: CoinAsset;
  readonly title: {
    readonly style?: StyleProp<TextStyle>;
    readonly label: string;
  };
  readonly data: {
    readonly style?: StyleProp<TextStyle>;
    readonly extractor: (coin: CoinAsset) => string;
  };
};

export default CoinDataItemProps;
