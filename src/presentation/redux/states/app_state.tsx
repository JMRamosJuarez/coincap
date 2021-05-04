import { BaseState } from './base_state';

import CoinCapAsset from '../../../domain/entities/coin_cap_asset';
import AssetHistoryItem from '../../../domain/entities/asset_history_item';

export interface CoinCapFilterState {
  type: 'empty_filter_results' | 'success_filter_result';
  query: string;
  data: CoinCapAsset[];
}

export interface CoinCapAssetsBaseState {
  type?: 'success_state';
  data: CoinCapAsset[];
  filterState?: CoinCapFilterState;
  previousPricesData?: any;
  currentPricesData?: any;
}

export interface AssetHistoryBaseState {
  type?: 'asset_history_state' | 'empty_history_state';
  data: AssetHistoryItem[];
}

export type CoinCapAssetsState = BaseState | CoinCapAssetsBaseState;

export type AssetHistoryState = BaseState | AssetHistoryBaseState;

export default interface AppState {
  assetsState: CoinCapAssetsState;
  assetHistoryState: AssetHistoryState;
}
