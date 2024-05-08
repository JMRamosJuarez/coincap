import Market from '@coin_assets/domain/entities/market';
import MarketsRequest from '@coin_assets/domain/entities/markets_request';
import CoinAssetsRepository from '@coin_assets/domain/repositories/coin_assets_repository';
import BaseUseCase from '@core/domain/use_cases/base_use_case';

export default class GetMarketsUseCase
  implements BaseUseCase<MarketsRequest, Market[]>
{
  constructor(private readonly repository: CoinAssetsRepository) {}

  execute(request: MarketsRequest): Promise<Market[]> {
    return this.repository.getMarkets(request);
  }
}
