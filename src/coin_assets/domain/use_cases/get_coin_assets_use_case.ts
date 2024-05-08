import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import GetCoinAssetsRequest from '@coin_assets/domain/entities/get_coin_assets_request';
import CoinAssetsRepository from '@coin_assets/domain/repositories/coin_assets_repository';
import BaseUseCase from '@core/domain/use_cases/base_use_case';

export default class GetCoinAssetsUseCase
  implements BaseUseCase<GetCoinAssetsRequest, CoinAsset[]>
{
  constructor(private readonly repository: CoinAssetsRepository) {}

  execute(request: GetCoinAssetsRequest): Promise<CoinAsset[]> {
    return this.repository.getCoinAssets(request);
  }
}
