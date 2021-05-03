import CoinCapAsset from '../entities/coin_cap_asset';
import { Failure, FailureType } from '../entities/failure';
import CoinCapRepository from '../repositories/coin_cap_repository';
import BaseUseCase from './base_use_case';

export default class GetAssetDetailUseCase extends BaseUseCase<
  string,
  CoinCapAsset
> {
  constructor(private readonly repository: CoinCapRepository) {
    super();
  }

  async execute(request?: string): Promise<CoinCapAsset> {
    const assetId = request?.trim() ?? '';
    if (assetId.length === 0) {
      const error: Failure = {
        type: FailureType.INVALID_ASSET_ID,
      };
      throw error;
    }
    return this.repository.getAssetDetail(assetId);
  }
}
