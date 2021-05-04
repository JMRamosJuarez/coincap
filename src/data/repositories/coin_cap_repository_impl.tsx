import CoinCapDataSource from '../../domain/data_sources/coin_cap_data_source';
import asset_history_item from '../../domain/entities/asset_history_item';
import CoinCapAsset from '../../domain/entities/coin_cap_asset';
import GetAssetHistoryRequest from '../../domain/entities/get_asset_history_request';
import CoinCapRepository from '../../domain/repositories/coin_cap_repository';

export default class CoinCapRepositoryImpl implements CoinCapRepository {
  private readonly remoteDataSource: CoinCapDataSource;

  constructor(remoteDataSource: CoinCapDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  getAssets(): Promise<CoinCapAsset[]> {
    return this.remoteDataSource.getAssets();
  }

  getAssetHistory(
    request: GetAssetHistoryRequest,
  ): Promise<asset_history_item[]> {
    return this.remoteDataSource.getAssetHistory(request);
  }
}
