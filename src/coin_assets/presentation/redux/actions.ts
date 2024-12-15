import { useCallback } from 'react';

import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistoryRequest from '@coin_assets/domain/entities/coin_history_request';
import GetCoinAssetsRequest from '@coin_assets/domain/entities/get_coin_assets_request';
import MarketsRequest from '@coin_assets/domain/entities/markets_request';
import {
  selectCoinAsset,
  updateCoinAssetPrices,
} from '@coin_assets/presentation/redux';
import { CoinAssetPrices } from '@coin_assets/presentation/redux/state';
import {
  getCoinAssetsAsyncThunk,
  getCoinAssetsPageAsyncThunk,
  getCoinHistoryAsyncThunk,
  getMarketsAsyncThunk,
  getMarketsPageAsyncThunk,
} from '@coin_assets/presentation/redux/thunks';
import { useAppDispatch } from '@core/presentation/redux';
import { debounce } from 'lodash';

export const useSelectCoinAssetsAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: CoinAsset) => {
      dispatch(selectCoinAsset(request));
    },
    [dispatch],
  );
};

export const useGetCoinAssetsAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: GetCoinAssetsRequest) => {
      dispatch(getCoinAssetsAsyncThunk(request));
    },
    [dispatch],
  );
};

export const useSearchCoinAssetsAction = () => {
  const dispatch = useAppDispatch();
  const callback = useCallback(
    (query: string) => {
      dispatch(getCoinAssetsAsyncThunk({ query, page: 0, limit: 50 }));
    },
    [dispatch],
  );
  return debounce(callback, 500);
};

export const useGetCoinAssetsPageAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(getCoinAssetsPageAsyncThunk());
  }, [dispatch]);
};

export const useUpdateCoinAssetPricesAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (prices: CoinAssetPrices) => {
      dispatch(updateCoinAssetPrices(prices));
    },
    [dispatch],
  );
};

export const useGetCoinHistoryAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: CoinHistoryRequest) => {
      dispatch(getCoinHistoryAsyncThunk(request));
    },
    [dispatch],
  );
};

export const useGetMarketsAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: MarketsRequest) => {
      dispatch(getMarketsAsyncThunk(request));
    },
    [dispatch],
  );
};

export const useGetMarketsPageAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    async (id: string) => {
      await dispatch(getMarketsPageAsyncThunk(id));
    },
    [dispatch],
  );
};
