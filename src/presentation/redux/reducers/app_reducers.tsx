import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { appComponent, CoinCapAppComponent } from '../../../data/di/components';
import AssetHistoryItem from '../../../domain/entities/asset_history_item';
import CoinCapAsset from '../../../domain/entities/coin_cap_asset';
import { Failure, FailureType } from '../../../domain/entities/failure';
import GetAssetHistoryRequest from '../../../domain/entities/get_asset_history_request';
import AppState from '../states/app_state';

const appInitialState: AppState = {
  assetsState: { type: 'waiting_state' },
  assetHistoryState: { type: 'waiting_state' },
};

const getAssetsAsyncThunk = createAsyncThunk<
  CoinCapAsset[],
  void,
  AppAsyncThunkConfig
>('assets/get', async (_, thunkApi) => {
  try {
    const { getAssetsUseCase } = thunkApi.extra;
    return await getAssetsUseCase.execute();
  } catch (error) {
    const failure: Failure = error;
    const { rejectWithValue } = thunkApi;
    return rejectWithValue(failure);
  }
});

const getAssetHistoryAsyncThunk = createAsyncThunk<
  AssetHistoryItem[],
  GetAssetHistoryRequest,
  AppAsyncThunkConfig
>('assets/detail', async (request, thunkApi) => {
  try {
    const { getAssetHistoryUseCase } = thunkApi.extra;
    return await getAssetHistoryUseCase.execute(request);
  } catch (error) {
    const failure: Failure = error;
    const { rejectWithValue } = thunkApi;
    return rejectWithValue(failure);
  }
});

const appSlice = createSlice({
  name: 'assets',
  initialState: appInitialState,
  reducers: {
    performFilter: (state, { payload }: PayloadAction<string>) => {
      const query = payload.trim().toLocaleLowerCase();
      const baseState = state.assetsState;
      if (baseState.type === 'success_state') {
        const data = baseState.data;
        const filterData = data
          .filter(a => {
            const name = a.name.toLowerCase();
            return name.search(query) !== -1;
          })
          .sort((a, b) => a.rank - b.rank);
        baseState.filterState = {
          type:
            filterData.length > 0
              ? 'success_filter_result'
              : 'empty_filter_results',
          data: filterData,
          query: payload,
        };
      }
    },
    updatePrices: (state, { payload }: PayloadAction<any>) => {
      const baseState = state.assetsState;
      if (baseState.type === 'success_state') {
        baseState.previousPricesData = {
          ...baseState.previousPricesData,
          ...baseState.currentPricesData,
        };
        baseState.currentPricesData = {
          ...baseState.currentPricesData,
          ...payload,
        };
      }
    },
  },
  extraReducers: builder => {
    // GET ASSETS
    builder.addCase(getAssetsAsyncThunk.pending, state => {
      state.assetsState = { type: 'loading_state' };
    });
    builder.addCase(getAssetsAsyncThunk.rejected, (state, action) => {
      state.assetsState = {
        type: 'error_state',
        error: action.payload ?? {
          type: FailureType.UNKNOWN_ERROR,
          message: action.error.message ?? 'unknown_error',
        },
      };
    });
    builder.addCase(getAssetsAsyncThunk.fulfilled, (state, action) => {
      const assets = action.payload;
      state.assetsState = {
        type: assets.length > 0 ? 'success_state' : 'empty_state',
        data: assets,
      };
    });

    //GET ASSET HISTORY
    builder.addCase(getAssetHistoryAsyncThunk.pending, state => {
      state.assetHistoryState = { type: 'loading_state' };
    });
    builder.addCase(getAssetHistoryAsyncThunk.fulfilled, (state, action) => {
      state.assetHistoryState = {
        type: 'asset_history_state',
        data: action.payload,
      };
    });
    builder.addCase(getAssetHistoryAsyncThunk.rejected, (state, action) => {
      state.assetHistoryState = {
        type: 'error_state',
        error: action.payload ?? {
          type: FailureType.UNKNOWN_ERROR,
          message: action.error.message ?? 'unknown_error',
        },
      };
    });
  },
});

// Actions
export const appReducer = appSlice.reducer;

export const getAssetsAction = getAssetsAsyncThunk;

export const getAssetHistoryAction = getAssetHistoryAsyncThunk;

export const {
  performFilter: performFilterAction,
  updatePrices: updatePricesAction,
} = appSlice.actions;

// Store configuration
export const globalStore = configureStore({
  reducer: {
    appReducer: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: appComponent,
      },
    }),
});

// State types
export type CoinCapAppDispatch = typeof globalStore.dispatch;

export type CoinCapAppState = ReturnType<typeof globalStore.getState>;

export interface AppAsyncThunkConfig {
  dispatch: CoinCapAppDispatch;
  state: CoinCapAppState;
  extra: CoinCapAppComponent;
  rejectValue: Failure;
}
