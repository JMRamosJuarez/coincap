import CoinAssetsComponent from '@coin_assets/domain/di/components/coin_assets_component';
import CoinAssetsModule from '@coin_assets/domain/di/modules/coin_assets_module';
import GetCoinAssetsUseCase from '@coin_assets/domain/use_cases/get_coin_assets_use_case';
import GetCoinHistoryUseCase from '@coin_assets/domain/use_cases/get_coin_history_use_case';
import GetMarketsUseCase from '@coin_assets/domain/use_cases/get_markets_use_case';

export default class CoinAssetsComponentImpl implements CoinAssetsComponent {
  private _getCoinAssetsUseCase?: GetCoinAssetsUseCase;
  private _getCoinHistoryUseCase?: GetCoinHistoryUseCase;
  private _getMarketsUseCase?: GetMarketsUseCase;

  constructor(private readonly module: CoinAssetsModule) {}

  get getCoinAssetsUseCase(): GetCoinAssetsUseCase {
    if (!this._getCoinAssetsUseCase) {
      this._getCoinAssetsUseCase = new GetCoinAssetsUseCase(
        this.module.repository,
      );
    }
    return this._getCoinAssetsUseCase;
  }

  get getCoinHistoryUseCase(): GetCoinHistoryUseCase {
    if (!this._getCoinHistoryUseCase) {
      this._getCoinHistoryUseCase = new GetCoinHistoryUseCase(
        this.module.repository,
      );
    }
    return this._getCoinHistoryUseCase;
  }

  get getMarketsUseCase(): GetMarketsUseCase {
    if (!this._getMarketsUseCase) {
      this._getMarketsUseCase = new GetMarketsUseCase(this.module.repository);
    }
    return this._getMarketsUseCase;
  }
}
