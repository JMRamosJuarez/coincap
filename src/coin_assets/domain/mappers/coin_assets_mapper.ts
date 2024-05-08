import CoinAssetModel from '@coin_assets/data/models/coin_asset_model';
import CoinChartItemModel from '@coin_assets/data/models/coin_chart_item_model';
import MarketModel from '@coin_assets/data/models/market_model';
import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistoryItem from '@coin_assets/domain/entities/coin_history_item';
import Market from '@coin_assets/domain/entities/market';

export default interface CoinAssetsMapper {
  mapCoinAsset(model: CoinAssetModel, timestamp: number): CoinAsset;
  mapCoinChartItem(model: CoinChartItemModel): CoinHistoryItem;
  mapMarket(model: MarketModel): Market;
}
