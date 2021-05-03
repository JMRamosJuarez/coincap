import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { appComponent, CoinCapComponent } from '../../../data/di/components';
import CoinCapAsset from '../../../domain/entities/coin_cap_asset';
import { Failure, FailureType } from '../../../domain/entities/failure';
import CoinCapAssetsState from '../states/coin_cap_assets_state';

const assetsInitialState: CoinCapAssetsState = {
  baseState: { type: 'waiting_state' },
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

const assetsSlice = createSlice({
  name: 'assets',
  initialState: assetsInitialState,
  reducers: {
    performFilter: (state, { payload }: PayloadAction<string>) => {
      const query = payload.trim().toLocaleLowerCase();
      const baseState = state.baseState;
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
      const baseState = state.baseState;
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
      state.baseState = { type: 'loading_state' };
    });
    builder.addCase(getAssetsAsyncThunk.rejected, (state, action) => {
      state.baseState = {
        type: 'error_state',
        error: action.payload ?? {
          type: FailureType.UNKNOWN_ERROR,
          message: action.error.message ?? 'unknown_error',
        },
      };
    });
    builder.addCase(getAssetsAsyncThunk.fulfilled, (state, action) => {
      const assets = action.payload;
      state.baseState = {
        type: assets.length > 0 ? 'success_state' : 'empty_state',
        data: assets,
      };
    });
  },
});

// Actions
export const assetsReducer = assetsSlice.reducer;

export const getAssetsAction = getAssetsAsyncThunk;

export const {
  performFilter: performFilterActionCreator,
  updatePrices: updatePricesActionCreator,
} = assetsSlice.actions;

// Store configuration
export const globalStore = configureStore({
  reducer: {
    assets: assetsReducer,
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
  extra: CoinCapComponent;
  rejectValue: Failure;
}
