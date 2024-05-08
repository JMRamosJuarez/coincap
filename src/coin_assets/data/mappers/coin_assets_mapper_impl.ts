import CoinChartItemModel from '@coin_assets/data/models/coin_chart_item_model';
import MarketModel from '@coin_assets/data/models/market_model';
import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistoryItem from '@coin_assets/domain/entities/coin_history_item';
import Market from '@coin_assets/domain/entities/market';
import CoinAssetsMapper from '@coin_assets/domain/mappers/coin_assets_mapper';

import CoinAssetModel from '../models/coin_asset_model';

export default class CoinAssetsMapperImpl implements CoinAssetsMapper {
  mapCoinAsset(model: CoinAssetModel, timestamp: number): CoinAsset {
    return {
      id: model.id || '-',
      rank: parseFloat(model.rank || '-1'),
      symbol: model.symbol || '-',
      name: model.name || '-',
      supply: {
        current: parseFloat(model.supply || '0'),
        max: parseFloat(model.maxSupply || '0'),
      },
      marketCap: parseFloat(model.marketCapUsd || '0'),
      volume24Hr: parseFloat(model.volumeUsd24Hr || '0'),
      price: parseFloat(model.priceUsd || '0'),
      changePercent24Hr: parseFloat(model.changePercent24Hr || '0'),
      vwap24Hr: parseFloat(model.vwap24Hr || '0'),
      explorer: model.explorer || '-',
      timestamp,
    };
  }

  mapCoinChartItem(model: CoinChartItemModel): CoinHistoryItem {
    return {
      price: parseFloat(model.priceUsd || '0'),
      time: model.time || 0,
    };
  }

  mapMarket(model: MarketModel): Market {
    return {
      exchange: model.exchangeId || '-',
      id: {
        base: model.baseId || '-',
        quote: model.quoteId || '-',
      },
      symbol: {
        base: model.baseSymbol || '-',
        quote: model.quoteSymbol || '-',
      },
      volume: {
        v24Hr: parseFloat(model.volumeUsd24Hr || '0'),
        percent: parseFloat(model.volumePercent || '0'),
      },
      price: parseFloat(model.priceUsd || '0'),
    };
  }
}
