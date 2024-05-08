import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistory from '@coin_assets/domain/entities/coin_history';
import CoinHistoryRequest from '@coin_assets/domain/entities/coin_history_request';
import GetCoinAssetsRequest from '@coin_assets/domain/entities/get_coin_assets_request';
import Market from '@coin_assets/domain/entities/market';
import MarketsRequest from '@coin_assets/domain/entities/markets_request';

export default interface CoinAssetsRepository {
  getCoinAssets(request: GetCoinAssetsRequest): Promise<CoinAsset[]>;
  getCoinHistory(request: CoinHistoryRequest): Promise<CoinHistory>;
  getMarkets(request: MarketsRequest): Promise<Market[]>;
}
