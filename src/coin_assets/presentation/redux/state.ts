import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistory from '@coin_assets/domain/entities/coin_history';
import { CoinHistoryTime } from '@coin_assets/domain/entities/coin_history_request';
import Market from '@coin_assets/domain/entities/market';
import { BaseState } from '@core/presentation/redux/state';
import dayjs from 'dayjs';

export type CoinAssetPrices = {
  [key: string]: { readonly price: number; readonly timestamp: number };
};

export type CoinsHistory = { [key: string]: BaseState<CoinHistory> };

export interface CoinAssetsState {
  selected?: CoinAsset;
  assets: {
    state: BaseState<CoinAsset[]>;
    pagination: {
      type: 'waiting' | 'loading' | 'success' | 'error';
      page: number;
      limit: number;
    };
  };
  prices: CoinAssetPrices;
  history: {
    state: CoinsHistory;
    time: CoinHistoryTime;
  };
  markets: {
    state: BaseState<Market[]>;
    pagination: {
      type: 'waiting' | 'loading' | 'success' | 'error';
      page: number;
      limit: number;
    };
  };
}

export const initialState: CoinAssetsState = {
  assets: {
    state: { type: 'waiting' },
    pagination: { type: 'loading', page: 0, limit: 50 },
  },
  prices: {},
  history: {
    state: {},
    time: {
      id: '1D',
      period: {
        start: dayjs().subtract(1, 'day').toDate().getTime(),
        end: new Date().getTime(),
      },
      interval: 'm5',
    },
  },
  markets: {
    state: { type: 'waiting' },
    pagination: { type: 'loading', page: 0, limit: 50 },
  },
};
