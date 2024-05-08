import {
  CoinAssetPrices,
  initialState,
} from '@coin_assets/presentation/redux/state';
import {
  getCoinAssetsAsyncThunk,
  getCoinAssetsPageAsyncThunk,
  getCoinHistoryAsyncThunk,
  getMarketsAsyncThunk,
  getMarketsPageAsyncThunk,
} from '@coin_assets/presentation/redux/thunks';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: '/coin_assets',
  initialState,
  reducers: {
    updateCoinAssetPrices: (
      state,
      { payload }: PayloadAction<CoinAssetPrices>,
    ) => {
      state.prices = { ...state.prices, ...payload };
    },
    resetMarkets: state => {
      state.markets = initialState.markets;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCoinAssetsAsyncThunk.pending, state => {
        state.assets.pagination.type = 'loading';
        state.assets.state = { type: 'loading' };
      })
      .addCase(getCoinAssetsAsyncThunk.rejected, (state, { payload }) => {
        state.assets.pagination.type = 'error';
        state.assets.state = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(
        getCoinAssetsAsyncThunk.fulfilled,
        (state, { meta: { arg }, payload }) => {
          state.assets.pagination = {
            type: 'success',
            page: arg.page + 1,
            limit: arg.limit,
          };
          state.assets.state = { type: 'success', data: payload };
        },
      );

    builder
      .addCase(getCoinAssetsPageAsyncThunk.pending, state => {
        state.assets.pagination.type = 'loading';
      })
      .addCase(getCoinAssetsPageAsyncThunk.rejected, state => {
        state.assets.pagination.type = 'error';
      })
      .addCase(getCoinAssetsPageAsyncThunk.fulfilled, (state, { payload }) => {
        const current =
          state.assets.state.type === 'success' ? state.assets.state.data : [];

        state.assets.state = {
          type: 'success',
          data: [...current, ...payload],
        };

        state.assets.pagination.type = 'success';
        state.assets.pagination.page += 1;
      });

    builder
      .addCase(getCoinHistoryAsyncThunk.pending, (state, { meta: { arg } }) => {
        state.history.time = arg.time;
        state.history.state[`${arg.coinAssetId}/${arg.time.id}`] = {
          type: 'loading',
        };
      })
      .addCase(
        getCoinHistoryAsyncThunk.rejected,
        (state, { meta: { arg }, payload }) => {
          state.history.state[`${arg.coinAssetId}/${arg.time.id}`] = {
            type: 'error',
            error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
          };
        },
      )
      .addCase(
        getCoinHistoryAsyncThunk.fulfilled,
        (state, { meta: { arg }, payload }) => {
          state.history.state[`${arg.coinAssetId}/${arg.time.id}`] = {
            type: 'success',
            data: payload,
          };
        },
      );

    builder
      .addCase(getMarketsAsyncThunk.pending, state => {
        state.markets.pagination.type = 'loading';
        state.markets.state = { type: 'loading' };
      })
      .addCase(getMarketsAsyncThunk.rejected, (state, { payload }) => {
        state.markets.pagination.type = 'error';
        state.markets.state = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(
        getMarketsAsyncThunk.fulfilled,
        (state, { meta: { arg }, payload }) => {
          state.markets.pagination = {
            type: 'success',
            page: arg.page + 1,
            limit: arg.limit,
          };
          state.markets.state = { type: 'success', data: payload };
        },
      );

    builder
      .addCase(getMarketsPageAsyncThunk.pending, state => {
        state.markets.pagination.type = 'loading';
      })
      .addCase(getMarketsPageAsyncThunk.rejected, (state, { payload }) => {
        state.markets.pagination.type = 'error';
        state.markets.state = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(getMarketsPageAsyncThunk.fulfilled, (state, { payload }) => {
        const current =
          state.markets.state.type === 'success'
            ? state.markets.state.data
            : [];

        state.markets.state = {
          type: 'success',
          data: [...current, ...payload],
        };

        state.markets.pagination.type = 'success';
        state.markets.pagination.page += 1;
      });
  },
});

export const { updateCoinAssetPrices } = slice.actions;

export const coinAssetsReducer = slice.reducer;
