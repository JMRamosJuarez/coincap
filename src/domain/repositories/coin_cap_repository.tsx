import CoinCapAsset from '../entities/coin_cap_asset';

export default interface CoinCapRepository {
  getAssets(): Promise<CoinCapAsset[]>;
}
