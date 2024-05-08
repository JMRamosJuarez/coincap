import CoinHistory from '@coin_assets/domain/entities/coin_history';
import CoinHistoryRequest from '@coin_assets/domain/entities/coin_history_request';
import CoinAssetsRepository from '@coin_assets/domain/repositories/coin_assets_repository';
import BaseUseCase from '@core/domain/use_cases/base_use_case';

export default class GetCoinHistoryUseCase
  implements BaseUseCase<CoinHistoryRequest, CoinHistory>
{
  constructor(private readonly repository: CoinAssetsRepository) {}

  execute(request: CoinHistoryRequest): Promise<CoinHistory> {
    return this.repository.getCoinHistory(request);
  }
}
