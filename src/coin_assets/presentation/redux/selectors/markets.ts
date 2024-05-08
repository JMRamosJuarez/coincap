import Market from '@coin_assets/domain/entities/market';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';

const markets: AppSelector<BaseState<Market[]>> = ({ coinAssetsReducer }) =>
  coinAssetsReducer.markets.state;

const stateTypeSelector = createSelector(markets, state => state.type);

const dataSelector = createSelector(markets, state => {
  if (state.type === 'success') {
    return state.data;
  }
  return [];
});

const errorSelector = createSelector(markets, state => {
  if (state.type === 'error') {
    return state.error;
  }
  return new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useMarketsState = () => useAppSelector(stateTypeSelector);

export const useMarketsPaginationState = () =>
  useAppSelector(
    ({
      coinAssetsReducer: {
        markets: { pagination },
      },
    }) => pagination.type,
  );

export const useMarkets = () => useAppSelector(dataSelector);

export const useMarketsError = () => useAppSelector(errorSelector);
