import CoinCapAsset from '../entities/coin_cap_asset';

export default interface CoinCapDataSource {
  getAssets(): Promise<CoinCapAsset[]>;
  getAssetDetail(id: string): Promise<CoinCapAsset>;
}
