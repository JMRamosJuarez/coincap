import CoinCapAsset from '../entities/coin_cap_asset';
import { Failure, FailureType } from '../entities/failure';
import CoinCapRepository from '../repositories/coin_cap_repository';
import BaseUseCase from './base_use_case';

export default class GetAssetsUseCase extends BaseUseCase<
  never,
  CoinCapAsset[]
> {
  constructor(private readonly repository: CoinCapRepository) {
    super();
  }

  async execute(_?: never): Promise<CoinCapAsset[]> {
    const assets = await this.repository.getAssets();
    if (assets.length === 0) {
      const error: Failure = {
        type: FailureType.EMPTY_ASSETS,
      };
      throw error;
    }
    return assets;
  }
}
