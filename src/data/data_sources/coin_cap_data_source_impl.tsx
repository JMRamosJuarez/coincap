import { AxiosError, AxiosInstance } from 'axios';

import CoinCapAsset from '../../domain/entities/coin_cap_asset';
import CoinCapDataSource from '../../domain/data_sources/coin_cap_data_source';

import CoinCapErrorModel from '../models/coin_cap_error_model';
import DataContainerModel from '../models/coin_cap_asset_container_model';

import { axiosFailure, tryParseNumber } from '../utils/utils';
import CoinCapAssetModel from '../models/coin_cap_asset_model';
import { Failure, FailureType } from '../../domain/entities/failure';

export default class CoinCapDataSourceImpl implements CoinCapDataSource {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAssets(): Promise<CoinCapAsset[]> {
    try {
      const response = await this.axios.get<
        DataContainerModel<CoinCapAssetModel[]>
      >('assets');
      const assets = response.data?.data ?? [];
      return assets.map(model => ({
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
      }));
    } catch (error) {
      const axiosError: AxiosError<CoinCapErrorModel> = error;
      throw axiosFailure(axiosError);
    }
  }

  async getAssetDetail(id: string): Promise<CoinCapAsset> {
    try {
      const response = await this.axios.get<
        DataContainerModel<CoinCapAssetModel>
      >(`assets/${id}/history`);
      const model = response.data?.data;
      if (model) {
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
      }
      const failure: Failure = {
        type: FailureType.ASSET_NOT_FOUND,
      };
      throw failure;
    } catch (error) {
      const axiosError: AxiosError<CoinCapErrorModel> = error;
      throw axiosFailure(axiosError);
    }
  }
}
