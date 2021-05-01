import axios from 'axios';
import GetAssetsUseCase from '../../domain/use_cases/get_assets_use_case';
import { generateGetAssetsUseCase } from './modules';

const axiosInstance = axios.create({
  baseURL: 'https://api.coincap.io/v2/',
  timeout: 6000,
});

export interface CoinCapComponent {
  getAssetsUseCase: GetAssetsUseCase;
}

export const appComponent: CoinCapComponent = {
  getAssetsUseCase: generateGetAssetsUseCase(axiosInstance),
};
