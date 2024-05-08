import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';

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

export const useCoinAssetsState = () => useAppSelector(stateTypeSelector);

export const useCoinAssets = () => useAppSelector(dataSelector);

export const useCoinAssetsError = () => useAppSelector(errorSelector);
