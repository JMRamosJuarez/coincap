import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistory from '@coin_assets/domain/entities/coin_history';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type CoinHistoryDataItemProps = {
  readonly style?: StyleProp<ViewStyle>;
  readonly coinAsset: CoinAsset;
  readonly title: {
    readonly style?: StyleProp<TextStyle>;
    readonly label: string;
  };
  readonly extractor: (coin?: CoinHistory) => {
    readonly value: string;
    readonly style?: StyleProp<TextStyle>;
  };
};

export default CoinHistoryDataItemProps;
