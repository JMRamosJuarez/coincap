import { AxiosError, AxiosInstance } from 'axios';

import CoinCapAsset from '../../domain/entities/coin_cap_asset';
import CoinCapDataSource from '../../domain/data_sources/coin_cap_data_source';

import CoinCapErrorModel from '../models/coin_cap_error_model';
import CoinCapAssetContainerModel from '../models/coin_cap_asset_container_model';

import { axiosFailure, tryParseNumber } from '../utils/utils';

export default class CoinCapDataSourceImpl implements CoinCapDataSource {
  constructor(private readonly axios: AxiosInstance) {}

  async getAssets(): Promise<CoinCapAsset[]> {
    try {
      const response = await this.axios.get<CoinCapAssetContainerModel>(
        'assets',
      );
      const assets = response.data?.data ?? [];
      return assets.map(model => {
        return {
          id: model.id,
          rank: tryParseNumber(model.rank),
          symbol: model.symbol,
          name: model.name,
          supply: tryParseNumber(model.supply),
          maxSupply: tryParseNumber(model.maxSupply),
          marketCapUsd: tryParseNumber(model.marketCapUsd),
          volumeUsd24Hr: tryParseNumber(model.volumeUsd24Hr),
          priceUsd: tryParseNumber(model.priceUsd),
          changePercent24Hr: tryParseNumber(model.changePercent24Hr),
          vwap24Hr: tryParseNumber(model.vwap24Hr),
          explorer: model.explorer,
        };
      });
    } catch (error) {
      const axiosError: AxiosError<CoinCapErrorModel> = error;
      throw axiosFailure(axiosError);
    }
  }
}
