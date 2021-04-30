import { BaseState } from './base_state';

import CoinCapAsset from '../../../domain/entities/coin_cap_asset';

export interface SuccessState {
  type?: 'success_state';
  data: CoinCapAsset[];
}

export type CoinCapAssetsBaseState = BaseState | SuccessState;

export default interface CoinCapAssetsState {
  baseState: CoinCapAssetsBaseState;
}
