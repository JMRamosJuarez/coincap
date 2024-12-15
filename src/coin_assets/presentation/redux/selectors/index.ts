import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';

const assetIdSelector: AppSelector<string, { readonly id: string }> = (
  _,
  { id },
) => id;

const selected: AppSelector<CoinAsset | undefined> = ({ coinAssetsReducer }) =>
  coinAssetsReducer.selected;

const isAssetSelected = createSelector(
  assetIdSelector,
  selected,
  (key, data) => {
    return key === data?.id;
  },
);

export const useIsCoinSelected = (id: string) =>
  useAppSelector(appState => isAssetSelected(appState, { id }));

const assets: AppSelector<BaseState<CoinAsset[]>> = ({ coinAssetsReducer }) =>
  coinAssetsReducer.assets.state;

const stateTypeSelector = createSelector(assets, state => state.type);

const dataSelector = createSelector(assets, state => {
  if (state.type === 'success') {
    return state.data;
  }
  return [];
});

const errorSelector = createSelector(assets, state => {
  if (state.type === 'error') {
    return state.error;
  }
  return new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useSelectedCoinAsset = () => useAppSelector(selected);

export const useCoinAssetsState = () => useAppSelector(stateTypeSelector);

export const useCoinAssets = () => useAppSelector(dataSelector);

export const useCoinAssetsError = () => useAppSelector(errorSelector);
