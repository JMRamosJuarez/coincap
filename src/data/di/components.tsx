import axios from 'axios';
import GetAssetsUseCase from '../../domain/use_cases/get_assets_use_case';
import GetAssetHistoryUseCase from '../../domain/use_cases/get_asset_history_use_case';
import {
  generateGetAssetHistoryUseCase,
  generateGetAssetsUseCase,
} from './modules';

const axiosInstance = axios.create({
  baseURL: 'https://api.coincap.io/v2/',
  timeout: 6000,
});

export interface CoinCapAppComponent {
  getAssetsUseCase: GetAssetsUseCase;
  getAssetHistoryUseCase: GetAssetHistoryUseCase;
}

export const appComponent: CoinCapAppComponent = {
  getAssetsUseCase: generateGetAssetsUseCase(axiosInstance),
  getAssetHistoryUseCase: generateGetAssetHistoryUseCase(axiosInstance),
};
