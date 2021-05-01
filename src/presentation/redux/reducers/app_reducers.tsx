import {
  configureStore,
  createAsyncThunk,
  createSlice,
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
  name: 'get_assets',
  initialState: assetsInitialState,
  reducers: {},
  extraReducers: builder => {
    //GET ASSETS
    builder.addCase(getAssetsAsyncThunk.pending, state => {
      state.baseState = { type: 'loading_state' };
    });
    builder.addCase(getAssetsAsyncThunk.rejected, (state, action) => {
      state.baseState = {
        type: 'error_state',
        error: action.payload ?? {
          type: FailureType.unknown_error,
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
