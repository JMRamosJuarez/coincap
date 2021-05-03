import { BaseState } from './base_state';

import CoinCapAsset from '../../../domain/entities/coin_cap_asset';

export interface CoinCapFilterState {
  type: 'empty_filter_results' | 'success_filter_result';
  query: string;
  data: CoinCapAsset[];
}

export interface CoinCapSuccessState {
  type?: 'success_state';
  data: CoinCapAsset[];
  filterState?: CoinCapFilterState;
  previousPricesData?: any;
  currentPricesData?: any;
}

export type CoinCapAssetsBaseState = BaseState | CoinCapSuccessState;

export default interface CoinCapAssetsState {
  baseState: CoinCapAssetsBaseState;
}
