import GetCoinAssetsUseCase from '@coin_assets/domain/use_cases/get_coin_assets_use_case';
import GetCoinHistoryUseCase from '@coin_assets/domain/use_cases/get_coin_history_use_case';
import GetMarketsUseCase from '@coin_assets/domain/use_cases/get_markets_use_case';

export default interface CoinAssetsComponent {
  readonly getCoinAssetsUseCase: GetCoinAssetsUseCase;
  readonly getCoinHistoryUseCase: GetCoinHistoryUseCase;
  readonly getMarketsUseCase: GetMarketsUseCase;
}
