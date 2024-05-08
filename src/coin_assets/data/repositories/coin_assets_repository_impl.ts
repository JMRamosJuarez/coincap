import CoinAssetsDatasource from '@coin_assets/domain/datasources/coin_assets_datasource';
import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistory from '@coin_assets/domain/entities/coin_history';
import CoinHistoryRequest from '@coin_assets/domain/entities/coin_history_request';
import GetCoinAssetsRequest from '@coin_assets/domain/entities/get_coin_assets_request';
import Market from '@coin_assets/domain/entities/market';
import MarketsRequest from '@coin_assets/domain/entities/markets_request';
import CoinAssetsRepository from '@coin_assets/domain/repositories/coin_assets_repository';

export default class CoinAssetsRepositoryImpl implements CoinAssetsRepository {
  constructor(private readonly datasource: CoinAssetsDatasource) {}

  getCoinAssets(request: GetCoinAssetsRequest): Promise<CoinAsset[]> {
    return this.datasource.getCoinAssets(request);
  }

  getCoinHistory(request: CoinHistoryRequest): Promise<CoinHistory> {
    return this.datasource.getCoinHistory(request);
  }

  getMarkets(request: MarketsRequest): Promise<Market[]> {
    return this.datasource.getMarkets(request);
  }
}
