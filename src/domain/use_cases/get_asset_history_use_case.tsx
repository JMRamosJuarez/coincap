import AssetHistoryItem from '../entities/asset_history_item';
import { Failure, FailureType } from '../entities/failure';
import GetAssetHistoryRequest from '../entities/get_asset_history_request';
import CoinCapRepository from '../repositories/coin_cap_repository';
import BaseUseCase from './base_use_case';

export default class GetAssetHistoryUseCase extends BaseUseCase<
  GetAssetHistoryRequest,
  AssetHistoryItem[]
> {
  constructor(private readonly repository: CoinCapRepository) {
    super();
  }

  async execute(request?: GetAssetHistoryRequest): Promise<AssetHistoryItem[]> {
    if (request) {
      const assetHistory = await this.repository.getAssetHistory(request);
      if (assetHistory.length > 0) {
        return assetHistory;
      }
      const error: Failure = {
        type: FailureType.EMPTY_ASSET_HISTORY,
      };
      throw error;
    }
    const error: Failure = {
      type: FailureType.INVALID_USE_CASE_REQUEST,
    };
    throw error;
  }
}
