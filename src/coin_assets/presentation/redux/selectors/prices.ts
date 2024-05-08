import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { CoinAssetPrices } from '@coin_assets/presentation/redux/state';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { createSelector } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

const assetSelector: AppSelector<
  CoinAsset,
  { readonly coinAsset: CoinAsset }
> = (_, { coinAsset }) => coinAsset;

const prices: AppSelector<CoinAssetPrices> = ({ coinAssetsReducer }) =>
  coinAssetsReducer.prices;

const priceSelector = createSelector(
  assetSelector,
  prices,
  ({ id, price, timestamp }, data) => {
    return data[id] || { price, timestamp };
  },
);

export const useCoinAssetPrice = (coinAsset: CoinAsset) =>
  useAppSelector(
    appState => priceSelector(appState, { coinAsset }),
    shallowEqual,
  );
