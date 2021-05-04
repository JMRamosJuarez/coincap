import { AxiosInstance } from 'axios';
import CoinCapDataSource from '../../domain/data_sources/coin_cap_data_source';
import CoinCapRepository from '../../domain/repositories/coin_cap_repository';
import GetAssetsUseCase from '../../domain/use_cases/get_assets_use_case';
import GetAssetHistoryUseCase from '../../domain/use_cases/get_asset_history_use_case';
import CoinCapDataSourceImpl from '../data_sources/coin_cap_data_source_impl';
import CoinCapRepositoryImpl from '../repositories/coin_cap_repository_impl';

export const generateGetAssetsUseCase = (
  axiosInstance: AxiosInstance,
): GetAssetsUseCase => {
  const dataSource: CoinCapDataSource = new CoinCapDataSourceImpl(
    axiosInstance,
  );
  const repository: CoinCapRepository = new CoinCapRepositoryImpl(dataSource);
  return new GetAssetsUseCase(repository);
};

export const generateGetAssetHistoryUseCase = (
  axiosInstance: AxiosInstance,
): GetAssetHistoryUseCase => {
  const dataSource: CoinCapDataSource = new CoinCapDataSourceImpl(
    axiosInstance,
  );
  const repository: CoinCapRepository = new CoinCapRepositoryImpl(dataSource);
  return new GetAssetHistoryUseCase(repository);
};
