import { CoinsHistory } from '@coin_assets/presentation/redux/state';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { createSelector } from '@reduxjs/toolkit';

const assetIdSelector: AppSelector<string, { readonly id: string }> = (
  _,
  { id },
) => id;

const timeIdSelector: AppSelector<string> = ({ coinAssetsReducer }) =>
  coinAssetsReducer.history.time.id;

const keySelector = createSelector(
  assetIdSelector,
  timeIdSelector,
  (aId, tId) => `${aId}/${tId}`,
);

const history: AppSelector<CoinsHistory> = ({ coinAssetsReducer }) =>
  coinAssetsReducer.history.state;

const historySelector = createSelector(keySelector, history, (key, data) => {
  return data[key] || { type: 'waiting' };
});

const historyStateSelector = createSelector(
  historySelector,
  state => state.type,
);

export const useCoinHistoryState = (id: string) =>
  useAppSelector(appState => historyStateSelector(appState, { id }));

const historyDataSelector = createSelector(historySelector, state => {
  if (state.type === 'success') {
    return state.data;
  }
  throw new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useCoinHistory = (id: string) =>
  useAppSelector(appState => historyDataSelector(appState, { id }));

const historyErrorSelector = createSelector(historySelector, state => {
  if (state.type === 'error') {
    return state.error;
  }
  return new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useCoinHistoryError = (id: string) =>
  useAppSelector(appState => historyErrorSelector(appState, { id }));

export const useCoinHistoryTime = () =>
  useAppSelector(({ coinAssetsReducer }) => coinAssetsReducer.history.time);
