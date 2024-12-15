import CoinAsset from '@coin_assets/domain/entities/coin_asset';

export default interface CoinAssetListItemProps {
  readonly coinAsset: CoinAsset;
  readonly onPress: (coinAsset: CoinAsset) => void;
}
