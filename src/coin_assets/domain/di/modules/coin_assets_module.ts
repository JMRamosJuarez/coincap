import CoinAssetsDatasource from '@coin_assets/domain/datasources/coin_assets_datasource';
import CoinAssetsMapper from '@coin_assets/domain/mappers/coin_assets_mapper';
import CoinAssetsRepository from '@coin_assets/domain/repositories/coin_assets_repository';

export default interface CoinAssetsModule {
  readonly mapper: CoinAssetsMapper;
  readonly datasource: CoinAssetsDatasource;
  readonly repository: CoinAssetsRepository;
}
