import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import CoinHistory from '@coin_assets/domain/entities/coin_history';
import CoinHistoryRequest from '@coin_assets/domain/entities/coin_history_request';
import GetCoinAssetsRequest from '@coin_assets/domain/entities/get_coin_assets_request';
import Market from '@coin_assets/domain/entities/market';
import MarketsRequest from '@coin_assets/domain/entities/markets_request';
import { createAppAsyncThunk } from '@core/presentation/redux/thunks';

export const getCoinAssetsAsyncThunk = createAppAsyncThunk<
  GetCoinAssetsRequest,
  CoinAsset[]
>(
  '/get_assets',
  async (
    request,
    {
      extra: {
        coreComponent: {
          coinAssetsComponent: { getCoinAssetsUseCase },
        },
      },
    },
  ) => {
    return await getCoinAssetsUseCase.execute(request);
  },
);

export const getCoinAssetsPageAsyncThunk = createAppAsyncThunk<
  void,
  CoinAsset[]
>(
  '/get_assets_page',
  async (
    _,
    {
      getState,
      extra: {
        coreComponent: {
          coinAssetsComponent: { getCoinAssetsUseCase },
        },
      },
    },
  ) => {
    const {
      assets: {
        pagination: { page, limit },
      },
    } = getState().coinAssetsReducer;
    return await getCoinAssetsUseCase.execute({ page, limit });
  },
  {
    condition: async (_, { getState }) => {
      const {
        assets: { pagination },
      } = getState().coinAssetsReducer;
      return pagination.type !== 'loading';
    },
  },
);

export const getCoinHistoryAsyncThunk = createAppAsyncThunk<
  CoinHistoryRequest,
  CoinHistory
>(
  '/get_coin_history',
  async (
    request,
    {
      extra: {
        coreComponent: {
          coinAssetsComponent: { getCoinHistoryUseCase },
        },
      },
    },
  ) => {
    return await getCoinHistoryUseCase.execute(request);
  },
);

export const getMarketsAsyncThunk = createAppAsyncThunk<
  MarketsRequest,
  Market[]
>(
  '/get_markets',
  async (
    request,
    {
      extra: {
        coreComponent: {
          coinAssetsComponent: { getMarketsUseCase },
        },
      },
    },
  ) => {
    return await getMarketsUseCase.execute(request);
  },
);

export const getMarketsPageAsyncThunk = createAppAsyncThunk<string, Market[]>(
  '/get_markets_page',
  async (
    coinAssetId,
    {
      getState,
      extra: {
        coreComponent: {
          coinAssetsComponent: { getMarketsUseCase },
        },
      },
    },
  ) => {
    const {
      markets: {
        pagination: { page, limit },
      },
    } = getState().coinAssetsReducer;
    return await getMarketsUseCase.execute({ coinAssetId, page, limit });
  },
  {
    condition: async (_, { getState }) => {
      const {
        markets: { pagination },
      } = getState().coinAssetsReducer;
      return pagination.type !== 'loading';
    },
  },
);
