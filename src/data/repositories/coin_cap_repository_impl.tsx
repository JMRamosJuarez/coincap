import CoinCapDataSource from '../../domain/data_sources/coin_cap_data_source';
import CoinCapAsset from '../../domain/entities/coin_cap_asset';
import CoinCapRepository from '../../domain/repositories/coin_cap_repository';

export default class CoinCapRepositoryImpl implements CoinCapRepository {
  private readonly remoteDataSource: CoinCapDataSource;

  constructor(remoteDataSource: CoinCapDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  getAssets(): Promise<CoinCapAsset[]> {
    return this.remoteDataSource.getAssets();
  }

  getAssetDetail(id: string): Promise<CoinCapAsset> {
    return this.remoteDataSource.getAssetDetail(id);
  }
}
