import CoinCapAsset from '../entities/coin_cap_asset';
import AssetHistoryItem from '../entities/asset_history_item';
import GetAssetHistoryRequest from '../entities/get_asset_history_request';

export default interface CoinCapRepository {
  getAssets(): Promise<CoinCapAsset[]>;
  getAssetHistory(request: GetAssetHistoryRequest): Promise<AssetHistoryItem[]>;
}
