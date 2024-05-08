import CoinAssetModel from '@coin_assets/data/models/coin_asset_model';
import CoinChartItemModel from '@coin_assets/data/models/coin_chart_item_model';
import DataContainerModel from '@coin_assets/data/models/data_cointainer_model';
import MarketModel from '@coin_assets/data/models/market_model';
import CoinAssetsDatasource from '@coin_assets/domain/datasources/coin_assets_datasource';
import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistory from '@coin_assets/domain/entities/coin_history';
import CoinHistoryRequest from '@coin_assets/domain/entities/coin_history_request';
import GetCoinAssetsRequest from '@coin_assets/domain/entities/get_coin_assets_request';
import Market from '@coin_assets/domain/entities/market';
import MarketsRequest from '@coin_assets/domain/entities/markets_request';
import CoinAssetsMapper from '@coin_assets/domain/mappers/coin_assets_mapper';
import HttpClient from '@core/domain/access/http_client';

export default class CoinAssetsDatasourceImpl implements CoinAssetsDatasource {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly mapper: CoinAssetsMapper,
  ) {}

  async getCoinAssets(request: GetCoinAssetsRequest): Promise<CoinAsset[]> {
    const response = await this.httpClient.get<
      DataContainerModel<CoinAssetModel[]>
    >('/assets', {
      params: {
        offset: request.page * request.limit,
        limit: request.limit,
      },
    });

    const models = response.data || [];

    return models.map(m =>
      this.mapper.mapCoinAsset(m, response.timestamp || new Date().getTime()),
    );
  }

  async getCoinHistory(request: CoinHistoryRequest): Promise<CoinHistory> {
    const response = await this.httpClient.get<
      DataContainerModel<CoinChartItemModel[]>
    >(`/assets/${request.coinAssetId}/history`, {
      params: {
        interval: request.time.interval,
        start: request.time.period.start,
        end: request.time.period.end,
      },
    });

    const models = response.data || [];

    const data = models.map(m => this.mapper.mapCoinChartItem(m));

    const prices = data.map(e => e.price);

    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const average =
      prices.reduce((total, price) => total + price, 0) / prices.length;
    const change = this.calculateChange(prices);

    return { high, low, average, change, data };
  }

  async getMarkets(request: MarketsRequest): Promise<Market[]> {
    const response = await this.httpClient.get<
      DataContainerModel<MarketModel[]>
    >(`/assets/${request.coinAssetId}/markets`, {
      params: {
        offset: request.page * request.limit,
        limit: request.limit,
      },
    });

    const models = response.data || [];

    return models.map(m => this.mapper.mapMarket(m));
  }

  private calculateChange(prices: number[]): number {
    if (prices.length <= 1) {
      return 0;
    }
    const first = prices[0];
    const last = prices[prices.length - 1];
    return ((last - first) / first) * 100;
  }
}
