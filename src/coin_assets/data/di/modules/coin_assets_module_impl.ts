import CoinAssetsDatasourceImpl from '@coin_assets/data/datasources/coin_assets_datasource_impl';
import CoinAssetsMapperImpl from '@coin_assets/data/mappers/coin_assets_mapper_impl';
import CoinAssetsRepositoryImpl from '@coin_assets/data/repositories/coin_assets_repository_impl';
import CoinAssetsDatasource from '@coin_assets/domain/datasources/coin_assets_datasource';
import CoinAssetsModule from '@coin_assets/domain/di/modules/coin_assets_module';
import CoinAssetsMapper from '@coin_assets/domain/mappers/coin_assets_mapper';
import CoinAssetsRepository from '@coin_assets/domain/repositories/coin_assets_repository';
import CoreModule from '@core/domain/di/modules/core_module';

export default class CoinAssetsModuleImpl implements CoinAssetsModule {
  private _mapper?: CoinAssetsMapper;
  private _datasource?: CoinAssetsDatasource;
  private _repository?: CoinAssetsRepository;

  constructor(private readonly coreModule: CoreModule) {}

  get mapper(): CoinAssetsMapper {
    if (!this._mapper) {
      this._mapper = new CoinAssetsMapperImpl();
    }
    return this._mapper;
  }

  get datasource(): CoinAssetsDatasource {
    if (!this._datasource) {
      this._datasource = new CoinAssetsDatasourceImpl(
        this.coreModule.coincapHttpClient,
        this.mapper,
      );
    }
    return this._datasource;
  }

  get repository(): CoinAssetsRepository {
    if (!this._repository) {
      this._repository = new CoinAssetsRepositoryImpl(this.datasource);
    }
    return this._repository;
  }
}
