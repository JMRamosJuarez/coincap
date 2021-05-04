import { AxiosError, AxiosInstance } from 'axios';

import CoinCapAsset from '../../domain/entities/coin_cap_asset';
import CoinCapDataSource from '../../domain/data_sources/coin_cap_data_source';

import CoinCapErrorModel from '../models/coin_cap_error_model';
import DataContainerModel from '../models/coin_cap_asset_container_model';

import { axiosFailure, tryParseNumber } from '../utils/utils';

import CoinCapAssetModel from '../models/coin_cap_asset_model';
import GetAssetHistoryRequest from '../../domain/entities/get_asset_history_request';
import AssetHistoryItem from '../../domain/entities/asset_history_item';
import AssetHistoryItemModel from '../models/asset_history_item_model';

import moment from 'moment';

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

  async getAssetHistory(
    request: GetAssetHistoryRequest,
  ): Promise<AssetHistoryItem[]> {
    try {
      const response = await this.axios.get<
        DataContainerModel<AssetHistoryItemModel[]>
      >(`assets/${request.assetId}/history`, {
        params: {
          interval: request.interval,
          start: request.start,
          end: request.end,
        },
      });
      const assetHistory = response.data?.data ?? [];
      return assetHistory.map(h => {
        return {
          priceUsd: tryParseNumber(h.priceUsd),
          time: h.time,
          date: moment(h.date, 'YYYY-MM-DDT00:00:00.000Z').milliseconds(),
        };
      });
    } catch (error) {
      const axiosError: AxiosError<CoinCapErrorModel> = error;
      throw axiosFailure(axiosError);
    }
  }
}
